const utils = require("../utils.js");
const config = require("../config.js");
const pool = require("../sql.js");

class Card {
	constructor({id, wallet_id, user_id, card_number, balance, currency, ccv, expd, blocked = false}) {
		this.id = id || utils.genUID();
        this.wallet_id = wallet_id;
		this.user_id = user_id;
		this.currency 	= config.allowedCurr()[currency];
        this.balance = balance || 0;
        this.card_number = card_number || utils.genCCN();
        this.expd = expd || new Date(new Date().setMonth((new Date().getMonth()+1))).toJSON().slice(0, 19).replace('T', ' ');
        this.ccv = ccv || utils.genCCV();
		this.blocked = blocked;
		return this;
	}
	static credit = async (id, balance, amount) => {
		let conn = await pool.getConnection();
		conn.beginTransaction()
		try { 
			await conn.query(`UPDATE arandombank.cards SET balance=${balance+amount} WHERE id=UUID_TO_BIN('${id}')`);
			await conn.commit();
		} catch(e) {
			await conn.rollback();
			throw e;
		} finally {
			await conn.release();
		}
	}
	static debit = async (id, balance, amount) => {
		let conn = await pool.getConnection();
		conn.beginTransaction()
		try { 
			await conn.query(`UPDATE arandombank.cards SET balance=${balance-amount} WHERE id=UUID_TO_BIN('${id}')`);
			await conn.commit();
		} catch(e) {
			await conn.rollback();
			throw e;
		} finally {
			await conn.release();
		}
	}
	static create = async (cardData) => {
		let conn = await pool.getConnection();
		conn.beginTransaction()
		try { 
			await conn.query(`INSERT INTO arandombank.cards VALUES (UUID_TO_BIN(UUID()), UUID_TO_BIN('${cardData.wallet_id}'), '${cardData.currency.key}', ${cardData.balance}, '${cardData.card_number}', '${cardData.expd}', '${cardData.ccv}', UUID_TO_BIN('${cardData.user_id}'), false)`);
			await conn.commit();
			return cardData;
		} catch(e) {
			await conn.rollback();
			throw e;
		} finally {
			await conn.release();
		}
	}
	static findByUser = async (userID) => {
		return await pool.query(`SELECT BIN_TO_UUID(id) as id, card_number, BIN_TO_UUID(id) as wallet_id, BIN_TO_UUID(user_id) as created_by, balance, currency FROM arandombank.cards WHERE user_id = UUID_TO_BIN('${userID}')`);
	};
	static findById = async (cardID) => {
		let req  = await pool.query(`SELECT BIN_TO_UUID(id) as id, card_number, BIN_TO_UUID(id) as wallet_id, BIN_TO_UUID(user_id) as created_by, balance, currency FROM arandombank.cards WHERE id = UUID_TO_BIN('${cardID}')`)
		return req[0];
	};
	static findByCompany = async (companyID) => {
		return await pool.query(`SELECT BIN_TO_UUID(c.id) as id, card_number, BIN_TO_UUID(wallet_id) as wallet_id, BIN_TO_UUID(user_id) as created_by, balance, currency FROM cards as c, users as u WHERE c.user_id = u.id AND u.company_id = UUID_TO_BIN('${companyID}')`)
	};
	toString(){
		return JSON.stringify(this, null, 4)
	}
}
module.exports = Card;
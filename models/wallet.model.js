const utils = require("../utils.js");
const config = require("../config.js");
const pool = require("../sql.js");

class Wallet {
	constructor({ company_id, balance, currency, master = false }) {
		this.company_id = company_id;
		this.balance = balance || Math.floor(Math.random() * (1000 - 100) + 100);
		this.currency = currency || config.allowedCurr()[currency];
		this.master = master;
		return this;
	}
	static create = async (walletData) => {
		let conn = await pool.getConnection();
		conn.beginTransaction()
		try {
			await conn.query(`INSERT INTO arandombank.wallets VALUES (UUID_TO_BIN(UUID()), UUID_TO_BIN('${walletData.company_id}'), ${walletData.balance}, '${walletData.currency}', false);`)
			await conn.commit();
			return walletData;
		} catch(e) {
			await conn.rollback();
			throw e;
		} finally {
			await conn.release();
		}
	}
	static findById = async (walletID) => {
		let req = await pool.query(`SELECT BIN_TO_UUID(id) as wallet_id, BIN_TO_UUID(company_id) as company_id, balance, currency FROM arandombank.wallets WHERE id = UUID_TO_BIN('${walletID}')`)
		return req[0];
	};
	static credit = async (id, balance, amount) => {
		let conn = await pool.getConnection();
		conn.beginTransaction()
		try { 
			await conn.query(`UPDATE arandombank.wallets SET balance=${balance+amount} WHERE id=UUID_TO_BIN('${id}')`);
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
			await conn.query(`UPDATE arandombank.wallets SET balance=${balance-amount} WHERE id=UUID_TO_BIN('${id}')`);
			await conn.commit();
		} catch(e) {
			await conn.rollback();
			throw e;
		} finally {
			await conn.release();
		}
	}
	toString(){
		return JSON.stringify(this, null, 4)
	}
}
module.exports = Wallet;
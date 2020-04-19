const card = require("../models/card.model.js");

exports.create = async (req) => {
	return await card.create(new card(req.body));
};
exports.findOne = async (req) => {
	let foundCard = await card.findById(req.body.card_id);
	return foundCard;
};
exports.findByUser = async (req) => {
	return await card.findByUser(req.body.user_id);
};
exports.findByCompany = async (req) => {
	return await card.findByCompany(req.body.company_id);
};
exports.credit = async (wallet_balance, card_id, card_balance, amount) => {
	if(wallet_balance >= amount) {
		await card.credit(card_id, card_balance, amount);
	}
};
exports.debit = async (card_id, card_balance, amount) => {
	if(card_balance >= amount) {
		await card.debit(card_id, card_balance, amount);
	}
};
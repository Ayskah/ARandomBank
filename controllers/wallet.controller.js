const wallet = require("../models/wallet.model.js");

exports.create = async (req, res) => {
	return await wallet.create(new wallet(req.body))
};
exports.findOne = async (req) => {
	let foundWallet = await wallet.findById(req.body.wallet_id);
	return foundWallet;
};
exports.credit = async (wallet_id, wallet_balance, amount) => {
	if(wallet_balance >= amount) {
		await wallet.credit(wallet_id, wallet_balance, amount);
	}
};
exports.debit = async (wallet_id, wallet_balance, amount) => {
	await wallet.debit(wallet_id, wallet_balance, amount);
};
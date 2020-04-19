const utils = require("./utils.js");
const config = require("./config.js");

class Transfer {
	constructor({id, amount, from, fromT, fromC, to, toT, toC, fee = 0.00}) {
		this._id = utils.genUID();
		this._date = new Date();
		this._amount = amount;
		this._from = from;
		this._fromT = fromT;
		this._fromC = config.allowedCurr()[fromC];
		this._to = to;
		this._toT = toT;
		this._toC = config.allowedCurr()[toC];
		this._fee = fee;
	}
	set id(id) {
		this._id = id;
	}
	get id() {
		return this._id
	}
	set amount(amount) {
		this._amount = amount;
	}
	get amount() {
		return this._amount
	}
	set from(from) {
		this._from = from;
	}
	get from() {
		return this._from
	}
	set fromT(fromT) {
		this._fromT = fromT;
	}
	get fromT() {
		return this._fromT
	}
	set fromC(fromC) {
		this._fromC = fromC;
	}
	get fromC() {
		return this_fromC;
	}
	set to(to) {
		this._to = to;
	}
	get to() {
		return this._to
	}
	set toT(toT) {
		this._toT = toT;
	}
	get toT() {
		return this._toT
	}
	set toC(toC) {
		this._toC = toC;
	}
	get toC() {
		return this._toC
	}
	set fee(fee) {
		this._fee = fee;
	}
	get fee() {
		return this._fee
	}
	toString() {
		return JSON.stringify(this, null, 4);
	}
}
module.exports = Transfer;
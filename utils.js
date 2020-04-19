const { v4: uuidv4 } = require('uuid');
const cnumGen = require('creditcard-generator');

const utils = module.exports = {
	genUID: () => uuidv4(),
	genCCN: () => cnumGen.GenCC("VISA", 1)[0],
	genCCV: () => Math.random().toString().replace(".", "").substr(0, 3),
}
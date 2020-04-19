// ./src/index.js

// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const pool = require("./sql.js")

// ARandomBank dependencies
const wallets = require("./controllers/wallet.controller.js");
const cards = require("./controllers/card.controller.js");

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

/* 	- using bodyParser to parse JSON bodies into JS objects
	- enabling CORS for all requests
	- adding morgan to log HTTP requests
*/
app.use(bodyParser.json());
app.use(cors());
//app.use(morgan('combined'));
app.put('/company/create', (req, res) => {
	let createCompanyRequest = `INSERT INTO arandombank.company VALUES (UUID_TO_BIN(UUID()), 'Test C');`
	pool.query(createCompanyRequest, (error, result) => {
		if (error) res.send({"error":"Database error", "details":error});
		else if(result.affectedRows==1) res.send(200)
		else res.send(500)
    });
});
app.put('/user/create', (req, res) => {
	let createUserRequest = `INSERT INTO arandombank.users VALUES (UUID_TO_BIN(UUID()), 'Test U', UUID_TO_BIN('d6344bfb-8254-11ea-8d88-00ff72a697d2'));`
	pool.query(createUserRequest, (error, result) => {
		if (error) res.send({"error":"Database error", "details":error});
		else if(result.affectedRows==1) res.send(200)
		else res.send(500)
    });
});
app.put('/wallet/create', async (req, res) => {
	res.send(await wallets.create(req));
});
app.get('/wallet/', async (req, res) => {
	res.send(await wallets.findOne(req));
});
app.get('/company/cards', async (req, res) => {
	res.send(await cards.findByCompany(req));
});
app.get('/card', async (req, res) => {
	res.send(await cards.findOne(req, res));
});
app.put('/cards/create', async (req, res) => {
	res.send(await cards.create(req));
});
app.get('/user/cards', async (req, res) => {
	res.send(await cards.findByUser(req));
});
app.post('/card/credit', async (req, res) => {
	let wallet = await wallets.findOne(req, res);
	let card = await cards.findOne(req, res);
	try {
		await cards.credit(wallet.balance, card.id, card.balance, req.body.amount);
		await wallets.debit(wallet.wallet_id, wallet.balance, req.body.amount);
	} catch(e){
		throw e
	}
	let updatedCard = await cards.findOne(req, res);
	res.send(updatedCard)
});
app.post('/card/debit', async (req, res) => {
	let wallet = await wallets.findOne(req, res);
	let card = await cards.findOne(req, res);
	try {
		await cards.debit(card.id, card.balance, req.body.amount);
	await wallets.credit(wallet.wallet_id, wallet.balance, req.body.amount);
	} catch(e){
		throw e
	}
	let updatedCard = await cards.findOne(req, res);
	res.send(updatedCard)
});
app.post('/card/lock', (req, res) => {
	res.send(JSON.stringify(req.body, null, 4))
});
app.post('/card/unlock', (req, res) => {
	res.send(JSON.stringify(req.body, null, 4))
});
app.listen(3001, () => {
	console.log('listening on port 3001');
});
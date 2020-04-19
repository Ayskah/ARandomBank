const mysql = require('mysql');
const util = require('util');
const config = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'arandombank'
};
const pool = mysql.createPool(config);
pool.query = util.promisify(pool.query)
pool.getConnection = util.promisify(pool.getConnection)
module.exports = pool;
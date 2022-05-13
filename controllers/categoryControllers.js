require("dotenv").config();
const mysql = require("mysql");
const config = require("../configs/databaseConfig");

const pool = mysql.createPool(config);

module.exports = {
	getAll: () =>
		new Promise((resolve, reject) => {
			pool.query(
				"SELECT * FROM categories ORDER BY category",
				(err, categories) => {
					err ? reject(err) : resolve(categories);
				}
			);
		}),
};

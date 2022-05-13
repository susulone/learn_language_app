require("dotenv").config();
const mysql = require("mysql");
const config = require("../configs/databaseConfig");

const pool = mysql.createPool(config);

module.exports = {
	connect: () =>
		new Promise((resolve, reject) => {
			pool.getConnection((error) =>
				error
					? reject(console.log("Database connection error", error))
					: resolve(console.log("Database connected"))
			);
		}),
};

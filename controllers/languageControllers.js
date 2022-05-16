require("dotenv").config();
const mysql = require("mysql");
const config = require("../configs/databaseConfig");

const pool = mysql.createPool(config);

module.exports = {
	getAll: () =>
		new Promise((resolve, reject) => {
			pool.query(
				"SELECT * FROM languages ORDER BY language",
				(err, languages) => {
					err ? reject(err) : resolve(languages);
				}
			);
		}),
	getById: (languageId) =>
		new Promise((resolve, reject) => {
			pool.query(
				"SELECT * FROM languages WHERE id=?",
				languageId,
				(err, languageById) => {
					if (err) reject(err);
					else if (languageById.length === 0) resolve(null);
					else resolve(languageById[0]);
				}
			);
		}),
};

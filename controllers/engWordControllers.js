require("dotenv").config();
const mysql = require("mysql");
const config = require("../configs/databaseConfig");

const pool = mysql.createPool(config);

module.exports = {
	getAll: () =>
		new Promise((resolve, reject) => {
			pool.query("SELECT * FROM eng_vocabulary", (err, lessons) => {
				err ? reject(err) : resolve(lessons);
			});
		}),
	getById: (wordId) =>
		new Promise((resolve, reject) => {
			pool.query(
				"SELECT * FROM eng_vocabulary WHERE id = ?",
				wordId,
				(err, location) => {
					if (err) reject(err);
					else if (location.length === 0) resolve(false);
					else resolve(location[0]);
				}
			);
		}),
	add: (set) =>
		new Promise((resolve, reject) => {
			pool.query("INSERT INTO eng_vocabulary SET ?", set, (err, result) => {
				err ? reject(err) : resolve(result);
			});
		}),
	deleteById: (wordId) =>
		new Promise((resolve, reject) => {
			pool.query(
				"DELETE FROM eng_vocabulary WHERE id=?",
				wordId,
				(err, result) => {
					err ? reject(err) : resolve(result.affectedRows > 0);
				}
			);
		}),
};

/**
 * @author Suvi Sulonen <suvi.sulonen@gmail.com>
 * @version 1.0.0
 */
require("dotenv").config();
const mysql = require("mysql");
const config = require("../configs/databaseConfig");

const pool = mysql.createPool(config);

module.exports = {
	/**
	 * getAll will perform an database query to get all information from the
	 * languages table.
	 * @returns
	 */
	getAll: () =>
		new Promise((resolve, reject) => {
			pool.query(
				"SELECT * FROM languages ORDER BY language",
				(err, languages) => {
					err ? reject(err) : resolve(languages);
				}
			);
		}),
	/**
	 * getById will perform an database query to get all information from the row
	 *  which matches the given id as a parameter.
	 * The succesfully resived data will be returned with the promises resolve.
	 * @param {number} languageId the id of the language we are querying with
	 * @returns
	 */
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

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
	 * getAll will perform an database query to get all information from the category table.
	 * The succesfully resived data will be returned with the promises resolve.
	 * @method getAll
	 */
	getAll: () =>
		new Promise((resolve, reject) => {
			pool.query(
				"SELECT * FROM categories ORDER BY category",
				(err, categories) => {
					err ? reject(err) : resolve(categories);
				}
			);
		}),

	/**
	 * getById will perform an database query to get all information from row which
	 * has the id given as a parameter.
	 * The succesfully resived data will be returned with the promises resolve.
	 * @param {number} categoryId - the id of the category we are querying with
	 */
	getById: (categoryId) =>
		new Promise((resolve, reject) => {
			pool.query(
				"SELECT * FROM categories WHERE id=?",
				categoryId,
				(err, categoryById) => {
					if (err) reject(err);
					else if (categoryById.length === 0) resolve(null);
					else resolve(categoryById[0]);
				}
			);
		}),
	// These functions are not yet available

	// add: (set) =>
	// 	new Promise((resolve, reject) => {
	// 		pool.query("INSERT INTO categories SET ?", set, (err, result) => {
	// 			err ? reject(err) : resolve(result);
	// 		});
	// 	}),
	// deleteById: (categoryId) =>
	// 	new Promise((resolve, reject) => {
	// 		pool.query(
	// 			"DELETE FROM categories WHERE id=?",
	// 			categoryId,
	// 			(err, result) => {
	// 				err ? reject(err) : resolve(result.affectedRows > 0);
	// 			}
	// 		);
	// 	}),

	getAllCategoriesById: (categoryId) =>
		/**
		 * getById will perform an database query to get the information about the lesson and the other related categories (parent or sub)
		 * related to the the category id given as a parameter.
		 * The succesfully resived data will be returned with the promises resolve.
		 * @param {number} categoryId - the id of the wordPair we are querying with
		 */
		new Promise((resolve, reject) => {
			pool.query(
				"SELECT main.id, main.category, main.parent_id, sub.category as related_category, sub.id as related_category_id, lessons.title as lesson_name, lessons.id as lesson_id FROM categories as main INNER JOIN categories as sub ON sub.parent_id=main.id INNER JOIN lessons ON sub.id=lessons.category_id WHERE main.id=? UNION SELECT sub.id, sub.category,sub.parent_id, main.category as main_category, main.id as related_category_id, lessons.title as lesson_name, lessons.id as lesson_id FROM categories as sub INNER JOIN categories as main ON main.id=sub.parent_id INNER JOIN lessons ON sub.id=lessons.category_id WHERE sub.id=?",
				[categoryId, categoryId],
				(err, categories) => {
					if (err) reject(err);
					else if (categories.length === 0) resolve(false);
					else resolve(categories[0]);
				}
			);
		}),
};

require("dotenv").config();
const mysql = require("mysql");
const config = require("../configs/databaseConfig");

const pool = mysql.createPool(config);

module.exports = {
	/**
	 * getAll will perform an database query to get all information from the lessons table.
	 * The succesfully resived data will be returned with the promises resolve
	 * @method getAll
	 */
	getAll: () =>
		new Promise((resolve, reject) => {
			pool.query("SELECT * FROM lessons", (err, lessons) => {
				err ? reject(err) : resolve(lessons);
			});
		}),
	/**
	 * getAllWithCategoryNames will perform an database query to get all information from the lessons
	 * table and the category names, and the parent categories related to the category id's in the
	 * lessons table.
	 * The succesfully resived data will be returned with the promises resolve
	 * @method getAllWithCategoryNames
	 */
	getAllWithCategoryNames: () =>
		new Promise((resolve, reject) => {
			pool.query(
				"SELECT lessons.id, title, description, category_id, cat.category, cat.parent_id, parent.category as parent_category FROM categories as cat INNER JOIN categories as parent ON parent.id=cat.parent_id INNER JOIN lessons on lessons.category_id=cat.id",
				(err, lessons) => {
					err ? reject(err) : resolve(lessons);
				}
			);
		}),
	/**
	 * getById will perform an database query to get all information about an individual lesson which has the id given as a parameter.
	 * The succesfully resived data will be returned with the promises resolve.
	 * @method getById
	 * @param {number} lessonId - the id of the lesson we are querying with
	 */
	getById: (lessonId) =>
		new Promise((resolve, reject) => {
			pool.query(
				"SELECT lessons.id, title, description, category_id, cat.category, cat.parent_id, parent.category as parent_category FROM categories as cat INNER JOIN categories as parent ON parent.id=cat.parent_id INNER JOIN lessons on lessons.category_id=cat.id WHERE lessons.id=?",
				lessonId,
				(err, lesson) => {
					if (err) reject(err);
					else if (lesson.length === 0) resolve(null);
					else resolve(lesson[0]);
				}
			);
		}),
	//This feature is currently not available
	//
	// findById: (lessonId) =>
	// 	new Promise((resolve, reject) => {
	// 		pool.query(
	// 			"SELECT * FROM lessons WHERE id=?",
	// 			lessonId,
	// 			(err, lesson) => {
	// 				if (err) reject(err);
	// 				else if (lesson.length === 0) resolve(null);
	// 				else resolve(lesson[0]);
	// 			}
	// 		);
	// 	}),
	/**
	 * deleteById will perform an database query to delete all information about an individual lesson which has the id given as a parameter.
	 * The succesfully resived data will be returned with the promises resolve.
	 * @method deleteById
	 * @param {number} lessonId - the id of the lesson we are querying with
	 */
	deleteById: (lessonId) =>
		new Promise((resolve, reject) => {
			pool.query("DELETE FROM lessons WHERE id=?", lessonId, (err, result) => {
				err ? reject(err) : resolve(result.affectedRows > 0);
			});
		}),
	/**
	 * add will perform an database query to insert new lesson whth the information given as a parameter.
	 * The succesfully resived data will be returned with the promises resolve.
	 * @method add
	 * @param {object} set - an object with title, description and catetegory_id
	 */
	add: (set) =>
		new Promise((resolve, reject) => {
			pool.query("INSERT INTO lessons SET ?", set, (err, result) => {
				err ? reject(err) : resolve(result);
			});
		}),
	// This feature is currently not available
	//
	// edit: (id, title, description, category_id) =>
	// 	new Promise((resolve, reject) => {
	// 		let sql = `UPDATE lessons SET title = ?, description = ?, category_id = ? WHERE id = ?`;
	// 		pool.query(sql, [title, description, category_id, id], (err, result) => {
	// 			err ? reject(err) : resolve(result);
	// 		});
	// 	}),
};

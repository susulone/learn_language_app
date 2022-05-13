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
	getCategoryById: (categoryId) =>
		new Promise((resolve, reject) => {
			pool.query(
				"SELECT main.id, main.category, main.parent_id, sub.category as related_category, sub.id as related_category_id, lessons.title as lesson_name, lessons.id as lesson_id FROM categories as main INNER JOIN categories as sub ON sub.parent_id=main.id INNER JOIN lessons ON sub.id=lessons.category_id WHERE main.id=? UNION SELECT sub.id, sub.category,sub.parent_id, main.category as main_category, main.id as related_category_id, lessons.title as lesson_name, lessons.id as lesson_id FROM categories as sub INNER JOIN categories as main ON main.id=sub.parent_id INNER JOIN lessons ON sub.id=lessons.category_id WHERE sub.id=?",
				[categoryId, categoryId],
				(err, category) => {
					if (err) reject(err);
					else if (category.length === 0) resolve(null);
					else resolve(category[0]);
				}
			);
		}),

	// getCategoryById: (categoryId) =>
	// 	new Promise((resolve, reject) => {
	// 		pool.query(
	// 			"SELECT * FROM categories WHERE categories.id=?",
	// 			categoryId,
	// 			(err, category) => {
	// 				if (err) reject(err);
	// 				else if (category.length === 0) resolve(null);
	// 				else resolve(category[0]);
	// 			}
	// 		);
	// 	}),

	// getCategoryById: (categoryId) =>
	// new Promise((resolve, reject) => {
	// 	pool.query(
	// 		"SELECT cat.id, cat.category, parent.category as parent_category, lessons.title as lesson_name FROM categories as cat INNER JOIN categories as parent ON parent.id=cat.parent_id INNER JOIN lessons ON cat.id=lessons.category_id WHERE cat.id=?",
	// 		categoryId,
	// 		(err, category) => {
	// 			if (err) reject(err);
	// 			else if (category.length === 0) resolve(null);
	// 			else resolve(category);
	// 		}
	// 	);
	// }),
};

require("dotenv").config();
const mysql = require("mysql");
const config = require("../configs/databaseConfig");

const pool = mysql.createPool(config);

module.exports = {
	getAll: () =>
		new Promise((resolve, reject) => {
			pool.query("SELECT * FROM lessons", (err, lessons) => {
				err ? reject(err) : resolve(lessons);
			});
		}),
	getAllWithCategoryNames: () =>
		new Promise((resolve, reject) => {
			pool.query(
				"SELECT lessons.id, title, description, body, category_id, cat.category, cat.parent_id, parent.category as parent_category FROM categories as cat INNER JOIN categories as parent ON parent.id=cat.parent_id INNER JOIN lessons on lessons.category_id=cat.id",
				(err, lessons) => {
					err ? reject(err) : resolve(lessons);
				}
			);
		}),
	getLessonById: (lessonId) =>
		new Promise((resolve, reject) => {
			pool.query(
				"SELECT lessons.id, title, description, body category_id, cat.category, cat.parent_id, parent.category as parent_category FROM categories as cat INNER JOIN categories as parent ON parent.id=cat.parent_id INNER JOIN lessons on lessons.category_id=cat.id WHERE lessons.id=?",
				lessonId,
				(err, lesson) => {
					if (err) reject(err);
					else if (lesson.length === 0) resolve(null);
					else resolve(lesson);
				}
			);
		}),
};

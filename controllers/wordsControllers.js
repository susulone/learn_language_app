require("dotenv").config();
const mysql = require("mysql");
const config = require("../configs/databaseConfig");

const pool = mysql.createPool(config);

module.exports = {
	getAll: () =>
		new Promise((resolve, reject) => {
			pool.query("SELECT * FROM words", (err, words) => {
				err ? reject(err) : resolve(words);
			});
		}),
	getAllSwe: () =>
		new Promise((resolve, reject) => {
			pool.query(
				"SELECT id, swe_word, lesson_id FROM words",
				(err, sweWords) => {
					if (err) reject(err);
					else if (sweWords.length === 0) resolve(false);
					else resolve(sweWords);
				}
			);
		}),
	getAllEng: () =>
		new Promise((resolve, reject) => {
			pool.query(
				"SELECT id, eng_word, lesson_id FROM words",
				(err, engWords) => {
					if (err) reject(err);
					else if (engWords.length === 0) resolve(false);
					else resolve(engWords);
				}
			);
		}),
	getById: (wordId) =>
		new Promise((resolve, reject) => {
			pool.query(
				"SELECT * FROM words WHERE id = ?",
				wordId,
				(err, resultsById) => {
					if (err) reject(err);
					else if (resultsById.length === 0) resolve(false);
					else resolve(resultsById[0]);
				}
			);
		}),
	getSweById: (wordId) =>
		new Promise((resolve, reject) => {
			pool.query(
				"SELECT id, swe_word FROM words WHERE id = ?",
				wordId,
				(err, sweWord) => {
					if (err) reject(err);
					else if (sweWord.length === 0) resolve(false);
					else resolve(sweWord[0]);
				}
			);
		}),

	getEngById: (wordId) =>
		new Promise((resolve, reject) => {
			pool.query(
				"SELECT id, eng_word FROM words WHERE id = ?",
				wordId,
				(err, engWord) => {
					if (err) reject(err);
					else if (engWord.length === 0) resolve(false);
					else resolve(engWord[0]);
				}
			);
		}),
	getByLessonId: (lessonId) =>
		new Promise((resolve, reject) => {
			pool.query(
				"SELECT eng_word, swe_word FROM words WHERE lesson_id=?",
				lessonId,
				(err, wordsByLesson) => {
					if (err) reject(err);
					else if (wordsByLesson.length === 0) resolve(false);
					else resolve(wordsByLesson);
				}
			);
		}),

	gewSweWordsByLessonId: (lessonId) =>
		new Promise((resolve, reject) => {
			pool.query(
				"SELECT swe_word FROM words WHERE lesson_id=?",
				lessonId,
				(err, wordsByLesson) => {
					if (err) reject(err);
					else if (wordsByLesson.length === 0) resolve(false);
					else resolve(wordsByLesson);
				}
			);
		}),

	gewEngWordsByLessonId: (lessonId) =>
		new Promise((resolve, reject) => {
			pool.query(
				"SELECT eng_word FROM words WHERE lesson_id=?",
				lessonId,
				(err, wordsByLesson) => {
					if (err) reject(err);
					else if (wordsByLesson.length === 0) resolve(false);
					else resolve(wordsByLesson);
				}
			);
		}),
	add: (set) =>
		new Promise((resolve, reject) => {
			pool.query("INSERT INTO words SET ?", set, (err, result) => {
				err ? reject(err) : resolve(result);
			});
		}),
	edit: (id, eng_word, swe_word, lesson_id) =>
		new Promise((resolve, reject) => {
			let sql = `UPDATE words SET eng_word = ?, swe_word = ?, lesson_id = ? WHERE id = ?`;
			pool.query(sql, [eng_word, swe_word, lesson_id, id], (err, result) => {
				err ? reject(err) : resolve(result);
			});
		}),
	deleteById: (wordId) =>
		new Promise((resolve, reject) => {
			pool.query("DELETE FROM words WHERE id=?", wordId, (err, result) => {
				err ? reject(err) : resolve(result.affectedRows > 0);
			});
		}),
};

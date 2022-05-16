require("dotenv").config();
const mysql = require("mysql");
const config = require("../configs/databaseConfig");

const pool = mysql.createPool(config);

module.exports = {
	getAll: () =>
		new Promise((resolve, reject) => {
			pool.query(
				"SELECT wm.id, wm.language1_id, wm.language1_word_id as eng_word_id, eng_vocabulary.word as eng_word, wm.language2_id, wm.language2_word_id as swe_word_id, swe_vocabulary.word as swe_word, wm.lesson_id FROM word_matches as wm INNER JOIN eng_vocabulary ON wm.language1_word_id=eng_vocabulary.id INNER JOIN swe_vocabulary ON wm.language2_word_id=swe_vocabulary.id",
				(err, lessons) => {
					err ? reject(err) : resolve(lessons);
				}
			);
		}),
	getById: (id) =>
		new Promise((resolve, reject) => {
			pool.query(
				"SELECT wm.id, wm.language1_word_id, eng_vocabulary.word as eng_word, wm.language2_word_id, swe_vocabulary.word as swe_word, wm.lesson_id, lessons.title FROM word_matches as wm INNER JOIN lessons ON wm.lesson_id=lessons.id INNER JOIN eng_vocabulary ON wm.language1_word_id=eng_vocabulary.id INNER JOIN swe_vocabulary ON wm.language2_word_id=swe_vocabulary.id WHERE wm.id=?",
				id,
				(err, location) => {
					if (err) reject(err);
					else if (location.length === 0) resolve(false);
					else resolve(location[0]);
				}
			);
		}),
	add: (set) =>
		new Promise((resolve, reject) => {
			pool.query("INSERT INTO word_matches SET ?", set, (err, result) => {
				err ? reject(err) : resolve(result);
			});
		}),

	deleteById: (pairId) =>
		new Promise((resolve, reject) => {
			pool.query(
				"DELETE FROM word_matches WHERE id=?",
				pairId,
				(err, result) => {
					err ? reject(err) : resolve(result.affectedRows > 0);
				}
			);
		}),
	getByLesson: (lessonId) =>
		new Promise((resolve, reject) => {
			pool.query(
				"SELECT wm.id, wm.language1_word_id, eng_vocabulary.word as eng_word, wm.language2_word_id, swe_vocabulary.word as swe_word, wm.lesson_id, lessons.title FROM word_matches as wm INNER JOIN lessons ON wm.lesson_id=lessons.id INNER JOIN eng_vocabulary ON wm.language1_word_id=eng_vocabulary.id INNER JOIN swe_vocabulary ON wm.language2_word_id=swe_vocabulary.id WHERE lessons.id=?",
				lessonId,
				(err, wordPairs) => {
					if (err) reject(err);
					else if (wordPairs.length === 0) resolve(false);
					else resolve(wordPairs);
				}
			);
		}),
};

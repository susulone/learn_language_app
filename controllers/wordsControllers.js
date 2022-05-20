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
	 * getAll will perform an database query to get all information from the words table.
	 * The succesfully resived data will be returned with the promises resolve
	 * @method getAll
	 */
	getAll: () =>
		new Promise((resolve, reject) => {
			pool.query("SELECT * FROM words", (err, words) => {
				err ? reject(err) : resolve(words);
			});
		}),
	/**
	 * getAllSwe will perform an database query to get all information from the
	 * swe_words and id columns in the words table.
	 * The succesfully resived data will be returned with the promises resolve
	 * @method getAllSwe
	 */
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
	/**
	 * getAllEng will perform an database query to get all information from the
	 * swe_words and id columns in the words table.
	 * The succesfully resived data will be returned with the promises resolve
	 * @method getAllEng
	 */
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
	/**
	 * getById will perform an database query to get all information from row which has the id given as a parameter.
	 * The succesfully resived data will be returned with the promises resolve.
	 * @param {number} wordId - the id of the wordPair we are querying with
	 */
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
	/**
	 * getSweById will perform an database query to get the swe_word and id
	 * from row which has the id given as a parameter.
	 * The succesfully resived data will be returned with the promises resolve.
	 * @param {number} wordId - the id of the wordPair we are querying with
	 */
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
	/**
	 * getEngById will perform an database query to get the eng_word and id
	 * from row which has the id given as a parameter.
	 * The succesfully resived data will be returned with the promises resolve.
	 * @param {number} wordId - the id of the wordPair we are querying with
	 */
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
	/**
	 * getByLessonId will perform an database query to get all the rows that
	 * have the given parameter as a value in the lesson_id.
	 * The succesfully resived data will be returned with the promises resolve.
	 * @param {number} lessonId the id of the lesson we are querying with
	 */
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
	/**
	 * getSweWordsByLessonId will perform an database query to get all the
	 * swe_word fileds that have the given parameter as a value in the lesson_id.
	 * The succesfully resived data will be returned with the promises resolve.
	 * @param {number} lessonId
	 */
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

	/**
	 * getEngWordsByLessonId will perform an database query to get all the
	 * eng_word fileds that have the given parameter as a value in the lesson_id.
	 * The succesfully resived data will be returned with the promises resolve.
	 * @param {number} lessonId
	 */
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
	/**
	 * add will perform an database query to insert new word pair with the
	 * information given as a parameter.
	 * @param {object} set an object with title, description and catetegory_id
	 * @returns
	 */
	add: (set) =>
		new Promise((resolve, reject) => {
			pool.query("INSERT INTO words SET ?", set, (err, result) => {
				err ? reject(err) : resolve(result);
			});
		}),
	/**
	 * edit will perform an database query to update the eng_word, swe_word and
	 *  lesson_id fields where the id matches the given id parameter.
	 * @param {number} id
	 * @param {string} eng_word
	 * @param {string} swe_word
	 * @param {number} lesson_id
	 * @returns
	 */
	edit: (id, eng_word, swe_word, lesson_id) =>
		new Promise((resolve, reject) => {
			let sql = `UPDATE words SET eng_word = ?, swe_word = ?, lesson_id = ? WHERE id = ?`;
			pool.query(sql, [eng_word, swe_word, lesson_id, id], (err, result) => {
				err ? reject(err) : resolve(result);
			});
		}),
	/**
	 * deleteById will perform an database query to delete all information from the row
	 * which has the id given as a parameter.
	 * @param {number} wordId
	 */
	deleteById: (wordId) =>
		new Promise((resolve, reject) => {
			pool.query("DELETE FROM words WHERE id=?", wordId, (err, result) => {
				err ? reject(err) : resolve(result.affectedRows > 0);
			});
		}),
};

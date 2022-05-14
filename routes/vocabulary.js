const express = require("express");
const router = express.Router();
const controllers = require("../controllers/vocabularyControllers.js");

// router.get("/", async (req, res) => {
// 	try {
// 		let allCategories = await controllers.getAll();
// 		res.status(200).send(allCategories);
// 	} catch (err) {
// 		res.status(500).end(err);
// 	}
// });

router.get("/eng", async (req, res) => {
	try {
		let allSweWords = await controllers.getAllEnglishWords();
		res.status(200).send(allSweWords);
	} catch (err) {
		res.status(500).end(err);
	}
});

router.get("/swe", async (req, res) => {
	try {
		let allSweWords = await controllers.getAllSwedishWords();
		res.status(200).send(allSweWords);
	} catch (err) {
		res.status(500).end(err);
	}
});

router.get("/all-matches", async (req, res) => {
	try {
		let allWordMatches = await controllers.getAllWordMatches();
		res.status(200).send(allWordMatches);
	} catch (err) {
		res.status(500).end(err);
	}
});

router.get("/by-lesson-id/:id([0-9]+)", async (req, res) => {
	const id = +req.params.id;
	try {
		let wordPairsById = await controllers.getWordPairsByLessonId(id);
		// if (wordPairsById === null) {
		// 	res.status(404).end();
		// } else {
		res.status(200).send(wordPairsById);
		// }
	} catch (err) {
		res.status(500).end(err);
	}
});

module.exports = router;

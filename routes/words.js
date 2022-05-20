/**
 * @author Suvi Sulonen <suvi.sulonen@gmail.com>
 * @version 1.0.0
 */
const express = require("express");
const router = express.Router();
const controllers = require("../controllers/wordsControllers.js");

router.get("/", async (req, res) => {
	try {
		let allWords = await controllers.getAll();
		res.status(200).send(allWords);
	} catch (err) {
		res.status(500).end(err);
	}
});

router.post("/", async (reg, res) => {
	let newWordPair = reg.body;
	try {
		let createdWord = await controllers.add(newWordPair);
		res.status(201).send(createdWord);
	} catch (err) {
		res.status(500).end(err);
	}
});

router.get("/:id([0-9]+)", async (req, res) => {
	const id = +req.params.id;
	try {
		let resultById = await controllers.getById(id);
		if (resultById === false) {
			res.status(404).end();
		} else {
			res.status(200).send(resultById);
		}
	} catch (err) {
		res.status(500).end(err);
	}
});

router.delete("/:id([0-9]+)", async (req, res) => {
	const id = +req.params.id;
	try {
		let deletedResult = await controllers.deleteById(id);
		if (deletedResult === false) {
			return res.status(404).end();
		} else {
			res.status(200).send(deletedResult);
		}
	} catch (err) {
		res.status(500).end();
	}
});

router.get("/swe", async (req, res) => {
	try {
		let allSweWords = await controllers.getAllSwe();
		if (allSweWords === false) {
			res.status(404).send(allSweWords);
		} else {
			res.status(200).send(allSweWords);
		}
	} catch (err) {
		res.status(500).end(err);
	}
});

router.get("/swe/:id([0-9]+)", async (req, res) => {
	const id = +req.params.id;
	try {
		let sweResultById = await controllers.getSweById(id);
		if (sweResultById === false) {
			res.status(404).send(sweResultById);
		} else {
			res.status(200).send(sweResultById);
		}
	} catch (err) {
		res.status(500).end(err);
	}
});

router.get("/swe/lesson:id([0-9]+)", async (req, res) => {
	const id = +req.params.id;
	try {
		let sweResultById = await controllers.gewSweWordsByLessonId(id);
		if (sweResultById === false) {
			res.status(404).send(sweResultById);
		} else {
			res.status(200).send(sweResultById);
		}
	} catch (err) {
		res.status(500).end(err);
	}
});

router.get("/eng/", async (req, res) => {
	try {
		let allEngWords = await controllers.getAllEng();
		if (allEngWords === false) {
			console.log(Math.random());
			res.status(404).send(allEngWords);
		} else {
			res.status(200).send(allEngWords);
		}
	} catch (err) {
		res.status(500).end(err);
	}
});

router.get("/eng/:id([0-9]+)", async (req, res) => {
	const id = +req.params.id;
	try {
		let engResultById = await controllers.getEngById(id);
		if (engResultById === false) {
			res.status(404).send(engResultById);
		} else {
			res.status(200).send(engResultById);
		}
	} catch (err) {
		res.status(500).end(err);
	}
});

router.get("/eng/lesson:id([0-9]+)", async (req, res) => {
	const id = +req.params.id;
	try {
		let engResultById = await controllers.gewEngWordsByLessonId(id);
		if (engResultById === false) {
			res.status(404).send(engResultById);
		} else {
			res.status(200).send(engResultById);
		}
	} catch (err) {
		res.status(500).end(err);
	}
});

router.get("/lesson:id([0-9]+)", async (req, res) => {
	const id = +req.params.id;
	try {
		let wordsByLesson = await controllers.getByLessonId(id);
		if (wordsByLesson === false) {
			res.status(404).send(wordsByLesson);
		} else {
			res.status(200).send(wordsByLesson);
		}
	} catch (err) {
		res.status(500).end(err);
	}
});
router.put("/edit/:id([0-9]+)", async (req, res) => {
	const id = +req.params.id;
	const eng_word = req.body.eng_word;
	const swe_word = req.body.swe_word;
	const lesson_id = req.body.lesson_id;
	console.log(eng_word, swe_word, lesson_id, id);
	try {
		let updatedResult = await controllers.edit(
			id,
			eng_word,
			swe_word,
			lesson_id
		);
		if (updatedResult === false) {
			res.status(404).send(false);
		} else {
			res.status(200).send(updatedResult);
		}
	} catch (err) {
		res.status(500).end(err);
	}
});

module.exports = router;

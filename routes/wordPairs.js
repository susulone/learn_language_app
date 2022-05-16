const express = require("express");
const router = express.Router();
const controllers = require("../controllers/wordPairControllers");

router.get("/", async (req, res) => {
	try {
		let allWordMatches = await controllers.getAll();
		res.status(200).send(allWordMatches);
	} catch (err) {
		res.status(500).end(err);
	}
});

router.get("/:id([0-9]+)", async (req, res) => {
	const id = +req.params.id;
	try {
		let pairsById = await controllers.getById(id);
		if (pairsById === false) {
			res.status(404).end();
		} else {
			res.status(200).send(pairsById);
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

router.post("/", async (reg, res) => {
	let newPair = reg.body;
	try {
		let savedPair = await controllers.add(newPair);
		res.status(201).send(savedPair);
	} catch (err) {
		res.status(500).end(err);
	}
});

router.get("/from-lesson/:id([0-9]+)", async (req, res) => {
	const lessonId = +req.params.id;
	try {
		let pairsByLessonId = await controllers.getByLesson(lessonId);
		if (pairsByLessonId === false) {
			res.status(404).end();
		} else {
			res.status(200).send(pairsByLessonId);
		}
	} catch (err) {
		res.status(500).end(err);
	}
});

module.exports = router;

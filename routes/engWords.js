const express = require("express");
const router = express.Router();
const controllers = require("../controllers/engWordControllers.js");

router.get("/", async (req, res) => {
	try {
		let allWords = await controllers.getAll();
		res.status(200).send(allWords);
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

router.post("/", async (reg, res) => {
	let newWord = reg.body;
	try {
		let createdWord = await controllers.add(newWord);
		res.status(201).send(createdWord);
	} catch (err) {
		res.status(500).end(err);
	}
});
module.exports = router;

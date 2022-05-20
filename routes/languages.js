/**
 * @author Suvi Sulonen <suvi.sulonen@gmail.com>
 * @version 1.0.0
 */
const express = require("express");
const router = express.Router();
const controllers = require("../controllers/languageControllers");

router.get("/", async (req, res) => {
	try {
		let allLanguages = await controllers.getAll();
		res.status(200).send(allLanguages);
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

module.exports = router;

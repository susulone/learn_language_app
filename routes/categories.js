const express = require("express");
const router = express.Router();
const controllers = require("../controllers/categoryControllers.js");

router.get("/", async (req, res) => {
	try {
		let allCategories = await controllers.getAll();
		res.status(200).send(allCategories);
	} catch (err) {
		res.status(500).end(err);
	}
});

router.get("/:id([0-9]+)", async (req, res) => {
	const id = +req.params.id;
	try {
		let resultById = await controllers.getCategoryById(id);
		if (resultById === null) {
			res.status(404).end();
		} else {
			res.status(200).send(resultById);
		}
	} catch (err) {
		res.status(500).end(err);
	}
});

module.exports = router;

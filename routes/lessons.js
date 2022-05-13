const express = require("express");
const router = express.Router();
const controllers = require("../controllers/lessonControllers");

router.get("/", async (req, res) => {
	try {
		let allLessons = await controllers.getAllWithCategoryNames();
		return res.status(200).send(allLessons);
	} catch (err) {
		return res.status(500).end(err);
	}
});

router.get("/:id([0-9]+)", async (req, res) => {
	const id = +req.params.id;
	try {
		let resultById = await controllers.getLessonById(id);
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

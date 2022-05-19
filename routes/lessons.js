const express = require("express");
const router = express.Router();
const controllers = require("../controllers/lessonControllers");

router.get("/", async (req, res) => {
	try {
		let allLessons = await controllers.getAll();
		return res.status(200).send(allLessons);
	} catch (err) {
		return res.status(500).end(err);
	}
});

router.get("/:id([0-9]+)", async (req, res) => {
	const id = +req.params.id;
	try {
		let resultById = await controllers.getById(id);
		if (resultById === null) {
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

router.get("/edit/:id([0-9]+)", async (req, res) => {
	const id = +req.params.id;
	try {
		let resultById = await controllers.findById(id);
		if (resultById === null) {
			res.status(404).end();
		} else {
			res.status(200).send(resultById);
		}
	} catch (err) {
		res.status(500).end(err);
	}
});

// does not work!!!
// router.put("/:id([0-9]+)", async (req, res) => {
// 	const id = +req.params.id;
// 	// let id = req.body.id;
// 	let title = req.body.title;
// 	let description = req.body.description;
// 	let category_id = req.body.category_id;
// 	console.log(req.body);
// 	try {
// 		let editedLesson = await controllers.editTitle(
// 			id,
// 			title,
// 			description,
// 			category_id
// 		);
// 		res.status().send(editedLesson);
// 	} catch (err) {
// 		res.status(500).end(err.data);
// 	}
// });

// router.patch("/edit/:id([0-9]+)", (req, res) => {
// 	const id = req.params.id;
// 	let updatedInput = req.body;
// });

router.post("/", async (req, res) => {
	let newLesson = req.body;
	try {
		let createdLesson = await controllers.add(newLesson);
		res.status(201).send(createdLesson);
	} catch (err) {
		res.status(500).end(err);
	}
});

router.get("/with-category-name", async (req, res) => {
	try {
		let allLessons = await controllers.getAllWithCategoryNames();
		return res.status(200).send(allLessons);
	} catch (err) {
		return res.status(500).end(err);
	}
});

module.exports = router;

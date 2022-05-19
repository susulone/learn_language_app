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

// this feature is currently not available
// router.put("/edit/:id([0-9]+)", async (req, res) => {
// 	const id = +req.params.id;
// 	// let id = req.body.id;
// 	const title = req.body.title;
// 	const description = req.body.description;
// 	const category_id = req.body.category_id;
// 	console.log(req.body);
// 	try {
// 		let updatedResult = await controllers.edit(
// 			title,
// 			description,
// 			category_id,
// 			id
// 		);
// 		if (updatedResult === false) {
// 			res.status(404).send(false);
// 		} else {
// 			res.status().send(updatedResult);
// 		}
// 	} catch (err) {
// 		res.status(500).end(err.data);
// 	}
// });

// router.post("/", async (req, res) => {
// 	let newLesson = req.body;
// 	try {
// 		let createdLesson = await controllers.add(newLesson);
// 		res.status(201).send(createdLesson);
// 	} catch (err) {
// 		res.status(500).end(err);
// 	}
// });

router.get("/with-category-name", async (req, res) => {
	try {
		let allLessons = await controllers.getAllWithCategoryNames();
		return res.status(200).send(allLessons);
	} catch (err) {
		return res.status(500).end(err);
	}
});

module.exports = router;

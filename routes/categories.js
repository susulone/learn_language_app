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

module.exports = router;

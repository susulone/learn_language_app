/**
 * @author Suvi Sulonen <suvi.sulonen@gmail.com>
 * @version 1.0.0
 */
const express = require("express");
const cors = require("cors");
const path = require("path");

/**
 * Import controllers
 */
const database = require("./controllers/databaseControllers");
const categoryRoutes = require("./routes/categories");
const lessonRoutes = require("./routes/lessons");
const languageRoutes = require("./routes/languages");
const wordRoutes = require("./routes/words");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.json());
// app.use(express.urlencoded({ extended: false}));

/**
 * The backend routes
 */
app.use("/api/categories", categoryRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/lang", languageRoutes);
app.use("/api/words", wordRoutes);

/**
 * This route catches all the rest of the routes that are not
 * caught with the routes above.
 */
app.get("/*", function (req, res) {
	res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const server = app.listen(port, () => {
	console.log(`Listening on port ${server.address().port}`);
	database.connect();
});

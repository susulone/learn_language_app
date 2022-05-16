const express = require("express");
const cors = require("cors");
const path = require("path");
const database = require("./controllers/databaseControllers");
const categoryRoutes = require("./routes/categories");
const lessonRoutes = require("./routes/lessons");
const wordPairRoutes = require("./routes/wordPairs");
const languageRoutes = require("./routes/languages");
const sweWordRoutes = require("./routes/sweWords");
const engWordRoutes = require("./routes/engWords");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.json());
// app.use(express.urlencoded({ extended: false}));

app.use("/api/categories", categoryRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/swe", sweWordRoutes);
app.use("/api/eng", engWordRoutes);
app.use("/api/pairs", wordPairRoutes);
app.use("/api/lang", languageRoutes);

app.get("/*", function (req, res) {
	res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const server = app.listen(port, () => {
	console.log(`Listening on port ${server.address().port}`);
	database.connect();
});

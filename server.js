const express = require("express");
const cors = require("cors");
const path = require("path");
const database = require("./controllers/databaseControllers");
const lessonRoutes = require("./routes/lessons");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.json());

app.use("/api/lessons", lessonRoutes);

app.get("/*", function (req, res) {
	res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const server = app.listen(port, () => {
	console.log(`Listening on port ${server.address().port}`);
	database.connect();
});

const express = require("express");
const cors = require("cors");
const app = express();

const database = require("./controllers/databaseController");
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const server = app.listen(port, () => {
	console.log(`Listening on port ${server.address().port}`);
	database.connect();
});

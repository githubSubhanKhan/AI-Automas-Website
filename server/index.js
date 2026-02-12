const dotenv = require("dotenv");
dotenv.config();

const app = require("./api/app");
const connectDB = require("./api/config/db");

// Connect Database
connectDB();

app.get("/", (req, res) => res.send("Backend is running!"));

module.exports = app;
const dotenv = require("dotenv");
dotenv.config();

const app = require("./api/app");
const connectDB = require("./api/config/db");

// Connect Database
connectDB();

app.get("/", (req, res) => res.send("Backend is running!"));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;
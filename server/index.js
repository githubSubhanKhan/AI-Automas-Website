const dotenv = require("dotenv");
dotenv.config();

const app = require("./api/app");
const connectDB = require("./api/config/db");

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

app.get("/", (req, res) => res.send("Backend is running!"));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

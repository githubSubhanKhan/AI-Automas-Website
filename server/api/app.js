const express = require("express");
const cors = require("cors");
const contactRoutes = require("./routes/contact.routes");
const errorHandler = require("./middlewares/error.middleware");
const callRoutes = require("./routes/call.routes");

const app = express();



// Middlewares
app.use(
  cors({
    origin: ["http://localhost:5173", "https://aiautomas.com","https://aiautomas.vercel.app", "https://ai-automas.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());

// Routes
app.use("/api", contactRoutes);


app.use("/api/call", callRoutes);

// Error Handler
app.use(errorHandler);

module.exports = app;

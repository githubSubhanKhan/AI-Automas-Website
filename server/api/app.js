const express = require("express");
const cors = require("cors");
const contactRoutes = require("./routes/contact.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

const callRoutes = require("./routes/call.routes");


// Middlewares
app.use(cors());

app.use(express.json());

// Routes
app.use("/api", contactRoutes);


app.use("/api/call", callRoutes);

// Error Handler
app.use(errorHandler);

module.exports = app;

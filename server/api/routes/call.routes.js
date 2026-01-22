const express = require("express");
const router = express.Router();

const { makeCall } = require("../controllers/call.controller");

router.post("/call", makeCall);

module.exports = router;

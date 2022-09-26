const express = require("express");
const router = express.Router();
const outboundController = require("../controllers/outboundController");

router.post("/:id", outboundController.index);

module.exports = router;

const express = require("express");
const router = express.Router();
const lineController = require("../controllers/lineController");

router.post("/", lineController.sendMessage);
router.post("/webhook", lineController.webhook);

module.exports = router;

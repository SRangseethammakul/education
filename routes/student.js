const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.get("/", studentController.index);
router.post("/", studentController.insert);

module.exports = router;

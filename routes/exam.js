const express = require("express");
const router = express.Router();
const examinationController = require("../controllers/examinationController");

router.get("/exam", examinationController.index);
router.post("/exam", examinationController.insert);
router.post("/qustion", examinationController.insertQuestion);
router.post("/choice", examinationController.insertChoice);

module.exports = router;

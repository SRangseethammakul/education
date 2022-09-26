const Exam = require("../models/exam");
const { lineBrordcast } = require("../functions/lineFunction");
const { cardOfExam } = require("../utils/flexContent");
const { lineMessageTemplateContent } = require("../utils/lineTemplate");
exports.index = async (req, res, next) => {
  try {
    const { id } = req.params;
    const exam = await Exam.findById(id);
    let content = cardOfExam(exam);
    content = lineMessageTemplateContent(content.content, content.type);
    await lineBrordcast(content);
    res.status(200).json(exam);
  } catch (error) {
    next(error);
  }
};

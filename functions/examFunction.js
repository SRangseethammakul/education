const Exam = require("../models/exam");
const findExamById = async (id) => {
  //   const exams = await Exam.findById(id).populate({
  //     path: "questions",
  //     populate: {
  //       path: "choices",
  //       select: "name",
  //     },
  //   });
  const exams = await Exam.findById({ _id: id }).populate("questions", "name");
  return exams;
};

module.exports = {
  findExamById,
};

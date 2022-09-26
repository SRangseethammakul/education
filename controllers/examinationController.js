const Exam = require("../models/exam");
const Question = require("../models/question");
const Choice = require("../models/choice");
exports.index = async (req, res, next) => {
  try {
    const exams = await Exam.find()
      .populate({
        path: "questions",
        populate: {
          path: "choices",
          select: "name",
        },
      })
      .sort({ _id: 1 });
    console.log(exams);
    res.status(200).json(exams);
  } catch (error) {
    next(error);
  }
};

exports.insert = async (req, res, next) => {
  try {
    const { name } = req.body;
    const existExamName = await Exam.findOne({
      name,
    });
    if (existExamName) {
      const error = new Error("Exam Name repeat");
      error.statusCode = 400;
      throw error;
    }
    const newExam = new Exam({
      name,
    });
    await newExam.save();
    res.status(201).json({
      data: "Save success",
    });
  } catch (error) {
    next(error);
  }
};

exports.insertQuestion = async (req, res, next) => {
  try {
    const { name, title, subTitle, description, exam, choices, answer } =
      req.body;
    const existExamName = await Question.findOne({
      name,
      exam,
    });
    if (existExamName) {
      const error = new Error("Exam Name repeat");
      error.statusCode = 400;
      throw error;
    }
    const qustionCount = await Question.count({
      exam,
    });
    const newQuestion = new Question({
      name,
      title,
      subTitle,
      description,
      exam,
      answer,
      sortOrder: qustionCount + 1,
    });
    await newQuestion.save();
    for (const choice of choices) {
      const newChoice = new Choice({
        name: choice,
        title: choice,
        subTitle: choice,
        description: choice,
        question: newQuestion._id,
      });
      await newChoice.save();
    }
    res.status(201).json({
      data: newQuestion,
    });
  } catch (error) {
    next(error);
  }
};

exports.insertChoice = async (req, res, next) => {
  try {
    const { name, title, subTitle, description, question } = req.body;
    const existExamName = await Choice.findOne({
      name,
      question,
    });
    if (existExamName) {
      const error = new Error("Choice Name repeat");
      error.statusCode = 400;
      throw error;
    }
    const newChoice = new Choice({
      name,
      title,
      subTitle,
      description,
      question,
    });
    await newChoice.save();
    res.status(201).json({
      data: newChoice,
    });
  } catch (error) {
    next(error);
  }
};

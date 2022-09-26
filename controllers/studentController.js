const Student = require("../models/student");
exports.index = async (req, res, next) => {
  try {
    const exams = await Student.find()
      .populate({
        path: "questions",
        populate: {
          path: "choices",
          select: "name",
        },
      })
      .sort({ _id: 1 });
    res.status(200).json(exams);
  } catch (error) {
    next(error);
  }
};

exports.insert = async (req, res, next) => {
  try {
    const {
      name,
      lastName,
      studentId,
      studentClass,
      isUsed,
      lineUserId,
      lineProfile,
    } = req.body;
    const existExamName = await Student.findOne({
      lineUserId,
    });
    const newStudent = new Student({
      name,
      lastName,
      studentId,
      studentClass,
      isUsed,
      lineUserId,
      lineProfile,
    });
    await newStudent.save();
    res.status(200).json(newStudent);
  } catch (error) {
    next(error);
  }
};

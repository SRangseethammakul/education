const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new mongoose.Schema(
  {
    questions: [],
    exam: { type: Schema.Types.ObjectId, ref: "Exam" },
    student: { type: Schema.Types.ObjectId, ref: "Student" },
    choicesSelect: [
      {
        question_id: Schema.Types.ObjectId,
        choice_id: Schema.Types.ObjectId,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: "states",
  }
);
const State = mongoose.model("State", schema);

module.exports = State;

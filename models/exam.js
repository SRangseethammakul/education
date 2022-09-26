const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    isUsed: {
      type: Boolean,
      default: true,
    },
    isRepeat: {
      type: Boolean,
      default: false,
    },
    isSuffer: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: "exams",
  }
);
schema.virtual("questions", {
  ref: "Question",
  localField: "_id",
  foreignField: "exam",
});
const Exam = mongoose.model("Exam", schema);

module.exports = Exam;

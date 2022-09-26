const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    title: {
      type: String,
      require: true,
      trim: true,
    },
    subTitle: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isUsed: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
    },
    answer: {
      type: String,
      trim: true,
    },
    exam: { type: Schema.Types.ObjectId, ref: "Exam" },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: "questions",
  }
);
schema.virtual("choices", {
  ref: "Choice", //link ไปหา model menu
  localField: "_id", //_id ฟิลด์ของโมเดล Shop (ไฟล์นี้)
  foreignField: "question", // routePath คือ fk
});
const Question = mongoose.model("Question", schema);

module.exports = Question;

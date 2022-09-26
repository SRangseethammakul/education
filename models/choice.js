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
    isCorrect: {
      type: Boolean,
      default: false,
    },
    sortOrder: {
      type: Number,
    },
    question: { type: Schema.Types.ObjectId, ref: "Question" },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: "choices",
  }
);
const Choice = mongoose.model("Choice", schema);

module.exports = Choice;

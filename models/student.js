const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    lastName: {
      type: String,
      require: true,
      trim: true,
    },
    studentId: {
      type: String,
      require: true,
      trim: true,
    },
    studentClass: {
      type: String,
      require: true,
      trim: true,
    },
    isUsed: {
      type: Boolean,
      default: true,
    },
    lineUserId: {
      type: String,
    },
    lineProfile: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: "students",
  }
);
const Student = mongoose.model("Student", schema);

module.exports = Student;

const Exam = require("../models/exam");
const State = require("../models/state");
const Student = require("../models/student");
const Question = require("../models/question");

const {
  cardOfQuestion,
  GoToRegister,
  cardOfExam,
} = require("../utils/flexContent");
const {
  LinePush,
  LineReply,
  lineBrordcast,
} = require("../functions/lineFunction");
const { lineMessageTemplateContent } = require("../utils/lineTemplate");
const {
  LINE_TYPE_POSTBACK,
  LINE_TYPE_MESSAGE,
} = require("../config/lineTypeConfig");
const { UNIQUE_KEYWORD } = require("../config");

exports.sendMessage = async (req, res, next) => {
  try {
    const ff = lineMessageTemplateContent("test", 1);
    const rawMat = [
      {
        id: "1",
        title: "act",
        subTitle: "act-sub",
        description: "act-description",
        image: "",
        buttions: [
          {
            content: "A",
          },
          {
            content: "B",
          },
          {
            content: "C",
          },
          {
            content: "D",
          },
        ],
      },
      {
        id: "2",
        title: "act2",
        subTitle: "act-sub2",
        description: "act-description2",
        image: "",
        buttions: [
          {
            content: "A2",
          },
          {
            content: "B2",
          },
          {
            content: "C2",
          },
          {
            content: "D2",
          },
        ],
      },
    ];
    await LinePush("U5d1b3ce451aba491cffbcf29ed242f6e", ff);
    return res.status(200).json(stores);
  } catch (error) {
    next(error);
  }
};
exports.webhook = async (req, res, next) => {
  try {
    const events = req.body.events;
    for (const event of events) {
      const { type, postback, replyToken, message, source } = event;
      const student = await Student.findOne()
        .where("lineUserId")
        .eq(source.userId);
      if ("U8283ad5c2394c9a63296c94ee6230d56" === source.userId) {
        const { type: messageType, text } = message;
        if (messageType === "text" && text === "education") {
          const examOutbound = await Exam.findById("6331ffcacbd2f247e9b773f6");
          let contentOutbound = cardOfExam(examOutbound);
          contentOutbound = lineMessageTemplateContent(
            contentOutbound.content,
            contentOutbound.type
          );
          await lineBrordcast(contentOutbound);
        }
      }
      if (!student) {
        let contentRegister = GoToRegister;
        contentRegister = lineMessageTemplateContent(
          contentRegister.content,
          contentRegister.type
        );
        await LineReply(replyToken, contentRegister);
        return 1;
      }
      switch (type) {
        case LINE_TYPE_POSTBACK:
          let tempquestions = [];
          const [kind, examId, answer, questionAnswer] = postback.data.split(
            UNIQUE_KEYWORD.QUICK_TEST
          );
          let studentState = await State.findOne({
            exam: examId,
            student: student._id,
          }).lean();
          studentState = JSON.stringify(studentState);
          studentState = JSON.parse(studentState);
          const exams = await Exam.findById(examId).populate({
            path: "questions",
            populate: {
              path: "choices",
              select: "name",
            },
          });
          if (!studentState) {
            studentState = new State({
              questions: exams.questions,
              exam: exams._id,
              student: student._id,
              choicesSelect: [],
            });
            await studentState.save();
          } else {
            const tempArr = {
              question_id: questionAnswer,
              choice_id: answer,
            };
            studentState.choicesSelect.push(tempArr);
            const tempchoicesSelect = studentState.choicesSelect;
            let indexOfQuestions = studentState.questions;
            if (indexOfQuestions.indexOf(questionAnswer) !== -1) {
              for (const iterator of indexOfQuestions) {
                if (iterator !== questionAnswer) {
                  tempquestions.push(iterator);
                }
              }
              if (!tempquestions.length) {
                contentRegister = lineMessageTemplateContent(
                  "คุณทำข้อสอบเสร็จแล้ว",
                  1
                );
                await LineReply(replyToken, contentRegister);
                console.log("tempquestions 2", tempquestions);
                console.log("studentState ", studentState);
                res.status(200);
                return 1;
              }
            }
            await State.updateOne(
              { _id: studentState._id },
              {
                choicesSelect: tempchoicesSelect,
                questions: tempquestions,
              }
            );
          }
          const question = await Question.findById(
            tempquestions[0] || studentState.questions[0]
          ).populate("choices", "name");
          let contentQuestion = await cardOfQuestion(question);
          contentQuestion = lineMessageTemplateContent(
            contentQuestion.content,
            contentQuestion.type
          );
          await LineReply(replyToken, contentQuestion);
          break;
        case LINE_TYPE_MESSAGE:
          console.log(message);
          break;
        default:
          break;
      }
    }
    res.status(200);
  } catch (error) {
    next(error);
  }
};

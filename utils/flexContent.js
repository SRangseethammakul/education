const { LINE_TYPE_NUMBER } = require("../config/lineTypeConfig");
const { UNIQUE_KEYWORD } = require("../config");
const cardOfExam = (item) => {
  const listCard = {};
  const card = {};
  card.type = "bubble";
  card.body = {
    type: "box",
    layout: "vertical",
    contents: [
      {
        type: "image",
        url: "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip3.jpg",
        size: "full",
        aspectMode: "cover",
        aspectRatio: "1:1",
        gravity: "center",
      },
      {
        type: "box",
        layout: "vertical",
        contents: [],
        position: "absolute",
        background: {
          type: "linearGradient",
          angle: "0deg",
          endColor: "#00000000",
          startColor: "#00000099",
        },
        width: "100%",
        height: "40%",
        offsetBottom: "0px",
        offsetStart: "0px",
        offsetEnd: "0px",
      },
      {
        type: "box",
        layout: "horizontal",
        contents: [
          {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "text",
                    text: item.name,
                    size: "xl",
                    color: "#ffffff",
                  },
                ],
              },
              {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "button",
                    action: {
                      type: "postback",
                      label: "Quick Test",
                      displayText: "Quick Test",
                      data: `typeQuickTest${UNIQUE_KEYWORD.QUICK_TEST}${item._id}`,
                    },
                    style: "primary",
                  },
                ],
              },
            ],
            spacing: "xs",
          },
        ],
        position: "absolute",
        offsetBottom: "0px",
        offsetStart: "0px",
        offsetEnd: "0px",
        paddingAll: "20px",
      },
    ],
    paddingAll: "0px",
  };
  listCard.type = LINE_TYPE_NUMBER.LINE_TYPE_FLEX;
  listCard.content = card;
  return listCard;
};
const cardOfQuestion = async (question) => {
  console.log(question);
  const tempButton = [];
  const listCard = {};
  for (const iterator of question.choices) {
    const temp = {
      type: "button",
      style: "link",
      height: "sm",
      action: {
        type: "postback",
        label: iterator.name,
        displayText: iterator.name,
        data: `continue${UNIQUE_KEYWORD.QUICK_TEST}${question.exam}${UNIQUE_KEYWORD.QUICK_TEST}${iterator._id}${UNIQUE_KEYWORD.QUICK_TEST}${question._id}`,
      },
    };
    tempButton.push(temp);
  }
  tempButton.push({
    type: "box",
    layout: "vertical",
    contents: [],
    margin: "sm",
  });
  const cardOfQuestion = {};
  cardOfQuestion.type = "bubble";
  cardOfQuestion.hero = {
    type: "image",
    url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
    size: "full",
    aspectRatio: "20:13",
    aspectMode: "cover",
  };
  cardOfQuestion.body = {
    type: "box",
    layout: "vertical",
    contents: [
      {
        type: "text",
        text: question.name,
        weight: "bold",
        size: "xl",
      },
      {
        type: "text",
        text: question.title,
        contents: [],
        size: "lg",
      },
      {
        type: "text",
        text: question.subTitle,
      },
    ],
  };
  cardOfQuestion.footer = {
    type: "box",
    layout: "vertical",
    spacing: "sm",
    contents: tempButton,
  };
  listCard.content = cardOfQuestion;
  listCard.type = LINE_TYPE_NUMBER.LINE_TYPE_FLEX;
  return listCard;
};
let GoToRegister = {
  type: LINE_TYPE_NUMBER.LINE_TYPE_FLEX,
  content: {
    type: "bubble",
    hero: {
      type: "image",
      url: "https://eige.europa.eu/sites/default/files/styles/eige_original_optimised/public/images/education.jpg?itok=aK-f4RNS",
      size: "full",
      aspectRatio: "20:13",
      aspectMode: "cover",
    },
    body: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: "Education",
          weight: "bold",
          size: "xl",
        },
      ],
    },
    footer: {
      type: "box",
      layout: "vertical",
      spacing: "sm",
      contents: [
        {
          type: "button",
          style: "secondary",
          height: "sm",
          action: {
            type: "uri",
            label: "Register",
            uri: `https://liff.line.me/1657505544-XK1wGqPP`,
          },
          color: "#FDD919",
        },
        {
          type: "box",
          layout: "vertical",
          contents: [],
          margin: "sm",
        },
      ],
      flex: 0,
    },
  },
};
module.exports = {
  cardOfExam,
  cardOfQuestion,
  GoToRegister,
};

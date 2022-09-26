const { CUSTOMER_NAME } = require("../config");
const { LINE_TYPE_NUMBER } = require("../config/lineTypeConfig");
const lineMessageTemplateContent = (content, type) => {
  let message;
  switch (type) {
    case LINE_TYPE_NUMBER.LINE_TYPE_TEXT: // text
      message = {
        type: "text",
        text: content,
      };
      break;
    case LINE_TYPE_NUMBER.LINE_TYPE_FLEX:
      message = {
        type: "flex",
        altText: CUSTOMER_NAME,
        contents: content,
      };
      break;
    default:
      break;
  }
  return message;
};
module.exports = {
  lineMessageTemplateContent,
};

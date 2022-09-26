const axios = require("axios");
const config = require("../config/index");
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${config.LINE_TOKEN}`,
};
const LINE_MESSAGING_API = "https://api.line.me/v2/bot/message";
const LINE_PROFILE_API = "https://api.line.me/v2/bot/profile";
const LINE_USER_API = "https://api.line.me/v2/bot/user";
const LinePush = async (customerLineId, message) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(
          `${LINE_MESSAGING_API}/push`,
          {
            to: customerLineId,
            messages: Array.isArray(message) ? message : [message],
          },
          {
            headers: LINE_HEADER,
          }
        )
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error.response.data.message);
        });
    } catch (e) {
      reject(e);
    }
  });
};
const LineReply = async (replyToken, message) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${LINE_MESSAGING_API}/reply`,
        {
          replyToken: replyToken,
          messages: Array.isArray(message) ? message : [message],
        },
        {
          headers: LINE_HEADER,
        }
      )
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};
const lineBrordcast = async (message) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(
          `${LINE_MESSAGING_API}/broadcast`,
          {
            messages: Array.isArray(message) ? message : [message],
          },
          {
            headers: LINE_HEADER,
          }
        )
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error.response.data.message);
        });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  LinePush,
  LineReply,
  lineBrordcast,
};

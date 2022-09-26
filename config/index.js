require("dotenv").config();
module.exports = {
  PORT: process.env.PORT,
  LINE_TOKEN: process.env.LINE_TOKEN,
  CUSTOMER_NAME: process.env.CUSTOMER_NAME || "Act test",
  MONGODB_URI: process.env.MONGODB_URI,
  UNIQUE_KEYWORD: {
    QUICK_TEST: "<@@>",
  },
};

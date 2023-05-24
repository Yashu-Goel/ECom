const { connect } = require("mongoose");

const { config } = require("dotenv");
config();
const DB = process.env.DATABASE;
connect(DB)
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log("no connection : " + error);
  });

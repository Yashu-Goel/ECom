const { connect } = require("mongoose");

const { config } = require("dotenv");
config();
connect(process.env.DATABASE)
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log("no connection : " + error);
  });

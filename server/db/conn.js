import { connect } from "mongoose";
import { config } from "dotenv";

config();
connect(process.env.DATABASE)
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log("no connection: " + error);
  });

const express = require("express");
const auth = require("./router/auth.js");
const app = express();
app.use(auth);

app.get("/", (req, res) => {
  res.cookie('foo','bar')
  res.send("Hello World!");
});
const PORT = process.env.PORT;


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

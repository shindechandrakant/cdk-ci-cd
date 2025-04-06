const express = require("express");
const serverlessExpress = require("@vendia/serverless-express");

const app = express();
app.use(express.json());

app.get("/hello", (req, res) => {
  res.json({ message: "Hello from Express on Lambda!" });
});

app.post("/add", (req, res) => {
  const { num1, num2 } = req.body;
  res.json({ result: num1 + num2 });
});

exports.handler = serverlessExpress({ app });

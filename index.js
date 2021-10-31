const { application } = require("express");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/cources/:id", (req, res) => {
  res.send(`Hello!, ${req.params.id}!`);
});

app.get("/posts/:year/:month", (req, res) => {
  res.send(req.query);
});

app.listen(port, () => {
  console.log(`ポート番号${port}で立ち上がりました。`);
});
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const { username } = req.query;
  //   console.log(q);
  res.send(`Hello this Users ${username}`);
});

app.post("/users", (req, res) => {
  res.send("Hello this User post");
});

app.get("/users/:username/:email", (req, res) => {
  const { username, email } = req.params;

  res.send(`This detail User ${username}`);
});

app.get("*", (req, res) => {
  res.send("Not Found");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

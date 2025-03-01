import express from "express";
import mongoose from "mongoose";
import taskRoutes from "./routes/tasks.routes.js";

const app = express();
const port = 3000;

// app.get("/users", (req, res) => {
//   const { username } = req.query;
//   //   console.log(q);
//   res.send(`Hello this Users ${username}`);
// });

app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.get("*", (req, res) => {
  res.send("Not Found");
});

const CONNECTION_URL = "mongodb://127.0.0.1:27017/todo_db";

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}/`);
    })
  )
  .catch((err) => console.log(`${err} did not connect`));

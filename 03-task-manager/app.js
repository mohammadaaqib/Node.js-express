const express = require("express");
const app = express();

const connectDB = require("./db/connection");
const task = require("./router/taskRoute");
const notFound=require("./middleware/notFound");
const errorHandlerMiddleware=require("./middleware/error-handler")

require('dotenv').config()

//middleware
app.use(express.static('./public'))
app.use(express.json());

//route

// app.get("/hello", (req, res) => {
//   res.send("Task Manager is working");
// });

app.use("/api/v1/tasks", task);

app.use(notFound);

app.use(errorHandlerMiddleware);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log("server is listening"));
  } catch (error) {
    console.log(error);
  }
};
start();
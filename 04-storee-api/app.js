require("dotenv").config();
require('express-async-errors')
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const dbConnect = require("./db/connect");
const productRouter=require("./routes/products")

const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Store Api</h1> <a href='api/v1/products'>products route</a>");
});

app.use('/api/v1/products',productRouter)



app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    //connect db
    await dbConnect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server listen on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

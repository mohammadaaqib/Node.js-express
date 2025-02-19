require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

//connect to db
const connectDB=require('./db/connect');
const authentication=require('./middleware/authentication');

//routers
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');



// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

// routes
app.use('/api/v1/auth', authRouter);
//appling auth middle on all jobs routes
app.use('/api/v1/jobs', authentication,jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

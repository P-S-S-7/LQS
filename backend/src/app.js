import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());


app.use(express.json({ limit: "16kb" })); // body-parser (Middleware to parse JSON data)
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // body-parser (Middleware to parse URL-encoded data)
app.use(cookieParser()); // cookie-parser (Middleware to parse cookies)


// import routes
import userRouter from './routes/user.routes.js';
import courseRouter from './routes/course.routes.js';
import quizRouter from './routes/quiz.routes.js';
import locationRouter from './routes/location.routes.js';

// routes declaration
app.use('/api/v1/users', userRouter);

app.use('/api/v1/courses', courseRouter);

app.use('/api/v1/quizzes', quizRouter);

app.use('/api/v1/locations', locationRouter);

// custom made middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ message });
};

app.use(errorHandler);

export { app };

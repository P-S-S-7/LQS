import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors(
    {
        origin: process.env.CLIENT_URL ,
        credentials: true,
    }
));


app.use(express.json({ limit: "16kb" })); // body-parser (Middleware to parse JSON data)
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // body-parser (Middleware to parse URL-encoded data)
app.use(cookieParser()); // cookie-parser (Middleware to parse cookies)

// import routes
import userRouter from './routes/user.routes.js';

// routes declaration
app.use('/api/v1/users', userRouter);

export { app };

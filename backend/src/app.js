import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true,
    }
));

app.use(express.json({ limit: "16kb" })); // our app now accepts JSON data in the body of the request - body-parser is now included in express (Middleware function)

app.use(express.urlencoded({ extended: true, limit: "16kb" })); // our app now handles URL encoded data - body-parser is now included in express (Middleware function)

app.use(cookieParser()); // our app now uses cookie-parser to parse cookies in the request headers

export {app};
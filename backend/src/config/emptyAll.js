import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Faculty } from "../models/faculty.model.js";
import { Student } from "../models/student.model.js";
import { Course } from "../models/course.model.js";
import { Location } from "../models/location.model.js";
import { Quiz } from "../models/quiz.model.js";
import { DB_NAME } from '../constants.js';
import dotenv from 'dotenv';

dotenv.config({path: "../../.env"});

const emptyAll = async () => {
    const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    console.log(`\n Connected to MongoDB !! DB_HOST: ${connectionInstance.connection.host} \n`);

    await User.deleteMany();
    await Quiz.deleteMany();
    await Faculty.deleteMany();
    await Student.deleteMany();

    console.log('All collections emptied successfully');

    mongoose.connection.close();
}

emptyAll();




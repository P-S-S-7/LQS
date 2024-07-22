import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Course } from '../models/course.model.js';
import { DB_NAME } from '../constants.js';

dotenv.config({path: "../.env"});

const courses = [
    { name: 'Course1(18)', batch: 'Y-18' },
    { name: 'Course2(18)', batch: 'Y-18' },
    { name: 'Course3(18)', batch: 'Y-18' },

    { name: 'Course1(19)', batch: 'Y-19' },
    { name: 'Course2(19)', batch: 'Y-19' },
    { name: 'Course3(19)', batch: 'Y-19' },

    { name: 'Course1(20)', batch: 'Y-20' },
    { name: 'Course2(20)', batch: 'Y-20' },
    { name: 'Course3(20)', batch: 'Y-20' },

    { name: 'Course1(21)', batch: 'Y-21' },
    { name: 'Course2(21)', batch: 'Y-21' },
    { name: 'Course3(21)', batch: 'Y-21' },

    { name: 'Course1(22)', batch: 'Y-22' },
    { name: 'Course2(22)', batch: 'Y-22' },
    { name: 'Course3(22)', batch: 'Y-22' },

    { name: 'Course1(23)', batch: 'Y-23' },
    { name: 'Course2(23)', batch: 'Y-23' },
    { name: 'Course3(23)', batch: 'Y-23' },

    { name: 'Course1(24)', batch: 'Y-24' },
    { name: 'Course2(24)', batch: 'Y-24' },
    { name: 'Course3(24)', batch: 'Y-24' },
];

const inputCourses = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    console.log(`\n Connected to MongoDB !! DB_HOST: ${connectionInstance.connection.host} \n`);

    await Course.deleteMany();
    await Course.insertMany(courses);

    console.log('Courses added successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error adding courses:', error);
    process.exit(1);
  }
};

inputCourses();

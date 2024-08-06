import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Course } from '../models/course.model.js';
import { DB_NAME } from '../constants.js';

dotenv.config({path: "../../.env"});

const courses = [
    { name: 'Classical Physics (1)' },
    { name: 'Calculus and Ordinary Differential Equations (1)' },
    { name: 'Basic Electronics (1)' },
    { name: 'Basic Electronics Lab (1)' },
    { name: 'Programming for Problem Solving (1)' },
    { name: 'Technical Communication in English (1)' },
    { name: 'Indian Knowledge System (1)' },
    { name: 'Human Values and Ethics (2)' },
    { name: 'Environmental Science (2)' },
    { name: 'Linear Algebra and Complex Analysis (2)' },
    { name: 'Data Structures and Algorithms (2)' },
    { name: 'UG Physics Laboratory (2)' },
    { name: 'Introduction to Scripting Languages (2)' },
    { name: 'Semiconductor Devices and Circuits (2)' },
    { name: 'Analog Electronics (2)' },
    { name: 'Analog Electronics Lab (2)' },
    { name: 'Introduction to Mechanical Engineering (2)' },
    { name: 'Engineering Drawing and Graphics (2)' },
    { name: 'Workshop Practices (2)' },
    { name: 'Engineering Physical Metallurgy (2)' },
    { name: 'Digital Systems (2)' },
    { name: 'Discrete Mathematics (2)' },
    { name: 'Probability and Statistics (3)' },
    { name: 'Signals and Systems (3)' },
    { name: 'Signals and Systems Lab (3)' },
    { name: 'Digital Circuit and Systems (3)' },
    { name: 'Digital Circuit and Systems Lab (3)' },
    { name: 'Engineering Electromagnetics (3)' },
    { name: 'Microprocessor and Microcontroller (3)' },
    { name: 'Microprocessor and Microcontroller Lab (3)' },
    { name: 'Network Analysis and Synthesis (3)' },
    { name: 'Mechanics of Solids (3)' },
    { name: 'Rigid Body Dynamics (3)' },
    { name: 'Engineering Thermodynamics (3)' },
    { name: 'Welding and Casting (3)' },
    { name: 'Electrical Technology (3)' },
    { name: 'Computer Organization and Architecture (3)' },
    { name: 'Database Management Systems (3)' },
    { name: 'Object Oriented Programming (3)' },
    { name: 'Design and Analysis of Algorithms (3)' },
    { name: 'Constitutional Studies (4)' },
    { name: 'Analog and Digital Communication (4)' },
    { name: 'Analog and Digital Communication Lab (4)' },
    { name: 'Fundamentals of VLSI (4)' },
    { name: 'VLSI Lab (4)' },
    { name: 'Microwave Engineering (4)' },
    { name: 'Microwave Engineering Lab (4)' },
    { name: 'Design and Project Lab (4)' },
    { name: 'Introduction to AI and ML (4)' },
    { name: 'Design of Machine Elements (4)' },
    { name: 'Fluid Mechanics and Machinery (4)' },
    { name: 'Machining and Metal Forming (4)' },
    { name: 'Mechanisms and Machines (4)' },
    { name: 'Introduction to Computational Methods (4)' },
    { name: 'Industrial Measurements (4)' },
    { name: 'Principles of Management (4)' },
    { name: 'Web Programming (4)' },
    { name: 'Theory of Computation (4)' },
    { name: 'Operating Systems (4)' },
    { name: 'Computer Networks (4)' },
    { name: 'Data Science (4)' },
    { name: 'Summer Internship/Project (5)' },
    { name: 'Psychology, Technology & Society (5)' },
    { name: 'Wireless Communication (5)' },
    { name: 'Wireless Communication lab (5)' },
    { name: 'Control System Engineering (5)' },
    { name: 'Digital Signal Processing (5)' },
    { name: 'Digital Signal Processing Lab (5)' },
    { name: 'Heat Transfer (5)' },
    { name: 'Design of Transmission Elements (5)' },
    { name: 'Digital Manufacturing (5)' },
    { name: 'Robotics and Control (5)' },
    { name: 'Mechatronics & IoT (5)' },
    { name: 'Software Engineering (5)' },
    { name: 'Artificial Intelligence (5)' },
    { name: 'Computer System Security (5)' },
    { name: 'Software Development Lab (5)' },
    { name: 'B.Tech. Project (BTP) (6)' },
    { name: 'Introduction to Economics (6)' },
    { name: 'Seminar and Presentation Skills (6)' },
    { name: '5G Wireless Systems and beyond (6)' },
    { name: 'Computer Communication Networks (6)' },
    { name: 'IC Engines (6)' },
    { name: 'Finite Element Methods (6)' },
    { name: 'Industrial Engineering and Management (6)' },
    { name: 'Numerical Analysis and Scientific Computing (6)' },
    { name: 'B.Tech. Project (BTP) (7)' },
    { name: 'Industrial SLI (8)' },
    { name: 'Thesis (8)' },
    { name: 'Project (8)' },
    { name: 'Internship (8)' }
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

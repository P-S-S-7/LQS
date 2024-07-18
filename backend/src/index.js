import mongoose from "mongoose";
import connectDB from "./db/index.js";
import { Student } from "./models/student.model.js";
import { Faculty } from "./models/faculty.model.js";

connectDB();
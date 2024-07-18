import mongoose from 'mongoose';
import {User} from './user.model.js';
const facultySchema = new mongoose.Schema({
    department: {
        type: String,
        required: [true, "Department is required"],
    },
});

export const Faculty = User.discriminator('Faculty', facultySchema);
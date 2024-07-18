import mongoose from 'mongoose';
import {User} from './user.model.js';

const studentSchema = new mongoose.Schema({
    branch: {
        type: String,
        required: [true, "Branch is required"],
    },
});

export const Student = User.discriminator('Student', studentSchema);

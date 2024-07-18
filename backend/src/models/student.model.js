import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
    {
        branch: {
            type: String,
            required: [true, "Branch is required"],
        },
    }
);

export const Student = mongoose.model('Student', studentSchema);


import mongoose, { Schema } from "mongoose";

const StudentSchema = new Schema(
    {
        branch: {
            type: String,
            required: [true, "Branch is required"],
            enum: ["CSE", "CCE", "ECE", "MME"],
        },
    }
);

export const Student = mongoose.model('Student', StudentSchema);


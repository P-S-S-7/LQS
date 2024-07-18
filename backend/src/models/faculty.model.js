import mongoose, { Schema } from "mongoose";

const facultySchema = new Schema(
    {
        department: {
            type: String,
            required: [true, "Department is required"],
        },
    }
);

export const Faculty = mongoose.model('Faculty', facultySchema);

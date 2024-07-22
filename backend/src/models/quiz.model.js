import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
    batch: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
},
{
    timestamps: true,
}); 

export const Quiz = mongoose.model('Quiz', quizSchema);
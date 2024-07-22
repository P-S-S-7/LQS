import { Quiz } from '../models/quiz.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';   

const scheduleQuiz = asyncHandler(async (req, res) => {
  const { batch, course, startTime, endTime } = req.body;

  if (!batch || !course || !startTime || !endTime) {
    throw new ApiError(400, 'All fields are required');
  }

  if (new Date(startTime) >= new Date(endTime)) {
    throw new ApiError(400, 'End time must be after the start time');
  }

  const conflictingQuizzes = await Quiz.find({
    batch,
    $or: [
      { startTime: { $lte: new Date(endTime), $gte: new Date(startTime) } },
      { endTime: { $lte: new Date(endTime), $gte: new Date(startTime) } },
    ],
  });

  if (conflictingQuizzes.length > 0) {
    throw new ApiError(400, 'The selected time interval conflicts with another quiz');
  }

  const newQuiz = await Quiz.create({ batch, course, startTime, endTime });
  res.status(201).json(new ApiResponse(201, newQuiz));
});


const getQuizzesByBatch = asyncHandler(async (req, res) => {
  const { batch } = req.query;
  if (!batch) {
    throw new ApiError(400, 'Batch is required');
  }

  const quizzes = await Quiz.find({ batch });
  res.status(200).json(new ApiResponse(200, quizzes));
});

export { scheduleQuiz, getQuizzesByBatch };

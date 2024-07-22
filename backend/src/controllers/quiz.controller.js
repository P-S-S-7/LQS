import { Quiz } from '../models/quiz.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

// Schedule a quiz
const scheduleQuiz = asyncHandler(async (req, res) => {
  const { batch, course, startTime, endTime } = req.body;
  const scheduledBy = req.user._id;

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
    throw new ApiError(400, `The selected time interval conflicts with another quiz scheduled for ${batch} batch. Please check the quizzes scheduled for this batch and try again.`);
  }

  const newQuiz = await Quiz.create({ batch, course, startTime, endTime, scheduledBy });
  res.status(201).json(new ApiResponse(201, newQuiz));
});

// Get quizzes by batch
const getQuizzesByBatch = asyncHandler(async (req, res) => {
  const { batch } = req.query;
  if (!batch) {
    throw new ApiError(400, 'Batch is required');
  }

  const quizzes = await Quiz.find({ batch }).populate('scheduledBy', 'name email');
  res.status(200).json(new ApiResponse(200, quizzes));
});

// Get quizzes by user
const getQuizzesByUser = asyncHandler(async (req, res) => {
  const quizzes = await Quiz.find({ scheduledBy: req.user._id }).sort({ batch: 1 });
  res.status(200).json(new ApiResponse(200, quizzes));
});

export { scheduleQuiz, getQuizzesByBatch, getQuizzesByUser };

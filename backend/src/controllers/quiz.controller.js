import { Quiz } from '../models/quiz.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

// Schedule a quiz
const scheduleQuiz = asyncHandler(async (req, res, next) => {
  try {
    const { batch, course, startTime, endTime, location } = req.body;
    const scheduledBy = req.user._id;
  
    if (!batch || !course || !startTime || !endTime || !location) {
      throw new ApiError(400, 'All fields are required');
    }
  
    if (new Date(startTime) >= new Date(endTime)) {
      throw new ApiError(400, 'End time must be after the start time');
    }
  
    const conflictingQuizzes = await Quiz.find({
      batch,
      $or: [
        { startTime: { $lt: new Date(endTime), $gt: new Date(startTime) } },
        { endTime: { $lt: new Date(endTime), $gt: new Date(startTime) } },
      ],
    });
  
    if (conflictingQuizzes.length > 0) {
      throw new ApiError(400, `The selected time interval conflicts with another quiz scheduled for ${batch} batch. Please check the quizzes scheduled for this batch and try again.`);
    }

    const conflictingLocations = await Quiz.find({
      location,
      $or: [
        { startTime: { $lt: new Date(endTime), $gt: new Date(startTime) } },
        { endTime: { $lt: new Date(endTime), $gt: new Date(startTime) } },
      ],
    });

    if (conflictingLocations.length > 0) {
      throw new ApiError(400, `${location} is already booked for another quiz at the selected time. Please select a different location or time.`);
    }
  
    const newQuiz = await Quiz.create({ batch, course, location, startTime, endTime, scheduledBy });
    res.status(201).json(new ApiResponse(201, newQuiz));
  } catch (error) {
      next(error);
  }
});

// Get quizzes by batch
const getQuizzesByBatch = asyncHandler(async (req, res, next) => {
  try {
    const { batch } = req.query;
    if (!batch) {
      throw new ApiError(400, 'Batch is required');
    }
  
    const quizzes = await Quiz.find({ batch }).populate('scheduledBy', 'name email');
    res.status(200).json(new ApiResponse(200, quizzes));
  } catch (error) {
    next(error);
  }
});

// Get quizzes by user
const getQuizzesByUser = asyncHandler(async (req, res) => {
  const quizzes = await Quiz.find({ scheduledBy: req.user._id }).sort({ batch: 1, startTime: 1 });
  res.status(200).json(new ApiResponse(200, quizzes));
});

// Delete a quiz
const deleteQuiz = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
  
    const quiz = await Quiz.findById(id);
  
    if (!quiz) {
      throw new ApiError(404, 'Quiz not found');
    }
  
    if (quiz.scheduledBy.toString() !== req.user._id.toString()) {
      throw new ApiError(403, 'You are not authorized to delete this quiz');
    }
  
    await Quiz.findByIdAndDelete(id);
    res.status(200).json(new ApiResponse(200, 'Quiz deleted successfully'));
  } catch (error) {
    next(error);
  }
});

export { scheduleQuiz, getQuizzesByBatch, getQuizzesByUser, deleteQuiz };

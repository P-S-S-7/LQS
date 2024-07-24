import { Course } from '../models/course.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';

const getCoursesByBatch = asyncHandler(async (req, res) => {
  try {
    const { batch } = req.query;
    if (!batch) {
      throw new ApiError(400, 'Batch is required');
    }
  
    const courses = await Course.find({ batch });
    const courseNames = courses.map(course => ({
      name: course.name,
      id: course._id,
    }));
  
    console.log('Courses:', courses);
  
    res.status(200).json(new ApiResponse(200, courseNames, 'Success'));
  } catch (error) {
    next(error);
  }
});

export { getCoursesByBatch };

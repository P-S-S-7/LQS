import { Course } from '../models/course.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

// get all courses
const getCourses = asyncHandler(async (req, res) => {
  try {
    const courses = await Course.find({});
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

export { getCourses };

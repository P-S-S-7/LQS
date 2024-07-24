import { Location } from '../models/location.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

// get all locations
const getLocations = asyncHandler(async (req, res, next) => {
  try {
    const locations = await Location.find();
  
    const locationNames = locations.map(location => ({
      name: location.name,
      id: location._id,
    }));
  
    res.status(200).json(new ApiResponse(200, locationNames, 'Success'));
  } catch (error) {
    next(error);
  }
});

export { getLocations };
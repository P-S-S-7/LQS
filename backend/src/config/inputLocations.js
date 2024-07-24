import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Location } from '../models/location.model.js';
import { DB_NAME } from '../constants.js';

dotenv.config({path: "../../.env"});

const locations = [
    { name: 'CP1' },
    { name: 'CP2' },
    { name: 'CP3' },
    { name: 'CMLBDA' },
    { name: 'ECAD' },
    { name: 'LT-1' },
    { name: 'LT-2' },
    { name: 'LT-3' },
    { name: 'LT-4' },
    { name: 'LT-5' },
    { name: 'LT-6' },
    { name: 'LT-7' },
    { name: 'LT-8' },
    { name: 'LT-9' },
    { name: 'LT-10' },
    { name: 'LT-11' },
    { name: 'LT-12' },
    { name: 'LT-13' },
    { name: 'LT-14' },
    { name: 'LT-15' },
    { name: 'LT-16' },
    { name: 'LT-17' },
    { name: 'LT-18' },
    { name: 'LT-19' },
];

const inputLocations = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    console.log(`\n Connected to MongoDB !! DB_HOST: ${connectionInstance.connection.host} \n`);

    await Location.deleteMany();
    await Location.insertMany(locations);

    console.log('Locations added successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error adding locations:', error);
    process.exit(1);
  }
};

inputLocations();

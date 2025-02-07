import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();//  loading env variables

const connection = async (): Promise<void> => {
  try {
    const dbName: string = 'RestApiDemo'; // Your database name
    const dbUrl: string =
      process.env.MONGODB_AUTH_URL || `mongodb://localhost:27017/${dbName}`;

    await mongoose.connect(dbUrl, {
      dbName,
    } as mongoose.ConnectOptions);

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connection;

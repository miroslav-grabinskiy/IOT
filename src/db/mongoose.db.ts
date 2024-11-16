import mongoose from 'mongoose';

export async function stop() {
  await mongoose.connection.close();
}
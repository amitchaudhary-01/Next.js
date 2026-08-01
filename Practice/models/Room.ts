import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IRoom extends Document {
  title: string;
  description: string;
  location: string;
  pricePerNight: number;
  image: string;
  createdAt: Date;
}

const RoomSchema = new Schema<IRoom>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Room = models.Room || model<IRoom>("Room", RoomSchema);
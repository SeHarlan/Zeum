import { Schema } from "mongoose";

export type DeviceType = {
  name: string;
  created_at: Date;
  frequency: number;
  album: Schema.Types.ObjectId;
  owner: Schema.Types.ObjectId;
};
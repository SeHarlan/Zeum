import { DeviceType } from "@/types/device";
import mongoose, { Document, Model, Schema } from "mongoose";

interface IDevice extends Document, DeviceType {}

const DeviceSchema: Schema = new Schema({
  name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  frequency: { type: Number, required: true },
  album: { type: Schema.Types.ObjectId, ref: "Album", required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Device: Model<IDevice> =
  mongoose.models.Device || mongoose.model<IDevice>("Device", DeviceSchema);

export default Device;

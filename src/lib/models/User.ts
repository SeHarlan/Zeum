import { UserType} from "@/types/user";
import mongoose, { Document, Model, Schema } from "mongoose";


export interface IUser extends Document, Omit<UserType, "_id"> {}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    description: { type: String },
    email: { type: String, unique: false, sparse: true },
    created_at: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true }, // Include virtuals in JSON output
    toObject: { virtuals: true }, // Include virtuals in object output
  }
);

UserSchema.virtual('albums', {
  ref: 'Album',
  localField: '_id',
  foreignField: 'owner',
});

UserSchema.virtual('devices', {
  ref: 'Device',
  localField: '_id',
  foreignField: 'owner',
});

UserSchema.virtual('wallets', {
  ref: 'Wallet',
  localField: '_id',
  foreignField: 'owner',
});

export type UserVirtuals = "albums" | "devices" | "wallets";

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
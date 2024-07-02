import { AlbumType } from "@/types/album";
import mongoose, { Document, Model, Schema } from "mongoose";

interface IAlbum extends Document, Omit<AlbumType, "_id"> {}

const AlbumSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    assetAddresses: { type: [String], required: true },
    created_at: { type: Date, default: Date.now },
    thumbnail: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    toJSON: { virtuals: true }, // Include virtuals in JSON output
    toObject: { virtuals: true }, // Include virtuals in object output
  }
);

// Define a virtual property 'items' that populates with the related 'Asset' documents
AlbumSchema.virtual("assets", {
  ref: "Asset", // The model to use
  localField: "assetAddresses", // Find assets where 'localField'
  foreignField: "address", // is equal to 'foreignField'
  justOne: false, // Since assetAddresses is an array, justOne should be false
});

const Album: Model<IAlbum> =
  mongoose.models.Album || mongoose.model<IAlbum>("Album", AlbumSchema);

export default Album;

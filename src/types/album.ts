import { Schema } from "mongoose";
import { AssetType } from "./assets";

export type AlbumType = {
  _id: string;
  name: string;
  assetAddresses: string[];
  assets?: AssetType[];
  created_at: Date;
  owner: Schema.Types.ObjectId;
  thumbnail?: string;
};
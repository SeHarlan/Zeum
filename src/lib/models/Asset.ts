import { AssetType } from "@/types/assets";
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAsset extends Document, AssetType {}

// Enums based on the provided TypeScript enums
const ChainIdsEnum = ["solana", "ethereum", "ordinal", "tezos"];
const SolanaTokenTypesEnum = ["Collection", "MasterEdition", "Compressed", "Edition", "Single"];
const AssetCategoryEnum = ["image", "video", "html", "vr", "audio"];

// Sub-schemas definitions
const SolanaCreatorSchema = new Schema({
  address: { type: String, required: true },
  share: { type: Number, required: true },
  verified: { type: Boolean, required: true },
});

const CollectionInfoSchema = new Schema({
  name: { type: String },
  symbol: { type: String },
  image: { type: String },
  description: { type: String },
  external_url: { type: String },
  verified: { type: Boolean },
});

const AttributeSchema = new Schema({
  value: { type: String, required: true },
  traitType: { type: String, required: true },
});

const MediaSchema = new Schema({
  aspectRatio: { type: Number },
  imageUrl: { type: String, required: true },
  imageCdnUrl: { type: String },
  videoUrl: { type: String },
  htmlUrl: { type: String },
  vrUrl: { type: String },
});

// Main Asset schema
const AssetSchema = new Schema({
  blockchain: { type: String, enum: ChainIdsEnum, required: true },
  address: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  creators: { type: [SolanaCreatorSchema], required: true },
  tokenType: { type: String, enum: SolanaTokenTypesEnum, required: true },
  collectionInfo: { type: CollectionInfoSchema },
  ownerAddress: { type: String, required: true },
  attributes: { type: [AttributeSchema] },
  category: { type: String, enum: AssetCategoryEnum, required: true },
  media: { type: MediaSchema, required: true },
});

const Asset: Model<IAsset> =
  mongoose.models.Asset || mongoose.model<IAsset>("Asset", AssetSchema);

export default Asset;

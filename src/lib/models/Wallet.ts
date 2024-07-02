import { WalletType } from "@/types/wallet";
import mongoose, { Schema, Document, Model } from "mongoose";



export interface IWallet extends Document, WalletType { }

const WalletSchema: Schema = new Schema({
  address: { type: String, unique: true, required: true },
  owner: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  type: { type: String, required: true },
});

const Wallet: Model<IWallet> = mongoose.models.Wallet || mongoose.model<IWallet>("Wallet", WalletSchema);

export default Wallet;

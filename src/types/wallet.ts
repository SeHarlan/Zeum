import { Schema } from "mongoose";

export enum ChainIdsEnum {
  SOLANA = "solana",
  ETHEREUM = "ethereum",
  ORDINAL = "ordinal",
  TEZOS = "tezos",
}

export type WalletType = {
  address: string;
  owner: Schema.Types.ObjectId;
  type: ChainIdsEnum;
};

export type CreateWalletData = Omit<WalletType, "owner">;
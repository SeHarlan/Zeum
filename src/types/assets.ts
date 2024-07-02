import { ChainIdsEnum } from "./wallet";

export interface AssetType {
  blockchain: ChainIdsEnum
  /** The main identifier of the asset */
  address: string;
  name: string;
  description: string;
  creators: SolanaCreator[];
  tokenType: SolanaTokenTypes;
  collectionInfo?: CollectionInfo;
  ownerAddress: string;
  attributes?: Attribute[];
  category: AssetCategory;
  media: {
    aspectRatio?: number;
    imageUrl: string;
    imageCdnUrl?: string;
    videoUrl?: string;
    htmlUrl?: string;
    vrUrl?: string;
  }
}

export enum SolanaTokenTypes { 
  Collection = "Collection",
  MasterEdition = "MasterEdition",
  Compressed = "Compressed",
  Edition = "Edition",
  Single = "Single",
}

export interface SolanaCreator {
  address: string;
  share: number;
  verified: boolean;
}

export interface CollectionInfo {
  name?: string;
  symbol?: string;
  image?: string;
  description?: string;
  external_url?: string;
  verified?: boolean;
};

export interface Attribute {
  value: string;
  traitType: string;
}

export enum AssetCategory {
  Image = "image",
  Video = "video",
  Html = "html",
  Vr = "vr",
  Audio = "audio",
}
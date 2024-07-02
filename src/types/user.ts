import { AlbumType } from "./album";
import { DeviceType } from "./device";
import { WalletType } from "./wallet";

export type BaseUserType = {
  _id: string;
  username: string;
  created_at: Date;
  email?: string;
  description?: string;
}

export type UserType = BaseUserType & {
  albums?: AlbumType[];
  devices?: DeviceType[];
  wallets?: WalletType[];
}

export type CreateUserData = {
  username: string;
  email?: string;
}

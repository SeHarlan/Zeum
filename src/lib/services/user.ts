import { CreateUserData } from "@/types/user";
import User, { IUser } from "../models/User";
import { handleServerError } from "@/utils/handleError";
import { CreateWalletData } from "@/types/wallet";
import Wallet from "../models/Wallet";

import mongoose from "mongoose";

export type FindOrCreateProps = {
  wallet: CreateWalletData
  createData: CreateUserData,
}

export async function findOrCreateUser({ wallet, createData }: FindOrCreateProps): Promise<IUser | null> {
  const session = await mongoose.startSession();

  try {
    const walletModel = await Wallet.findOne({ address: wallet.address });

    if (walletModel) {
      const user = await User.findById(walletModel?.owner).select("_id").exec();
      return user;
    } else {
      // If wallet does not exist, create a new user and wallet within a transaction
      session.startTransaction();
      try {
        const user = new User(createData);
        await user.save({ session });

        await Wallet.create([{
          owner: user._id,
          address: wallet.address,
          type: wallet.type,
        }], { session });

        await session.commitTransaction();
        return user;
      } catch (error) {
        await session.abortTransaction();
        throw error;
      }
    }
  } catch (error: any) {
    handleServerError({ error, location: "findOrCreateUser" });
    throw new Error("Error in findOrCreate: " + error.message);
  } finally {
    session.endSession();
  }
}

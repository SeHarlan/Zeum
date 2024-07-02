import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/db/mongodb";
import { getSession } from "next-auth/react";
import User from "@/lib/models/User";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "../auth/[...nextauth]";
import { handleServerError } from "@/utils/handleError";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  const session = await getServerSession(req, res, getAuthOptions(req));

  if (!session?.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await User.findById(session.user.id)
      .populate([
        { path: "wallets", model: "Wallet" },
      ])
      .exec();
  
  
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
  
    res.status(200).json(user);
  } catch (error) { 
    handleServerError({ error, location: "getUser" });
    res.status(500).json({ error: "Error fetching user" });
  }
}

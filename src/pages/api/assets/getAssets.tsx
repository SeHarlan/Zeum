import { parseSolanaAssets } from "@/lib/services/helpers/parseSolanaAssets";
import { getAllSolanaAssets } from "@/lib/services/solanaAssets";
import { handleServerError } from "@/utils/handleError";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const solanaPublicKeys = req.body.solanaPublicKeys;

  if (!solanaPublicKeys?.length) { 
    return res.status(200).json([]);
  }

  try {
    const rawAssets = await getAllSolanaAssets(solanaPublicKeys);
    const parsedAssets = parseSolanaAssets(rawAssets);

    res.status(200).json(parsedAssets);
  
  } catch (error) { 
    handleServerError({ error, location: "getAssets" });
    res.status(500).json({ error: "Error fetching assets" });
  }
}

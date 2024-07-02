import { UserType } from "@/types/user";
import { SignInMessage } from "@/utils/auth";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import base58 from "bs58";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";

interface UseAuthProps {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
}

const useAuth = ({user, setUser } : UseAuthProps ) => {
  const { status, data: session } = useSession();
  const wallet = useWallet();

  const handleSignIn = useCallback(async () => {
    try {
      const csrf = await getCsrfToken();
      if (!wallet.publicKey || !csrf || !wallet.signMessage) return;

      const message = new SignInMessage({
        domain: window.location.host,
        publicKey: wallet.publicKey?.toBase58(),
        statement: `Sign this message to sign in to ZEUM -- `,
        nonce: csrf,
      });

      const data = new TextEncoder().encode(message.prepare());
      const signature = await wallet.signMessage(data);
      const serializedSignature = base58.encode(signature);

      signIn("credentials", {
        message: JSON.stringify(message),
        redirect: false,
        signature: serializedSignature,
      });
    } catch (error) {
      console.log(error);
    }
  }, [wallet]);

  useEffect(() => {
    if (wallet.connected && status === "unauthenticated") {
      handleSignIn();
    }
  }, [wallet.connected, status, handleSignIn]);
  
  useEffect(() => {
    if (status === "authenticated" && !session?.user) {
      wallet.disconnect();
      signOut();
    }
  }, [status, session, wallet]);


  useEffect(() => {
    if (status === "authenticated" && session && !user) {
       axios
         .get("/api/user/getUser")
         .then((response) => setUser(response.data))
         .catch((error) => {
           wallet.disconnect();
           signOut();
           console.error("Error fetching user data:", error)
         });
    }
      
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session]);
}

export default useAuth;
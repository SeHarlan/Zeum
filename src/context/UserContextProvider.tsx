"use client";

import { signOut, useSession } from "next-auth/react";
import useAuth from "@/hooks/useAuth";
import { UserType } from "@/types/user";
import { useContext, useState, createContext, Dispatch, SetStateAction, useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Parent } from "@/types/utils";

type UserContextType = {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
  logInUser: () => void;
  logOutUser: () => Promise<void>;
  userLoading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => { },
  logInUser: () => { },
  logOutUser: async () => { },
  userLoading: false
});

export const useUser = () => useContext(UserContext);


const UserContextProvider = ({children}: Parent) => {
  const { disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  
  const { status } = useSession();

  const [user, setUser] = useState<UserType | null>(null);
  useAuth({ user, setUser });


  const userLoading =
    status === "loading" || (status === "authenticated" && !user);


  

  const logOutUser = async () => {
    await disconnect();
    signOut();
    setUser(null);
  };
  const logInUser = () => {
    setVisible(true);
  };

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      logOutUser,
      logInUser,
      userLoading
    }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

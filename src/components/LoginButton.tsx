"use client";

import { useUser } from "@/context/UserContextProvider";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "./basic/Button";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
  navigateOnLoggedIn?: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ navigateOnLoggedIn }) => {
  
  const { user, logOutUser, logInUser, userLoading } = useUser();
  const [clicked, setClicked] = useState(false); //only trigger useEffect if user has clicked the button
  const router = useRouter();

  const loggedIn = !!user;    

  const handleClick = async () => {
    if (!loggedIn) {
      logInUser();
      setClicked(true);
    } else {
      await logOutUser();
    }
  };

  useEffect(() => {
    if (loggedIn && navigateOnLoggedIn && clicked) {
      router.push(navigateOnLoggedIn);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn, clicked]);

  //TODO blobby edges
  return (
    <Button
      title={loggedIn ? "Exit" : "Enter"}
      onClick={handleClick}
      loading={userLoading}
      disabled={userLoading}
    />
  );
};

export default LoginButton;
"use client"

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useUser } from "@/context/UserContextProvider";
import { useEffect } from "react";

const withAuth = <P extends Record<string, unknown>>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const Auth: React.FC<P> = (props) => {
    const router = useRouter();
    const { user } = useUser();
    const { status, data: session } = useSession();

    useEffect(() => {
      if (status === "loading") return; // Do nothing while loading
      if (!session) {
        router.push("/"); // Redirect to login if not authenticated
      }
    }, [status, router, session]);
    

    if (!user) return null;
    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;

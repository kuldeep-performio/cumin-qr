
"use client"

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useUser } from "./useUser";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    let timer = setTimeout(() => {
        if (user == false) return "Loading..."
        if (!user) {
            router.push("/");
          }
    }, 500)
    return () => clearTimeout(timer)
  }, [router, user]);

  return <div>{user ? children : null}</div>;
};

export default ProtectedRoute;

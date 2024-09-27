import { auth } from "@/config/firebase";
import { onAuthStateChanged,User as FirebaseUser,  } from "firebase/auth";
import { useEffect, useState } from "react";


export function useUser() {
    const [user, setUser] = useState<FirebaseUser | null | false>(false);
  
    useEffect(() => {
      return onAuthStateChanged(auth, (user) => setUser(user));
    }, []);
  
    return user;
  }
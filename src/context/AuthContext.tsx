import React, { createContext, useContext, useEffect, useState } from "react";
import {
    browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {  auth } from "@/config/firebase";

const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
//   const [loading, setLoading] = useState<Boolean>(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         localStorage.setItem(
//           "user",
//           JSON.stringify({
//             uid: user.uid,
//           })
//         );
//       } else {
//         localStorage.setItem(
//           "user",
//           JSON.stringify({
//             uid: "",
//           })
//         );
//       }
//     });

//     setLoading(false);

//     return () => unsubscribe();
//   }, []);

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logoutUser = () => {
    return signOut(auth)
  }

//   const logIn = (email: string, password: string) => {
//     return signInWithEmailAndPassword(auth, email, password);
//   };

  async function logIn(email: string, password: string, rememberMe: boolean = false) {
    await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logOut = async () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        uid: "",
      })
    );
    return await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        logIn,
        logOut,
        logoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

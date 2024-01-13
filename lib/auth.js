"use client";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useContext, createContext, useState, useEffect } from "react";
import { firebaseAuth } from "./firebase";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { extractUserInfo } from "./utils";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useAuthProvider();

  // if (auth.loading) {
  //   return <div>Loading...</div>;
  // }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

const useAuthProvider = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(firebaseAuth, handleUser);

    return () => unsuscribe();
  }, []);

  const handleUser = (rawUserData) => {
    if (rawUserData) {
      const user = extractUserInfo(rawUserData);
      // TODO: create user in firestore db
      // createUser(user)

      setUser(user);
      Cookies.set("zen-notes-auth", true, {
        expires: 1,
      });
      setLoading(false);
    } else {
      setUser(null);
      Cookies.remove("zen-notes-auth");
      setLoading(false);
    }
  };

  const signInWithGoogle = () => {
    signInWithPopup(firebaseAuth, new GoogleAuthProvider())
      .then((result) => {
        handleUser(result.user);
      })
      .then(() => {
        router.push("/dashboard");
      });
  };

  const signout = () => {
    signOut(firebaseAuth).then(() => {
      setLoading(true);
      handleUser(false);
      router.push("/login");
    });
  };

  return { user, loading, signInWithGoogle, signout };
};

export const useAuth = () => useContext(AuthContext);

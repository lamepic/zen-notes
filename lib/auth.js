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
import { createUser } from "./services";

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
  const [authLoading, setAuthLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(firebaseAuth, handleUser);
    return () => unsuscribe();
  }, []);

  const handleUser = async (rawUserData) => {
    if (rawUserData) {
      const user = extractUserInfo(rawUserData);
      await createUser(user);

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
    setAuthLoading(true);
    signInWithPopup(firebaseAuth, new GoogleAuthProvider())
      .then(async (result) => {
        await handleUser(result.user);
        router.replace("/dashboard");
      })
      .then(() => {
        setAuthLoading(false);
      });
  };

  const signout = () => {
    signOut(firebaseAuth).then(async () => {
      setLoading(true);
      await handleUser(false);
      router.replace("/login");
    });
  };

  return { user, loading, signInWithGoogle, signout, authLoading };
};

export const useAuth = () => useContext(AuthContext);

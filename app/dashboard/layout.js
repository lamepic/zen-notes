"use client";
import { useAuth } from "@/lib/auth";
import React from "react";
import { NotesProvider } from "@/lib/NotesProvider";

function Layout({ children }) {
  const { loading, user } = useAuth();

  return (
    <div className="h-screen lg:place-center">
      {loading && !user ? (
        <p className="text-2xl">Loading...</p>
      ) : (
        <NotesProvider>{children}</NotesProvider>
      )}
    </div>
  );
}

export default Layout;

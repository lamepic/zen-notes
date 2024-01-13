"use client";
import { useAuth } from "@/lib/auth";
import React from "react";

function Layout({ children }) {
  const { loading, user } = useAuth();

  return (
    <div className="h-screen lg:place-center">
      {loading && !user ? <p className="text-2xl">Loading...</p> : children}
    </div>
  );
}

export default Layout;

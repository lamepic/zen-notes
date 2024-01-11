import Navbar from "@/components/Navbar";
import React from "react";

function Layout({ children }) {
  return (
    <div className="h-screen">
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;

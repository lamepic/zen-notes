import React from "react";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import { Button } from "./ui/button";

function Navbar() {
  return (
    <nav className="flex justify-between p-5 lg:px-8 items-center">
      <Logo />
      <div className="flex items-center gap-2">
        <Button variant="outline" className="font-semibold">
          Sign in
        </Button>
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;

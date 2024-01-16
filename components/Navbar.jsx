import React from "react";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import { Button } from "./ui/button";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="flex justify-between p-5 lg:px-8 items-center">
      <Logo link={true} />
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="font-semibold dark:border-gray-500/40"
        >
          <Link href="/login">Sign in</Link>
        </Button>
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;

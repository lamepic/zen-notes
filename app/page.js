import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen">
      <Navbar />
      <div className="max-w-xl h-3/5 flex flex-col items-center justify-center space-y-3 mx-auto">
        <h1 className="capitalize text-center text-5xl lg:text-6xl font-semibold lg:tracking-wider">
          A minimal note taking app
        </h1>
        <p className="text-xl lg:text-2xl">Take note minus the distractions</p>
        <Button className="p-7 w-44 text-lg">
          <Link href="/login">Get Started</Link>
        </Button>
      </div>
    </main>
  );
}

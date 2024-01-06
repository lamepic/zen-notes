import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Quicksand } from "next/font/google";

const quickSand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

export default function Home() {
  return (
    <main className={cn("h-screen", quickSand.className)}>
      <Navbar />
      <div className="max-w-xl h-3/5 flex flex-col items-center justify-center space-y-3 mx-auto">
        <h1 className="capitalize text-center text-5xl lg:text-6xl font-semibold lg:tracking-wider">
          A minimal note taking app
        </h1>
        <p className="text-xl lg:text-2xl">Take note minus the distractions</p>
        <Button className="p-7 w-44 text-lg">Get Started</Button>
      </div>
    </main>
  );
}

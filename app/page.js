import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen flex flex-col justify-between">
      <Navbar />
      <div className="max-w-xl flex flex-col items-center space-y-5 mx-auto mb-28">
        <h1 className="capitalize text-center text-5xl lg:text-6xl font-semibold lg:tracking-wider">
          A minimal note taking app
        </h1>
        <p className="text-xl lg:text-2xl">Take note minus the distractions</p>
        <Link href="/login">
          <Button className="p-7 w-44 text-lg">Get Started</Button>
        </Link>
      </div>
      <Footer />
    </main>
  );
}

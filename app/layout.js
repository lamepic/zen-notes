import { Quicksand } from "next/font/google";
import "./globals.css";
import "draft-js/dist/Draft.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

const quickSand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata = {
  title: "Zen Notes",
  description: "Minimal Note Taking App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta charSet="utf-8" />
      <body className={cn("overflow-hidden", quickSand.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

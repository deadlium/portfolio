import "./globals.css";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata = {
  title: "Uddesh Jaiswal | Blockchain Developer",
  description:
    "Full Stack Developer and Blockchain developer specializing in Web3 infrastructure, Cosmos SDK, and scalable distributed systems.",
  keywords: [
    "Full Stack Developer",
    "Blockchain Developer",
    "Cosmos SDK",
    "Web3",
    "Distributed Systems",
    "Solana",
    "Backend Developer",
  ],
  authors: [{ name: "Uddesh Jaiswal" }],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${manrope.className}`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
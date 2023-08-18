import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

import { Inter } from "next/font/google";

import "../globals.css";

export const metadata: Metadata = {
  title: "Threads",
  description: "A Next.js 13 Meta Threads App",
};

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          <div className="w-full flex justify-center items-center min-h-screen">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;

import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

import { Inter } from "next/font/google";

import { Toaster } from "react-hot-toast";

import "@/app/globals.css";

import Topbar from "@/app/components/shared/Topbar";
import LeftSidebar from "@/app/components/shared/LeftSidebar";
import RightSidebar from "@/app/components/shared/RightSidebar";
import Bottombar from "@/app/components/shared/Bottombar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads",
  description: "A Next.js 13 Meta Threads App",
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Topbar />
          <main className="flex flex-row">
            <LeftSidebar />
            <section className="main-container">
              <div className="w-full max-w-4xl">
                {children}
              </div>
            </section>
            <RightSidebar />
          </main>
          <Toaster
            toastOptions={{
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
            }}
          />
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;

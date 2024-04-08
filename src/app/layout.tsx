import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// auth0
import { UserProvider } from "@auth0/nextjs-auth0/client";
import StoreProvider from "@/redux/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaleTube - Kids favorite video streaming platform",
  description: "TaleTube is video streaming  platform for kids.",
  // authors: [
  //   { name: "JuriKalita", url: "https://localhost:3000" },
  //   { name: "Nishal", url: "https://localhost:3000" },
  // ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <StoreProvider>{children}</StoreProvider>
        </body>
      </UserProvider>
    </html>
  );
}

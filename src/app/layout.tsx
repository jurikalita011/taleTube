import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// auth0
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaleTube - Kids favorite video sharing platform",
  description: "TaleTube is video sharing  platform for kids.",
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
        <body className={inter.className}>{children}</body>
      </UserProvider>
    </html>
  );
}

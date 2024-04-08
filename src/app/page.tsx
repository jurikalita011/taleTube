"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

export default function Home() {
  const { user, isLoading, error } = useUser();

  console.log(user);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {typeof user === "undefined" ? (
        <div>
          <a href="/api/auth/login">Login</a>
        </div>
      ) : (
        <div>
          <Link href="/dashboard">Dashboard</Link>
          <a href="/api/auth/logout">Logout</a>
        </div>
      )}
    </main>
  );
}

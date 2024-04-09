import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <ProtectedRoute roleLevel="admin">
      <div>
        This one is second page to check whether it sends network requests or
        not
      </div>
      <Link href="/dashboard">Dashboard Route</Link>
    </ProtectedRoute>
  );
}

export default page;

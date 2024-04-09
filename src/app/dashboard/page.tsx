import ProtectedRoute from "@/components/ProtectedRoute";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import React, { ReactNode } from "react";

async function page() {
  const CustomNotAllowedPage = (): ReactNode => {
    return <div>Not allowed</div>;
  };

  return (
    <ProtectedRoute
      roleLevel="admin"
      renderCustomComponent={<CustomNotAllowedPage />}>
      <div>
        I am the dashboard, if you are able to access this page that means
        either authorization is given or may be app is broken.
      </div>
      <Link href="/testroute">Test Route</Link>
    </ProtectedRoute>
  );
}

export default withPageAuthRequired(page, {
  returnTo: "/dashboard",
});

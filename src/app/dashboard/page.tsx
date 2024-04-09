import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import React from "react";

async function page() {
  return (
    <ProtectedRoute roleLevel="adfa">
      <div>
        I am the dashboard, if you are able to access this page that means
        either authorization is given or may be app is broken.
      </div>
    </ProtectedRoute>
  );
}

export default withPageAuthRequired(page, {
  returnTo: "/dashboard",
});

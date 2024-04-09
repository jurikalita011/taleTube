import { withPageAuthRequired } from "@auth0/nextjs-auth0/edge";
import React from "react";

async function page() {
  return <div>Protected Admin Route</div>;
}

export default withPageAuthRequired(page, { returnTo: "/add-story" });

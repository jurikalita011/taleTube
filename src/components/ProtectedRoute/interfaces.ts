import { UserProfile } from "@auth0/nextjs-auth0/client";
import { ReactNode } from "react";

export interface ProtectedRouteProps {
  children: React.ReactNode;
  roleLevel: string;
  renderCustomComponent?: ReactNode;
}

export interface UserProfileInterface extends UserProfile {
  "taletube_other/roles": Array<string>;
}

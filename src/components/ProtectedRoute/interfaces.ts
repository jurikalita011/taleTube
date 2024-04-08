import { UserProfile } from "@auth0/nextjs-auth0/client";

export interface ProtectedRouteProps {
  children: React.ReactNode;
  roleLevel: string;
}

export interface UserProfileInterface extends UserProfile {
  "taletube_other/roles": Array<string>;
}

"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import CheckUserDetails from "./CheckUserDetails";
import { ProtectedRouteProps, UserProfileInterface } from "./interfaces";

function ProtectedRoute({ children, roleLevel }: ProtectedRouteProps) {
  const { isAuth, user, isInitialCheckWithAuth0Done } = useAppSelector(
    (state) => state.auth
  );

  const router = useRouter();

  if (
    isAuth &&
    typeof user !== undefined &&
    (user as UserProfileInterface)["taletube_other/roles"].includes(roleLevel)
  ) {
    return <>{children}</>;
  }

  if (!isAuth && isInitialCheckWithAuth0Done) {
    return router.push("/login?redirectTo=dashboard");
  }

  // if intial check has not been done yet then try to do that
  return <CheckUserDetails roleLevel={roleLevel}>{children}</CheckUserDetails>;
}

export default ProtectedRoute;

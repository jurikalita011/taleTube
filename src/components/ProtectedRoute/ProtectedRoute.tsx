"use client";

import React, { useEffect } from "react";
import { ProtectedRouteProps, UserProfileInterface } from "./interfaces";
import { UserContext, UserProfile, useUser } from "@auth0/nextjs-auth0/client";
import { setError, setLoading } from "@/redux/slices/loadingSlice";
import { useAppDispatch } from "@/redux/hooks";

function ProtectedRoute({ children, roleLevel }: ProtectedRouteProps) {
  const dispatch = useAppDispatch();

  const { isLoading, user, error } = React.useMemo<UserContext>(
    () => useUser(), // its not reconmended to call hooks inside useMemo but still..
    []
  );

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading]);

  useEffect(() => {
    dispatch(setError(error?.message || ""));
  }, [error]);

  if (isLoading) {
    return <></>;
  }

  if (error) {
    return <></>;
  }

  if (!user) {
    return <></>;
  }

  if (
    !(user as UserProfileInterface)["taletube_other/roles"]?.includes(roleLevel)
  ) {
    return (
      <a href="/api/auth/login?redirectTo=http://localhost:3000/">Log In</a>
    );
  }

  return <>{children}</>;
}

export default ProtectedRoute;

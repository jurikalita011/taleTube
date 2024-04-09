"use client";

import React, { useEffect } from "react";
import { ProtectedRouteProps, UserProfileInterface } from "./interfaces";
import { useUser } from "@auth0/nextjs-auth0/client";
import { setError, setLoading } from "@/redux/slices/loadingSlice";
import { useAppDispatch } from "@/redux/hooks";
import Navigate from "../Navigate";

function ProtectedRoute({
  children,
  roleLevel,
  renderCustomComponent = undefined,
}: ProtectedRouteProps) {
  const dispatch = useAppDispatch();

  const { isLoading, user, error } = useUser();

  console.log(isLoading);

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading]);

  useEffect(() => {
    if (!!error) {
      dispatch(setError(error.message));
    }
  }, [error]);

  if (isLoading) {
    return <></>;
  }

  if (error) {
    return <></>;
  }

  if (
    !user ||
    !(user as UserProfileInterface)["taletube_other/roles"]?.includes(roleLevel)
  ) {
    return typeof renderCustomComponent !== undefined &&
      renderCustomComponent !== undefined ? (
      <>{renderCustomComponent}</>
    ) : (
      <Navigate to="/api/auth/login?redirectTo=http://localhost:3000/" />
    );
  }

  return <>{children}</>;
}

export default ProtectedRoute;

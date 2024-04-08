import { useAppDispatch } from "@/redux/hooks";
import { setAuthState } from "@/redux/slices/authSlice";
import { setError, setLoading } from "@/redux/slices/loadingSlice";
import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";
import React from "react";
import { ProtectedRouteProps, UserProfileInterface } from "./interfaces";
import { useRouter } from "next/router";

function CheckUserDetails({
  children,
  roleLevel,
}: ProtectedRouteProps): React.ReactNode {
  const { user, isLoading, error } = useUser(); // fetches current user details from /api/auth/me route and gets the details

  const router = useRouter();
  const dispatch = useAppDispatch();

  if (isLoading) {
    dispatch(setLoading(true));
    return <></>;
  }

  if (error) {
    dispatch(setError(error.message));
    return <></>;
  }

  dispatch(
    setAuthState({
      isAuth: typeof user !== undefined && user !== undefined,
      isInitialCheckWithAuth0Done: true,
      user,
      error,
    })
  );
  dispatch(setLoading(false));

  if (
    !(
      typeof user !== undefined &&
      (user as UserProfileInterface)["taletube_other/roles"]?.includes(
        roleLevel
      )
    )
  ) {
    router.replace("/api/auth/login?redirectTo=http://localhost:3000/");
    return <></>;
  }

  return <>{children}</>;
}

export default CheckUserDetails;

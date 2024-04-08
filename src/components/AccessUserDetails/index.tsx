import { useAppDispatch } from "@/redux/hooks";
import { setAuthState } from "@/redux/slices/authSlice";
import { setError, setLoading } from "@/redux/slices/loadingSlice";
import { useUser } from "@auth0/nextjs-auth0/client";
import React from "react";

function CheckUserDetails({ children }) {
  const { user, isLoading, error } = useUser(); // fetches current user details from /api/auth/me route and gets the details

  const dispatch = useAppDispatch();

  if (isLoading) {
    return dispatch(setLoading(true));
  }

  if (error) {
    return dispatch(setError(error.message));
  }

  dispatch(setLoading(false));
  dispatch(
    setAuthState({
      isAuth: typeof user !== undefined && user !== undefined,
      user,
      error,
    })
  );
  return <div>index</div>;
}

export default CheckUserDetails;

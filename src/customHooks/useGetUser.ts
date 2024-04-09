import { UserProfileInterface } from "@/components/ProtectedRoute/interfaces";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAuthState } from "@/redux/slices/authSlice";
import { setError, setLoading } from "@/redux/slices/loadingSlice";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useMemo, useRef } from "react";

interface UserReference {
  authorized: boolean;
  isLoading: boolean;
  user: UserProfileInterface | undefined;
}

export const useGetUser = (roleLevel: string) => {
  const userRef = useRef<UserReference | null>(null);
  if (userRef.current) {
    return userRef.current;
  }

  userRef.current = { user: undefined, isLoading: true, authorized: false };

  const {
    isAuth,
    user: reduxUser,
    isInitialCheckWithAuth0Done,
  } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  // Using useMemo to ensure that useUser is called only once and its result is memoized
  const { user: auth0User, isLoading, error } = useMemo(() => useUser(), []);

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }

    if (error) {
      dispatch(setError(error.message));
    }

    if (auth0User !== undefined && isInitialCheckWithAuth0Done) {
      dispatch(
        setAuthState({
          isAuth: true,
          isInitialCheckWithAuth0Done: true,
          user: auth0User,
          error,
        })
      );
    }
  }, [auth0User, error, isLoading, isInitialCheckWithAuth0Done, dispatch]);

  useMemo(() => {
    if (
      isAuth &&
      reduxUser !== undefined &&
      (reduxUser as UserProfileInterface)["taletube_other/roles"].includes(
        roleLevel
      )
    ) {
      userRef.current = {
        authorized: true,
        isLoading: false,
        user: reduxUser as UserProfileInterface,
      };
    } else if (
      !isAuth &&
      reduxUser === undefined &&
      isInitialCheckWithAuth0Done
    ) {
      userRef.current = {
        authorized: false,
        isLoading: false,
        user: undefined,
      };
    }
  }, [isAuth, reduxUser, isInitialCheckWithAuth0Done, roleLevel]);

  return userRef.current;
};

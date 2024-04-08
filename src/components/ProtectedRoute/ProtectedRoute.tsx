"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roleLevel: number;
}

function ProtectedRoute({ children, roleLevel }: ProtectedRouteProps) {
  const { isAuth, isFirstTimeCheck } = useAppSelector((state) => state.auth);

  const router = useRouter();

  if (isAuth) {
    return <>{children}</>;
  }
  return router.push("/login?redirectTo=dashboard");
}

export default ProtectedRoute;

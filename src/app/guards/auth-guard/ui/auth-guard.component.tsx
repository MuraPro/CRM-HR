import { Navigate, Outlet } from "react-router";

import { useAppSelector } from "@/shared/hooks/use-app-selector.ts";

export const AuthGuard = () => {
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);

  if (isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

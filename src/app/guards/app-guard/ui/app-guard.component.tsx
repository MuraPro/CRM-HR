import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router";

import { useAppDispatch } from "@/shared/hooks/use-app-dispatch.ts";
import { useAppSelector } from "@/shared/hooks/use-app-selector.ts";

import { userApiQueryKeys, userThunk } from "@/entities/user";

export const AppGuard = () => {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);

  useQuery({ queryKey: userApiQueryKeys.getKey("getMe"), queryFn: () => dispatch(userThunk.getMe()) });

  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

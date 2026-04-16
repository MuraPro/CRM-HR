import { Suspense } from "react";

import { Navigate, Outlet } from "react-router";

import { useAppSelector } from "@/shared/hooks/use-app-selector.ts";
import { PageLoader } from "@/shared/ui/page-loader";

export const AuthLayout = () => {
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <div className="relative flex h-dvh items-center justify-center bg-[#EEEFF2]">
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

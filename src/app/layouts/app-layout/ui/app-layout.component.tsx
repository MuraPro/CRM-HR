import { Suspense } from "react";

import { Outlet } from "react-router";
import { twMerge } from "tailwind-merge";

import { PageLoader } from "@/shared/ui/page-loader";

import { Aside } from "@/widgets/cross/aside";
import { Header } from "@/widgets/cross/header";

interface IAppLayoutProps {
  className?: string;
}

export const AppLayout = ({ className }: IAppLayoutProps) => {
  return (
    <div className={twMerge("flex h-dvh", className)}>
      <Aside />
      <div className="h-full w-full overflow-hidden">
        <Header />
        <div className="relative h-[calc(100%-var(--header-height))] overflow-auto bg-greyscale-200 px-7 py-5">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

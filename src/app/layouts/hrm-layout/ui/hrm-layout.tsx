import { Outlet } from "react-router-dom";

import { AppHeader } from "@/widgets/app-header";
import { Sidebar } from "@/widgets/sidebar";

export const HrmLayout = () => (
  <div className="min-h-screen bg-greyscale-100">
    <div className="flex min-h-screen w-full gap-4 px-4 py-4">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />
        <main className="mt-4 flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  </div>
);


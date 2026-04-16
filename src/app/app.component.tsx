import { QueryProvider } from "@/app/providers/query";

import { RouterProvider } from "./providers/router/router-provider";

export const App = () => {
  return (
    <QueryProvider>
      <RouterProvider />
    </QueryProvider>
  );
};

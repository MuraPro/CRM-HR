import { QueryProvider } from "@/app/providers/query";
import { StoreProvider } from "@/app/providers/store";

import { RouterProvider } from "./providers/router/router-provider";

export const App = () => {
  return (
    <StoreProvider>
      <QueryProvider>
        <RouterProvider />
      </QueryProvider>
    </StoreProvider>
  );
};

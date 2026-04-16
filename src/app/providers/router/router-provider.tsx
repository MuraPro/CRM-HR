import { RouterProvider as ReactRouterProvider } from "react-router-dom";

import { browserRouter } from "@/app/router/route";

export const RouterProvider = () => {
  return <ReactRouterProvider router={browserRouter} />;
};

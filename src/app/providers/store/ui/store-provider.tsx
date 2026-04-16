import type { PropsWithChildren } from "react";

import { Provider } from "react-redux";

import { store } from "../config/store-config";

export const StoreProvider = (props: PropsWithChildren) => {
  return <Provider store={store}>{props.children}</Provider>;
};

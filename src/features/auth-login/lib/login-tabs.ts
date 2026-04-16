import type { TabSwitcherItemType } from "local-agro-ui";

import type { LoginMode } from "../model/types";

type Translate = (key: string) => string;

export const getLoginTabs = (t: Translate): TabSwitcherItemType<LoginMode>[] => [
  { name: "EDS", title: t("loginWithEds") },
  { name: "CREDENTIALS", title: t("loginWithCredentials") },
];


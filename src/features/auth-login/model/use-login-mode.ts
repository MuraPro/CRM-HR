import { useState } from "react";

import type { LoginMode } from "./types";

export const useLoginMode = () => {
  const [mode, setMode] = useState<LoginMode>("EDS");
  return { mode, setMode };
};


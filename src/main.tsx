import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "@/app/app.component";
import "@/app/i18n/i18n";
import "@/app/styles/app.css";
import "local-agro-ui/agro-ui.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

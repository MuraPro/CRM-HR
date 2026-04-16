import { useSelector } from "react-redux";

import type { AppState } from "@/shared/types/redux-types";

export const useAppSelector = useSelector.withTypes<AppState>();

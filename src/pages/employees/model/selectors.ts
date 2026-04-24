import type { AppState } from "@/shared/types/redux-types";

export const selectEmployeesFilters = (state: AppState) => state.employeesFilters;

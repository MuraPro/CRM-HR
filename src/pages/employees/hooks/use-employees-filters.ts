import { useMemo } from "react";

import { useAppDispatch } from "@/shared/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/hooks/use-app-selector";

import { employeesFiltersActions } from "../model/employees-filters-slice";
import { selectEmployeesFilters } from "../model/selectors";

export const useEmployeesFilters = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectEmployeesFilters);

  return useMemo(
    () => ({
      filters,
      setRegion: (value: string | null) => dispatch(employeesFiltersActions.setRegion(value)),
      setFilial: (value: string | null) => dispatch(employeesFiltersActions.setFilial(value)),
      setComplex: (value: string | null) => dispatch(employeesFiltersActions.setComplex(value)),
      setDepartment: (value: string | null) => dispatch(employeesFiltersActions.setDepartment(value)),
      setDivision: (value: string | null) => dispatch(employeesFiltersActions.setDivision(value)),
      setTeam: (value: string | null) => dispatch(employeesFiltersActions.setTeam(value)),
      setSearch: (value: string) => dispatch(employeesFiltersActions.setSearch(value)),
      setPage: (value: number) => dispatch(employeesFiltersActions.setPage(value)),
      setPerPage: (value: number) => dispatch(employeesFiltersActions.setPerPage(value)),
    }),
    [dispatch, filters],
  );
};

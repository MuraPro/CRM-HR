import { useQuery } from "@tanstack/react-query";

import {
  fetchComplexes,
  fetchDepartments,
  fetchDivisions,
  fetchEmployeesByFilters,
  fetchFilials,
  fetchRegions,
  fetchTeams,
} from "../api/employees-api";
import type { FiltersState } from "../model/types";

const hierarchyKeys = {
  all: ["employees-hierarchy"] as const,
  regions: () => [...hierarchyKeys.all, "regions"] as const,
  filials: (regionId: string | null) => [...hierarchyKeys.all, "filials", regionId] as const,
  complexes: (regionId: string | null, filialId: string | null) =>
    [...hierarchyKeys.all, "complexes", regionId, filialId] as const,
  departments: (regionId: string | null, filialId: string | null, complexId: string | null) =>
    [...hierarchyKeys.all, "departments", regionId, filialId, complexId] as const,
  divisions: (regionId: string | null, filialId: string | null, complexId: string | null, departmentId: string | null) =>
    [...hierarchyKeys.all, "divisions", regionId, filialId, complexId, departmentId] as const,
  teams: (
    regionId: string | null,
    filialId: string | null,
    complexId: string | null,
    departmentId: string | null,
    divisionId: string | null,
  ) => [...hierarchyKeys.all, "teams", regionId, filialId, complexId, departmentId, divisionId] as const,
  employees: (filters: FiltersState) => [...hierarchyKeys.all, "employees", filters] as const,
};

export const useRegionsQuery = () =>
  useQuery({
    queryKey: hierarchyKeys.regions(),
    queryFn: fetchRegions,
    staleTime: 5 * 60 * 1000,
  });

export const useFilialsQuery = (regionId: string | null, enabled: boolean) =>
  useQuery({
    queryKey: hierarchyKeys.filials(regionId),
    queryFn: () => fetchFilials(regionId as string),
    enabled: enabled && Boolean(regionId),
    staleTime: 5 * 60 * 1000,
  });

export const useComplexesQuery = (params: { regionId: string | null; filialId: string | null; enabled: boolean }) =>
  useQuery({
    queryKey: hierarchyKeys.complexes(params.regionId, params.filialId),
    queryFn: () => fetchComplexes({ regionId: params.regionId as string, filialId: params.filialId }),
    enabled: params.enabled && Boolean(params.regionId),
    staleTime: 5 * 60 * 1000,
  });

export const useDepartmentsQuery = (params: {
  regionId: string | null;
  filialId: string | null;
  complexId: string | null;
  enabled: boolean;
}) =>
  useQuery({
    queryKey: hierarchyKeys.departments(params.regionId, params.filialId, params.complexId),
    queryFn: () =>
      fetchDepartments({
        regionId: params.regionId as string,
        filialId: params.filialId,
        complexId: params.complexId as string,
      }),
    enabled: params.enabled && Boolean(params.regionId) && Boolean(params.complexId),
    staleTime: 5 * 60 * 1000,
  });

export const useDivisionsQuery = (params: {
  regionId: string | null;
  filialId: string | null;
  complexId: string | null;
  departmentId: string | null;
  enabled: boolean;
}) =>
  useQuery({
    queryKey: hierarchyKeys.divisions(params.regionId, params.filialId, params.complexId, params.departmentId),
    queryFn: () =>
      fetchDivisions({
        regionId: params.regionId as string,
        filialId: params.filialId,
        complexId: params.complexId as string,
        departmentId: params.departmentId as string,
      }),
    enabled:
      params.enabled && Boolean(params.regionId) && Boolean(params.complexId) && Boolean(params.departmentId),
    staleTime: 5 * 60 * 1000,
  });

export const useTeamsQuery = (params: {
  regionId: string | null;
  filialId: string | null;
  complexId: string | null;
  departmentId: string | null;
  divisionId: string | null;
  enabled: boolean;
}) =>
  useQuery({
    queryKey: hierarchyKeys.teams(
      params.regionId,
      params.filialId,
      params.complexId,
      params.departmentId,
      params.divisionId,
    ),
    queryFn: () =>
      fetchTeams({
        regionId: params.regionId as string,
        filialId: params.filialId,
        complexId: params.complexId as string,
        departmentId: params.departmentId as string,
        divisionId: params.divisionId,
      }),
    enabled:
      params.enabled &&
      Boolean(params.regionId) &&
      Boolean(params.complexId) &&
      Boolean(params.departmentId),
    staleTime: 5 * 60 * 1000,
  });

export const useEmployeesByFiltersQuery = (filters: FiltersState) =>
  useQuery({
    queryKey: hierarchyKeys.employees(filters),
    queryFn: () => fetchEmployeesByFilters(filters),
    placeholderData: (previousData) => previousData,
  });

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { FiltersState } from "./types";

const initialState: FiltersState = {
  regionId: null,
  filialId: null,
  complexId: null,
  departmentId: null,
  divisionId: null,
  teamId: null,
  search: "",
  page: 1,
  perPage: 10,
};

const employeesFiltersSlice = createSlice({
  name: "employeesFilters",
  initialState,
  reducers: {
    setRegion(state, action: PayloadAction<string | null>) {
      state.regionId = action.payload;
      state.filialId = null;
      state.complexId = null;
      state.departmentId = null;
      state.divisionId = null;
      state.teamId = null;
      state.page = 1;
    },
    setFilial(state, action: PayloadAction<string | null>) {
      state.filialId = action.payload;
      state.complexId = null;
      state.departmentId = null;
      state.divisionId = null;
      state.teamId = null;
      state.page = 1;
    },
    setComplex(state, action: PayloadAction<string | null>) {
      state.complexId = action.payload;
      state.departmentId = null;
      state.divisionId = null;
      state.teamId = null;
      state.page = 1;
    },
    setDepartment(state, action: PayloadAction<string | null>) {
      state.departmentId = action.payload;
      state.divisionId = null;
      state.teamId = null;
      state.page = 1;
    },
    setDivision(state, action: PayloadAction<string | null>) {
      state.divisionId = action.payload;
      state.teamId = null;
      state.page = 1;
    },
    setTeam(state, action: PayloadAction<string | null>) {
      state.teamId = action.payload;
      state.page = 1;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setPerPage(state, action: PayloadAction<number>) {
      state.perPage = action.payload;
      state.page = 1;
    },
  },
});

export const employeesFiltersReducer = employeesFiltersSlice.reducer;
export const employeesFiltersActions = employeesFiltersSlice.actions;

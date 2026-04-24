import { configureStore } from "@reduxjs/toolkit";

import { browserRouter } from "@/app/router/route";

import { appSliceReducer } from "@/entities/app";
import { authSliceReducer } from "@/entities/auth";
import { userSliceReducer } from "@/entities/user";
import { employeesFiltersReducer } from "@/pages/employees/model/employees-filters-slice";

export const extraArgument = {
  router: browserRouter,
};

export const store = configureStore({
  reducer: {
    app: appSliceReducer,
    auth: authSliceReducer,
    user: userSliceReducer,
    employeesFilters: employeesFiltersReducer,
  },

  devTools: import.meta.env.DEV,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument } }),
});

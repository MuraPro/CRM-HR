import { useQuery } from "@tanstack/react-query";

import { mockApi } from "@/shared/lib/mock-api";

import { mockEmployees } from "./mock-employees";

export const useEmployees = () =>
  useQuery({
    queryKey: ["employees"],
    queryFn: () => mockApi(mockEmployees, 700),
  });


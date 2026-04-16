import { useQuery } from "@tanstack/react-query";

import { mockApi } from "@/shared/lib/mock-api";

import { mockRegions } from "./mock-regions";

export const useRegions = () =>
  useQuery({
    queryKey: ["regions"],
    queryFn: () => mockApi(mockRegions, 550),
  });


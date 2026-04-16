import { useQuery } from "@tanstack/react-query";

import { mockApi } from "@/shared/lib/mock-api";

import { mockDocuments } from "./mock-documents";

export const useDocuments = () =>
  useQuery({
    queryKey: ["documents"],
    queryFn: () => mockApi(mockDocuments, 650),
  });


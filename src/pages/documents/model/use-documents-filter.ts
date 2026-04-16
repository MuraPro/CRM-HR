import { useMemo, useState } from "react";

import type { DocumentItem, DocumentStatus, DocumentType } from "@/entities/document";

export const useDocumentsFilter = (documents: DocumentItem[]) => {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<"ALL" | DocumentType>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<"ALL" | DocumentStatus>("ALL");

  const filteredDocuments = useMemo(
    () =>
      documents.filter((item) => {
        const matchesType = selectedType === "ALL" ? true : item.type === selectedType;
        const matchesStatus = selectedStatus === "ALL" ? true : item.status === selectedStatus;
        const matchesSearch = search.trim() ? item.title.toLowerCase().includes(search.trim().toLowerCase()) : true;
        return matchesType && matchesStatus && matchesSearch;
      }),
    [documents, search, selectedStatus, selectedType],
  );

  return { filteredDocuments, search, selectedStatus, selectedType, setSearch, setSelectedStatus, setSelectedType };
};


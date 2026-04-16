import { useMemo, useState } from "react";

import type { Employee } from "@/entities/employee";

export const useEmployeeFilters = (employees: Employee[]) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"ALL" | "Активный" | "Уволен" | "В отпуске">("ALL");

  const filteredEmployees = useMemo(
    () =>
      employees.filter((employee) => {
        const matchesStatus = status === "ALL" ? true : employee.status === status;
        const matchesSearch = employee.fullName.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
      }),
    [employees, search, status],
  );

  return { filteredEmployees, search, setSearch, setStatus, status };
};


import { useMemo, useState } from "react";

import type { Region } from "@/entities/region";

export const useRegionsFilter = (regions: Region[]) => {
  const [search, setSearch] = useState("");
  const [selectedRegionId, setSelectedRegionId] = useState<string>("");

  const selectedRegion = useMemo(
    () => regions.find((region) => region.id === selectedRegionId) ?? regions[0],
    [regions, selectedRegionId],
  );
  const activeRegionId = selectedRegion?.id ?? "";

  const branches = useMemo(
    () =>
      selectedRegion?.branches.filter((branch) => branch.title.toLowerCase().includes(search.toLowerCase())) ?? [],
    [search, selectedRegion],
  );

  return { activeRegionId, branches, search, selectedRegion, setSearch, setSelectedRegionId };
};


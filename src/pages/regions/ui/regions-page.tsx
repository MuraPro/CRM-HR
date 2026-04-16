import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Input, Select, type SelectOptionType } from "local-agro-ui";

import { useRegions } from "@/entities/region";
import miniLogo from "@/shared/assets/icons/mini-logo.svg";
import { AppRoute } from "@/shared/config/routes";
import { Icon } from "@/shared/ui/icon";
import { Panel } from "@/shared/ui/panel";
import { PageHeader } from "@/widgets/page-header";

import { useRegionsFilter } from "../model/use-regions-filter";

const REGION_SELECT_OPTIONS = [
  { value: "tashkent", labelKey: "regions.options.tashkent" },
  { value: "navoi", labelKey: "regions.options.navoi" },
  { value: "samarkand", labelKey: "regions.options.samarkand" },
  { value: "syrdarya", labelKey: "regions.options.syrdarya" },
  { value: "fergana", labelKey: "regions.options.fergana" },
  { value: "kashkadarya", labelKey: "regions.options.kashkadarya" },
  { value: "andijan", labelKey: "regions.options.andijan" },
] as const;

export const RegionsPage = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const { data, isLoading, isError } = useRegions();
  const regions = data ?? [];

  const regionOptions = useMemo<SelectOptionType<string>[]>(
    () =>
      REGION_SELECT_OPTIONS.map((option) => ({
        value: option.value,
        label: t(option.labelKey),
      })),
    [t],
  );

  const orderedRegions = useMemo(() => {
    const regionById = new Map(regions.map((region) => [region.id, region]));

    return regionOptions.map((regionRef) => {
      const matchedRegion = regionById.get(regionRef.value);
      if (matchedRegion) {
        return { ...matchedRegion, name: regionRef.label };
      }

      return { id: regionRef.value, name: regionRef.label, branches: [] };
    });
  }, [regionOptions, regions]);

  const { activeRegionId, branches, search, setSearch, setSelectedRegionId } = useRegionsFilter(orderedRegions);
  const selectedRegionName =
    orderedRegions.find((region) => region.id === activeRegionId)?.name ?? orderedRegions[0]?.name ?? "";

  if (isLoading) return <p className="p-4">{t("regions.loading")}</p>;
  if (isError) return <p className="p-4 text-error-500">{t("regions.error.loadFailed")}</p>;

  return (
    <div className="space-y-4">
      <PageHeader subtitle={t("regions.subtitle")} title={t("regions.title")} />
      <Panel className="border-0 bg-[#F7F8FA] p-5 shadow-none">
        <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
          <Select
            colorType="Blue"
            onChange={(option) => setSelectedRegionId(option?.value ?? "")}
            options={regionOptions}
            placeholder={t("regions.filters.regionPlaceholder")}
            value={regionOptions.find((item) => item.value === activeRegionId)}
            isSearchable={false}
          />
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Input
                colorType="Blue"
                leftIcon={<Icon name="search" />}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t("regions.filters.branchSearchPlaceholder")}
                value={search}
                className="h-9 rounded-md border border-[#EEEFF2] text-sm leading-[150%] font-medium text-[#323B49] placeholder:text-greyscale-600"
              />
            </div>
            <button
              type="button"
              className="inline-flex h-9 items-center gap-2 rounded-md bg-[#3B4BDC] px-4 text-sm font-medium text-white transition hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B4BDC]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 5h16l-6 7v5l-4 2v-7L4 5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              </svg>
              {t("filter")}
            </button>
          </div>
        </div>

        <h3 className="mb-4 text-base leading-[140%] font-bold tracking-[0.2px] text-[#1F2937]">{selectedRegionName}</h3>

        {branches.length === 0 ? (
          <div className="flex min-h-[360px] items-center justify-center rounded-xl border border-dashed border-[#D4D8DE] bg-[#FAFBFC] p-6 text-center text-sm text-greyscale-600">
            {t("regions.empty.branchesNotFound")}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {branches.map((branch) => (
              <button
                key={branch.id}
                type="button"
                onClick={() => navigate(`${AppRoute.employees}?branchId=${branch.id}`)}
                className="group flex cursor-pointer flex-col items-start gap-2 rounded-xl border-0 bg-[#F1F2F4] p-3 text-left transition-all duration-200 hover:scale-[1.01] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B4BDC]"
              >
                <div className="flex w-full items-start justify-between">
                  <div className="flex items-start gap-3">
                    <img src={miniLogo} alt="" className="h-6 w-6 shrink-0" aria-hidden />
                    <h4 className="text-base leading-6 font-medium tracking-[0.2px] text-[#323B49]">{branch.title}</h4>
                  </div>
                  <span className="inline-flex size-5 shrink-0 items-center justify-center text-[#8B95A5] transition-colors duration-200 group-hover:text-[#3B4BDC]">
                    &#8250;
                  </span>
                </div>

                <div className="grid w-full grid-cols-2 items-start gap-4 border-t border-[#EEEFF2] pt-1.5">
                  <div>
                    <p className="text-sm leading-[130%] font-normal text-[#697386]">{t("regions.branch.employees")}:</p>
                    <p className="text-sm leading-[130%] font-medium tracking-[0.2px] text-[#323B49]">{branch.employees}</p>
                  </div>
                  <div>
                    <p className="text-sm leading-[130%] font-normal text-[#697386]">{t("regions.branch.department")}:</p>
                    <p className="truncate text-sm leading-[130%] font-medium tracking-[0.2px] text-[#323B49]">
                      {branch.department}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </Panel>
    </div>
  );
};

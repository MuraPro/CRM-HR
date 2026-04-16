import { useTranslation } from "react-i18next";

type WorkforceDistributionSkeletonProps = {
  className?: string;
};

export function WorkforceDistributionSkeleton({ className = "" }: WorkforceDistributionSkeletonProps) {
  const { t } = useTranslation("common");

  return (
    <div
      className={`h-full w-full animate-pulse rounded-2xl border border-greyscale-200 bg-white p-5 shadow-sm ${className}`}
      aria-busy
      aria-label={t("workforce.loadingAria")}
    >
      <div className="mb-4 h-5 w-3/4 rounded bg-greyscale-200" />
      <div className="mb-6 h-px w-full bg-greyscale-200" />
      <div className="mb-4 h-32 w-full rounded-xl bg-greyscale-200" />
      <div className="mb-4 flex gap-2">
        <div className="h-8 w-14 rounded bg-greyscale-200" />
        <div className="h-7 w-16 rounded-md bg-greyscale-200" />
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="h-4 w-10 rounded bg-greyscale-200" />
          ))}
        </div>
        <div className="grid grid-cols-5 gap-[5px]">
          {Array.from({ length: 25 }, (_, i) => (
            <div key={i} className="h-6 rounded bg-greyscale-200" />
          ))}
        </div>
      </div>
    </div>
  );
}

import { EngagementBarChart } from "./engagement-bar-chart";

type EngagementCardProps = {
  className?: string;
  title: string;
  description: string;
  chartData: number[];
  totalPercent: number;
  chartLoading?: boolean;
  chartError?: boolean;
  errorMessage?: string;
  statusPrimary?: string;
  statusSecondary?: string;
  totalBars?: number;
};

export function EngagementCard({
  className = "",
  title,
  description,
  chartData,
  totalPercent,
  chartLoading = false,
  chartError = false,
  errorMessage = "",
  statusPrimary = "",
  statusSecondary = "",
  totalBars,
}: EngagementCardProps) {
  return (
    <article
      className={`flex h-full flex-col items-center self-stretch rounded-2xl border border-greyscale-200 bg-white p-5 text-center ${className}`}
    >
      <h2 className="mb-0 w-full text-[24px] font-medium leading-7 text-greyscale-900">{title}</h2>
      <div className="w-full p-2">
        <hr className="border-greyscale-200/80" />
      </div>
      <p className="mb-4 w-full max-w-[330px] text-xs font-normal leading-[140%] text-greyscale-600">{description}</p>

      <div className="w-full max-w-[330px] min-h-[126px]">
        <div className="mb-2 w-full">
          {chartError ? (
            <p className="h-[60px] text-xs leading-[140%] text-greyscale-600">
              {errorMessage}
            </p>
          ) : (
            <EngagementBarChart
              data={chartData}
              currentPercent={totalPercent}
              totalBars={totalBars}
              isLoading={chartLoading}
            />
          )}
        </div>

        <div className="mb-4 flex w-full items-center justify-between">
          <span className="w-7 shrink-0 text-sm font-medium leading-[130%] tracking-wide text-greyscale-600">0%</span>
          <span className="text-right text-sm font-medium leading-[130%] tracking-wide text-greyscale-600">100%</span>
        </div>
      </div>

      <footer className="mt-auto flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left">
        <p className="text-2xl font-bold leading-[125%] tracking-wide text-main-green-900">
          {chartLoading ? "—" : `${totalPercent}%`}
        </p>
        <div className="w-auto text-right text-[14px] font-normal leading-[130%] text-greyscale-600">
          <p className="whitespace-nowrap">{statusPrimary}</p>
          {statusSecondary ? <p>{statusSecondary}</p> : null}
        </div>
      </footer>
    </article>
  );
}

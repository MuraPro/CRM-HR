export type AttendanceChartSlice = {
  label: string;
  value: number;
  fill: string;
};

export type AttendanceLegendItem = {
  label: string;
  value: number;
  valueSuffix?: string;
  dotColorClass: string;
};

export type AttendanceOverviewData = {
  title: string;
  totalCaption: string;
  totalCount: number;
  legend: AttendanceLegendItem[];
  chart: AttendanceChartSlice[];
};

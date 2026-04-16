import type { HTMLAttributes, PropsWithChildren } from "react";

type StackDirection = "row" | "col";
type Align = "start" | "center" | "end" | "stretch" | "between";

interface StackProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  direction?: StackDirection;
  gap?: number;
  align?: Align;
}

const alignClassMap: Record<Align, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  between: "justify-between",
};

const gapClassMap: Record<number, string> = {
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
};

export const Stack = ({ children, className = "", direction = "col", gap = 4, align = "start", ...props }: StackProps) => (
  <div className={`flex ${direction === "row" ? "flex-row" : "flex-col"} ${alignClassMap[align]} ${gapClassMap[gap] ?? "gap-4"} ${className}`} {...props}>
    {children}
  </div>
);

export const HStack = (props: Omit<StackProps, "direction">) => <Stack direction="row" {...props} />;

export const VStack = (props: Omit<StackProps, "direction">) => <Stack direction="col" {...props} />;


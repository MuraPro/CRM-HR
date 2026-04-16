import type { HTMLAttributes, PropsWithChildren } from "react";

interface PanelProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {}

export const Panel = ({ children, className = "", ...props }: PanelProps) => (
  <section className={`rounded-2xl border border-greyscale-300 bg-white p-4 shadow-sm ${className}`} {...props}>
    {children}
  </section>
);


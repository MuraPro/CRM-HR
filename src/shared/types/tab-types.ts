import type { ReactElement, SVGProps } from "react";

export interface ITabItemsType<T = unknown> {
  name: T;
  title: string;
  leftIcon?: ReactElement<Omit<SVGProps<SVGSVGElement>, "ref">>;
}

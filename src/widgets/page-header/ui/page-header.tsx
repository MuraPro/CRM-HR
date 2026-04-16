import { useTranslation } from "react-i18next";
import { Input } from "local-agro-ui";

import { Icon } from "@/shared/ui/icon";
import { HStack } from "@/shared/ui/stack";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  const { t } = useTranslation("common");

  return (
    <header className="rounded-2xl border border-greyscale-300 bg-white p-4">
      <HStack align="between" className="w-full">
        <div>
          <h1 className="text-2xl font-bold text-greyscale-900">{title}</h1>
          {subtitle && <p className="text-sm text-greyscale-600">{subtitle}</p>}
        </div>
        <div className="w-80">
          <Input colorType="Blue" leftIcon={<Icon name="search" />} placeholder={t("search")} />
        </div>
      </HStack>
    </header>
  );
};


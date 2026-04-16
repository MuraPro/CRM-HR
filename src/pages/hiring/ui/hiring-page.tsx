import { useTranslation } from "react-i18next";

import { HiringWizard } from "@/features/hiring-wizard";
import { PageHeader } from "@/widgets/page-header";

export const HiringPage = () => {
  const { t } = useTranslation("common");

  return (
    <div className="space-y-4">
      <PageHeader subtitle={t("hiring.subtitle")} title={t("hiring.title")} />
      <HiringWizard />
    </div>
  );
};


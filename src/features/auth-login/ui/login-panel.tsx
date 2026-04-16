import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Button, Input, TabsSwitcher } from "local-agro-ui";

import { AppRoute } from "@/shared/config/routes";

import { getLoginTabs } from "../lib/login-tabs";
import { useLoginMode } from "../model/use-login-mode";
import { EdsCertificateCard } from "./eds-certificate-card";

export const LoginPanel = () => {
  const { t } = useTranslation(["auth", "common"]);
  const navigate = useNavigate();
  const { mode, setMode } = useLoginMode();
  const tabs = getLoginTabs((key) => t(`auth:${key}`));

  return (
    <div className="flex min-h-[520px] w-full max-w-xl flex-col rounded-2xl border border-greyscale-300 bg-white p-6 shadow-lg">
      <h1 className="mb-2 text-3xl font-bold">{t("auth:signInTitle")}</h1>
      <p className="mb-6 text-sm text-greyscale-600">{t("auth:signInDescription")}</p>
      <TabsSwitcher activeTab={mode} items={tabs} onTabChange={setMode} />

      <div className="mt-5 flex flex-1 flex-col">
        {mode === "EDS" ? (
          <EdsCertificateCard onSignIn={() => navigate(AppRoute.dashboard)} />
        ) : (
          <div className="space-y-4">
            <Input label={t("auth:login")} placeholder={t("auth:loginPlaceholder")} />
            <Input label={t("auth:password")} placeholder={t("auth:passwordPlaceholder")} type="password" />
          </div>
        )}

        {mode === "CREDENTIALS" && (
          <Button className="mt-6 w-full" colorType="Blue" onClick={() => navigate(AppRoute.dashboard)}>
            {t("common:signIn")}
          </Button>
        )}
      </div>
      <p className="mt-4 text-center text-xs text-greyscale-600">
        {t("auth:support")}: +998 (75) 123-23-23
      </p>
    </div>
  );
};


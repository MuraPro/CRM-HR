import { useTranslation } from "react-i18next";

const CERTIFICATE_NAME = "ABDULLAYEV ABDUSHUKURXON FAYZULLA O'G'LI";
const CERTIFICATE_PINFL = "30603950560069";
const CERTIFICATE_STIR = "535305457";
const CERTIFICATE_SERIAL = "20 Aug 2019";
const CERTIFICATE_VALID_UNTIL = "17.12.22 - 17.12.24";

type EdsCertificateCardProps = {
  onSignIn: () => void;
};

export const EdsCertificateCard = ({ onSignIn }: EdsCertificateCardProps) => {
  const { t } = useTranslation(["auth", "common"]);

  return (
    <div className="rounded-xl border border-greyscale-200 bg-white p-5 shadow-sm">
      <p className="text-base font-semibold leading-snug text-greyscale-900">{CERTIFICATE_NAME}</p>

      <div className="mt-5 grid grid-cols-3 gap-x-6 gap-y-1 text-sm">
        <p className="text-greyscale-500">{t("common:pinfl")}:</p>
        <p className="text-greyscale-500">{t("common:inn")}:</p>
        <p className="text-greyscale-500">{t("common:type")}:</p>
        <p className="font-medium text-greyscale-900">{CERTIFICATE_PINFL}</p>
        <p className="font-medium text-greyscale-900">{CERTIFICATE_STIR}</p>
        <p className="font-medium text-greyscale-900">{t("auth:individual")}</p>
      </div>

      <div className="mt-5 border-t border-greyscale-200 pt-5 text-sm">
        <div className="grid grid-cols-3 gap-x-6 gap-y-2">
          <p className="text-greyscale-500">{t("auth:certificateNumber")}:</p>
          <p className="text-greyscale-500">{t("auth:certificateValidityFull")}:</p>
          <p className="text-greyscale-500">{t("common:signIn")}</p>
          <p className="font-medium text-greyscale-900">{CERTIFICATE_SERIAL}</p>
          <p className="font-medium text-greyscale-900">{CERTIFICATE_VALID_UNTIL}</p>
          <div className="flex items-end">
            <button
              className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-[#3B4BDC] px-4 text-sm font-medium text-white transition hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B4BDC] active:opacity-90"
              type="button"
              onClick={onSignIn}
            >
              {t("common:signIn")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

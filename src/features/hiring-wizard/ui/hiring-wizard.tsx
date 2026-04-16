import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "local-agro-ui";

import { AppRoute } from "@/shared/config/routes";

import { useHiringWizard } from "../model/use-hiring-wizard";
import { ActivationStep, DocumentsStep, PersonalDataStep, PositionStep, SearchCandidateStep } from "./hiring-steps";
import { HiringStepper } from "./hiring-stepper";

export const HiringWizard = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const wizard = useHiringWizard();

  return (
    <div className="space-y-4">
      <HiringStepper currentStep={wizard.step} />

      {wizard.step === 1 && (
        <SearchCandidateStep
          candidate={wizard.candidate}
          error={wizard.error}
          form={wizard.form}
          isSearching={wizard.isSearching}
          onFieldChange={wizard.updateField}
          onSearch={wizard.searchByPinfl}
        />
      )}
      {wizard.step === 2 && (
        <PersonalDataStep
          candidate={wizard.candidate}
          error={wizard.error}
          form={wizard.form}
          isSearching={wizard.isSearching}
          onFieldChange={wizard.updateField}
          onSearch={wizard.searchByPinfl}
        />
      )}
      {wizard.step === 3 && (
        <DocumentsStep
          candidate={wizard.candidate}
          error={wizard.error}
          form={wizard.form}
          isSearching={wizard.isSearching}
          onFieldChange={wizard.updateField}
          onSearch={wizard.searchByPinfl}
        />
      )}
      {wizard.step === 4 && (
        <PositionStep
          candidate={wizard.candidate}
          error={wizard.error}
          form={wizard.form}
          isSearching={wizard.isSearching}
          onFieldChange={wizard.updateField}
          onSearch={wizard.searchByPinfl}
        />
      )}
      {wizard.step === 5 && (
        <ActivationStep
          candidate={wizard.candidate}
          error={wizard.error}
          form={wizard.form}
          isSearching={wizard.isSearching}
          onFieldChange={wizard.updateField}
          onSearch={wizard.searchByPinfl}
        />
      )}

      <div className="flex justify-between">
        <Button colorType="Blue" disabled={wizard.step === 1} onClick={wizard.prevStep} variantType="Outlined">
          {t("hiring.actions.prev")}
        </Button>
        {wizard.step < 5 ? (
          <Button
            colorType="Blue"
            onClick={wizard.nextStep}
            disabled={wizard.step === 1 && !wizard.isStepOneValid}
          >
            {t("hiring.actions.next")}
          </Button>
        ) : (
          <Button
            colorType="Blue"
            onClick={async () => {
              await wizard.activateEmployee();
              navigate(AppRoute.dashboard);
            }}
          >
            {t("hiring.actions.activateEmployee")}
          </Button>
        )}
      </div>
    </div>
  );
};


import { useTranslation } from "react-i18next";

import type { HiringStep } from "../model/types";

const steps: Array<{ id: HiringStep; titleKey: string }> = [
  { id: 1, titleKey: "hiring.stepper.search" },
  { id: 2, titleKey: "hiring.stepper.personalData" },
  { id: 3, titleKey: "hiring.stepper.documents" },
  { id: 4, titleKey: "hiring.stepper.position" },
  { id: 5, titleKey: "hiring.stepper.activation" },
];

interface HiringStepperProps {
  currentStep: HiringStep;
}

export const HiringStepper = ({ currentStep }: HiringStepperProps) => {
  const { t } = useTranslation("common");

  return (
    <div className="grid grid-cols-5 gap-2 rounded-xl bg-greyscale-100 p-2">
      {steps.map((step) => (
        <div
          key={step.id}
          className={`rounded-lg px-3 py-2 text-center text-xs font-medium ${
            step.id <= currentStep ? "bg-[#3B4BDC] text-white" : "bg-white text-greyscale-700"
          }`}
        >
          <p>
            {t("hiring.stepper.step")} {step.id}
          </p>
          <p>{t(step.titleKey)}</p>
        </div>
      ))}
    </div>
  );
};


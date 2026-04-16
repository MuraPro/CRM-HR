import type { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { DatePicker, Input, Select, type SelectOptionType } from "local-agro-ui";

import { mockRegions } from "@/entities/region/model/mock-regions";
import { Panel } from "@/shared/ui/panel";
import { Icon } from "@/shared/ui/icon";

import type { HiringCandidate, HiringFormData } from "../model/types";

interface StepProps {
  form: HiringFormData;
  candidate: HiringCandidate | null;
  isSearching: boolean;
  error: string | null;
  onSearch: () => void;
  onFieldChange: <K extends keyof HiringFormData>(key: K, value: HiringFormData[K]) => void;
}

const parseDateFromFormValue = (value: string): Date | null => {
  const [dayPart, monthPart, yearPart] = value.split(".");
  if (!dayPart || !monthPart || !yearPart) {
    return null;
  }

  const day = Number(dayPart);
  const month = Number(monthPart);
  const year = Number(yearPart);
  if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) {
    return null;
  }

  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? null : date;
};

const formatDateForForm = (date: Date | null): string => {
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("ru-RU").format(date);
};

export const SearchCandidateStep = ({ form, candidate, error, onFieldChange }: StepProps) => {
  const { t } = useTranslation("common");

  return (
    <Panel>
      <h3 className="text-lg font-semibold">{t("hiring.search.title")}</h3>
      <div className="mt-4">
        <Input
          onChange={(event) => onFieldChange("pinfl", event.target.value)}
          placeholder={t("hiring.search.pinflPlaceholder")}
          value={form.pinfl}
        />
      </div>
      {error && <p className="mt-3 text-sm text-error-500">{t(`hiring.errors.${error}`)}</p>}
      {candidate && (
        <div className="mt-4 rounded-lg bg-main-green-50 p-3 text-sm">
          <p>
            {t("hiring.search.found")}: {candidate.fullName}
          </p>
          <p>
            {t("hiring.search.status")}: {candidate.status}
          </p>
        </div>
      )}
    </Panel>
  );
};

export const PersonalDataStep = ({ form, onFieldChange }: StepProps) => {
  const { t } = useTranslation("common");
  const genderOptions: SelectOptionType<string>[] = [
    { label: t("hiring.genderOptions.male"), value: t("hiring.genderOptions.male") },
    { label: t("hiring.genderOptions.female"), value: t("hiring.genderOptions.female") },
  ];
  const familyStatusOptions: SelectOptionType<string>[] = [
    { label: t("hiring.familyStatusOptions.single"), value: t("hiring.familyStatusOptions.single") },
    { label: t("hiring.familyStatusOptions.married"), value: t("hiring.familyStatusOptions.married") },
  ];

  return (
    <Panel>
      <h3 className="text-lg font-semibold">{t("hiring.personalData.title")}</h3>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <Input onChange={(event) => onFieldChange("firstName", event.target.value)} placeholder={t("hiring.fields.firstName")} value={form.firstName} />
        <Input onChange={(event) => onFieldChange("lastName", event.target.value)} placeholder={t("hiring.fields.lastName")} value={form.lastName} />
        <Input onChange={(event) => onFieldChange("middleName", event.target.value)} placeholder={t("hiring.fields.middleName")} value={form.middleName} />
        <Input onChange={(event) => onFieldChange("birthday", event.target.value)} placeholder={t("hiring.fields.birthday")} value={form.birthday} />
        <Select
          colorType="Blue"
          isSearchable={false}
          onChange={(option) => onFieldChange("gender", option?.value ?? "")}
          options={genderOptions}
          placeholder={t("hiring.fields.gender")}
          value={genderOptions.find((item) => item.value === form.gender) ?? null}
        />
        <Input onChange={(event) => onFieldChange("phone", event.target.value)} placeholder={t("hiring.fields.phone")} value={form.phone} />
        <Input onChange={(event) => onFieldChange("email", event.target.value)} placeholder={t("hiring.fields.email")} value={form.email} />
        <Select
          onChange={(option) => onFieldChange("familyStatus", option?.value ?? "")}
          options={familyStatusOptions}
          placeholder={t("hiring.fields.familyStatus")}
          value={familyStatusOptions.find((item) => item.value === form.familyStatus) ?? null}
          isSearchable={false}
        />
      </div>
    </Panel>
  );
};

export const DocumentsStep = ({ form, onFieldChange }: StepProps) => {
  const { t } = useTranslation("common");
  const resumeInputId = "hiring-resume-upload";
  const photoInputId = "hiring-photo-upload";
  const handleResumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    onFieldChange("resumeFileName", selectedFile?.name ?? "");
  };
  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    onFieldChange("photoFileName", selectedFile?.name ?? "");
  };

  return (
    <Panel>
      <h3 className="text-lg font-semibold">{t("hiring.documents.title")}</h3>
      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,420px)_minmax(0,420px)]">
        <div className="w-full">
          <input
            id={resumeInputId}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only"
            onChange={handleResumeChange}
          />
          <label
            htmlFor={resumeInputId}
            className="border-greyscale-500 flex h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-lg border bg-white px-4 text-sm text-greyscale-700 transition hover:border-[#3B4BDC]"
          >
            <span className="truncate">{form.resumeFileName || t("hiring.documents.portfolioPlaceholder")}</span>
            <Icon name="download" className="size-4 shrink-0 text-greyscale-500" />
          </label>
        </div>
        <div className="w-full">
          <input id={photoInputId} type="file" accept="image/*" className="sr-only" onChange={handlePhotoChange} />
          <label
            htmlFor={photoInputId}
            className="border-greyscale-500 flex h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-lg border bg-white px-4 text-sm text-greyscale-700 transition hover:border-[#3B4BDC]"
          >
            <span className="truncate">{form.photoFileName || t("hiring.documents.photoPlaceholder")}</span>
            <Icon name="download" className="size-4 shrink-0 text-greyscale-500" />
          </label>
        </div>
      </div>
    </Panel>
  );
};

export const PositionStep = ({ form, onFieldChange }: StepProps) => {
  const { t } = useTranslation("common");
  type BranchOption = SelectOptionType<string, { department: string }>;
  const selectedStartDate = parseDateFromFormValue(form.startDate);

  const branchOptionsByRegion: { label: string; options: BranchOption[] }[] = mockRegions.map((region) => ({
    label: region.name,
    options: region.branches.map((branch) => ({
      label: branch.title,
      value: branch.title,
      department: branch.department,
    })),
  }));
  const selectedBranchOption =
    branchOptionsByRegion.flatMap((regionGroup) => regionGroup.options).find((option) => option.value === form.branch) ?? null;
  const positionOptions: SelectOptionType<string>[] = [
    { label: t("hiring.positionOptions.accountant"), value: t("hiring.positionOptions.accountant") },
    { label: t("hiring.positionOptions.hrManager"), value: t("hiring.positionOptions.hrManager") },
    { label: t("hiring.positionOptions.lawyer"), value: t("hiring.positionOptions.lawyer") },
    { label: t("hiring.positionOptions.officeManager"), value: t("hiring.positionOptions.officeManager") },
    { label: t("hiring.positionOptions.financialAnalyst"), value: t("hiring.positionOptions.financialAnalyst") },
    { label: t("hiring.positionOptions.hrSpecialist"), value: t("hiring.positionOptions.hrSpecialist") },
  ];
  const employmentTypeOptions: SelectOptionType<string>[] = [
    { label: t("hiring.employmentTypeOptions.fullTime"), value: t("hiring.employmentTypeOptions.fullTime") },
    { label: t("hiring.employmentTypeOptions.partTime"), value: t("hiring.employmentTypeOptions.partTime") },
    { label: t("hiring.employmentTypeOptions.shift"), value: t("hiring.employmentTypeOptions.shift") },
    { label: t("hiring.employmentTypeOptions.remote"), value: t("hiring.employmentTypeOptions.remote") },
    { label: t("hiring.employmentTypeOptions.hybrid"), value: t("hiring.employmentTypeOptions.hybrid") },
    { label: t("hiring.employmentTypeOptions.project"), value: t("hiring.employmentTypeOptions.project") },
  ];

  return (
    <Panel>
      <h3 className="text-lg font-semibold">{t("hiring.position.title")}</h3>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Select<string, { department: string }, false, BranchOption>
          colorType="Blue"
          isSearchable={false}
          onChange={(option) => {
            onFieldChange("branch", option?.value ?? "");
            onFieldChange("department", option?.department ?? "");
          }}
          options={branchOptionsByRegion}
          placeholder={t("hiring.fields.branch")}
          value={selectedBranchOption}
        />
        <Input onChange={(event) => onFieldChange("department", event.target.value)} placeholder={t("hiring.fields.department")} value={form.department} />
        <Select
          colorType="Blue"
          isSearchable={false}
          onChange={(option) => onFieldChange("position", option?.value ?? "")}
          options={positionOptions}
          placeholder={t("hiring.fields.vacancy")}
          value={positionOptions.find((item) => item.value === form.position) ?? null}
        />
        <Select
          colorType="Blue"
          isSearchable={false}
          onChange={(option) => onFieldChange("employmentType", option?.value ?? "")}
          options={employmentTypeOptions}
          placeholder={t("hiring.fields.employmentType")}
          value={employmentTypeOptions.find((item) => item.value === form.employmentType) ?? null}
        />
        <DatePicker
          colorType="Blue"
          date={selectedStartDate}
          placeholder={t("hiring.fields.startDate")}
          setDate={(nextDate) => onFieldChange("startDate", formatDateForForm(nextDate))}
        />
      </div>
    </Panel>
  );
};

export const ActivationStep = ({ form, candidate }: StepProps) => {
  const { t } = useTranslation("common");
  const employeeNameFromForm = [form.lastName, form.firstName, form.middleName].filter(Boolean).join(" ").trim();
  const employeeName = candidate?.fullName || employeeNameFromForm;

  return (
    <Panel>
      <h3 className="text-lg font-semibold">{t("hiring.activation.title")}</h3>
      <div className="mt-4 space-y-2 text-sm">
        <p>
          {t("hiring.activation.employee")}: {employeeName || t("hiring.activation.notSelected")}
        </p>
        <p>
          {t("hiring.activation.position")}: {form.position || t("hiring.activation.notSpecified")}
        </p>
        <p>
          {t("hiring.activation.division")}: {form.branch || t("hiring.activation.notSpecified")} -{" "}
          {form.department || t("hiring.activation.notSpecified")}
        </p>
        <p>
          {t("hiring.activation.order")}: {form.orderNumber || "ПР-2026-11111"} {t("hiring.activation.from")}{" "}
          {form.orderDate || "22.08.2026"}
        </p>
        <p>
          {t("hiring.activation.workDate")}: {form.workDate || "22.09.2026"}
        </p>
      </div>
    </Panel>
  );
};


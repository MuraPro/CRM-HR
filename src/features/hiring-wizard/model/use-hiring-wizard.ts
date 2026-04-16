import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { addMockEmployee, getNextMockEmployeeId, mockEmployees, type Employee } from "@/entities/employee";
import { mockRegions } from "@/entities/region/model/mock-regions";
import { mockApi } from "@/shared/lib/mock-api";

import { initialHiringForm, mockCandidates } from "../lib/constants";
import type { HiringCandidate, HiringFormData, HiringStep } from "./types";

export const useHiringWizard = () => {
  const queryClient = useQueryClient();
  const [step, setStep] = useState<HiringStep>(1);
  const [form, setForm] = useState<HiringFormData>(initialHiringForm);
  const [candidate, setCandidate] = useState<HiringCandidate | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = <K extends keyof HiringFormData>(key: K, value: HiringFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const applyRandomEmployeeToPersonalData = () => {
    const randomEmployee = mockEmployees[Math.floor(Math.random() * mockEmployees.length)];
    if (!randomEmployee) {
      return;
    }

    const [lastName = "", firstName = "", middleName = ""] = randomEmployee.fullName.split(" ");

    setForm((prev) => ({
      ...prev,
      firstName,
      lastName,
      middleName,
      birthday: randomEmployee.birthday,
      gender: randomEmployee.gender,
      phone: randomEmployee.phone,
      email: randomEmployee.email,
      familyStatus: prev.familyStatus || "холост",
    }));
  };

  const applyRandomBranchAndDepartment = () => {
    const allBranches = mockRegions.flatMap((region) => region.branches);
    const randomBranch = allBranches[Math.floor(Math.random() * allBranches.length)];

    if (!randomBranch) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      branch: randomBranch.title,
      department: randomBranch.department,
    }));
  };

  const nextStep = () => {
    const pinflDigitsCount = form.pinfl.replace(/\D/g, "").length;
    if (step === 1) {
      if (pinflDigitsCount < 14) {
        return;
      }

      applyRandomEmployeeToPersonalData();
      setStep(2);
      return;
    }

    if (step === 2) {
      setStep(3);
      return;
    }

    if (step === 3) {
      applyRandomBranchAndDepartment();
      setStep(4);
      return;
    }

    if (step === 4) {
      setStep(5);
    }
  };

  const prevStep = () =>
    setStep((prev) => {
      if (prev === 5) return 4;
      if (prev === 4) return 3;
      if (prev === 3) return 2;
      if (prev === 2) return 1;
      return 1;
    });

  const searchByPinfl = async () => {
    setIsSearching(true);
    setError(null);

    try {
      const result = await mockApi(mockCandidates.find((item) => item.pinfl === form.pinfl) ?? null, 800);
      if (!result) {
        setCandidate(null);
        setError("candidateNotFound");
        return;
      }
      setCandidate(result);
      setForm((prev) => ({ ...prev, lastName: result.fullName.split(" ")[0] ?? "" }));
    } finally {
      setIsSearching(false);
    }
  };

  const activateEmployee = async () => {
    await mockApi(true, 1000);
    const fullName = [form.lastName, form.firstName, form.middleName].filter(Boolean).join(" ").trim();
    const matchedBranch = mockRegions.flatMap((region) => region.branches).find((branch) => branch.title === form.branch);
    const branchId = matchedBranch?.id ?? "t-1";
    const nextEmployeeId = getNextMockEmployeeId();
    const newEmployee: Employee = {
      id: nextEmployeeId,
      branchId,
      fullName: fullName || `Новый сотрудник ${nextEmployeeId}`,
      position: form.position || "Сотрудник",
      email: form.email || `employee${nextEmployeeId}@agrobank.uz`,
      phone: form.phone || "+998 90 000 00 00",
      status: "Активный",
      address: form.branch || "Не указан",
      birthday: form.birthday || "01.01.1990",
      gender: form.gender || "Не указан",
      experience: [],
      projects: [],
    };

    addMockEmployee(newEmployee);
    if (matchedBranch) {
      matchedBranch.employees += 1;
    }

    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["employees"] }),
      queryClient.invalidateQueries({ queryKey: ["regions"] }),
    ]);
    setStep(5);
  };

  return {
    activateEmployee,
    candidate,
    error,
    form,
    isSearching,
    isStepOneValid: form.pinfl.replace(/\D/g, "").length >= 14,
    nextStep,
    prevStep,
    searchByPinfl,
    setStep,
    step,
    updateField,
  };
};


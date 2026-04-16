import { Link, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { mockEmployees } from "@/entities/employee";
import { AppRoute } from "@/shared/config/routes";
import { PageHeader } from "@/widgets/page-header";
import { Icon } from "@/shared/ui/icon";
import { Panel } from "@/shared/ui/panel";
import avatar from "@/shared/assets/candidate-avatar.svg";

export const EmployeeDetailsPage = () => {
  const { t } = useTranslation("common");
  const location = useLocation();
  const { id } = useParams();
  const employee = mockEmployees.find((item) => item.id === id);
  const backTo =
    typeof location.state === "object" && location.state && "from" in location.state
      ? String(location.state.from)
      : AppRoute.employees;

  if (!employee) {
    return <p className="text-error-500">{t("employeeDetails.error.notFound")}</p>;
  }

  return (
    <div className="space-y-4">
      <PageHeader subtitle={employee.position} title={employee.fullName} />
      <div className="grid grid-cols-3 gap-4">
        <Panel>
          <img alt={employee.fullName} className="mb-4 h-20 w-20 rounded-full" src={avatar} />
          <h3 className="font-semibold">{t("employeeDetails.sections.personalData")}</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>{t("employeeDetails.fields.phone")}: {employee.phone}</li>
            <li>{t("employeeDetails.fields.email")}: {employee.email}</li>
            <li>{t("employeeDetails.fields.gender")}: {employee.gender}</li>
            <li>{t("employeeDetails.fields.birthday")}: {employee.birthday}</li>
            <li>{t("employeeDetails.fields.address")}: {employee.address}</li>
          </ul>
        </Panel>
        <Panel>
          <h3 className="font-semibold">{t("employeeDetails.sections.experience")}</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {employee.experience.map((item) => (
              <li key={item.id}>
                <p className="font-medium">{item.company}</p>
                <p>{item.role}</p>
                <p className="text-greyscale-600">{item.period}</p>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel>
          <h3 className="font-semibold">{t("employeeDetails.sections.projects")}</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {employee.projects.map((project) => (
              <li key={project.id} className="rounded-lg bg-greyscale-100 p-2">
                <p className="font-medium">{project.name}</p>
                <p>{t("employeeDetails.fields.tasks")}: {project.progress}</p>
                <p>{t("employeeDetails.fields.deadline")}: {project.deadline}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
      <Link className="inline-flex items-center gap-2 text-sm text-[#3B4BDC]" to={backTo}>
        <Icon name="back" />
        {t("employeeDetails.backToList")}
      </Link>
    </div>
  );
};


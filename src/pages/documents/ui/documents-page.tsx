import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input, Select, type SelectOptionType, Tag } from "local-agro-ui";

import { DOCUMENT_TYPES, useDocuments, type DocumentStatus, type DocumentType } from "@/entities/document";
import { PageHeader } from "@/widgets/page-header";
import { Icon } from "@/shared/ui/icon";
import { Panel } from "@/shared/ui/panel";

import { useDocumentsFilter } from "../model/use-documents-filter";
import { useDocumentsExport } from "../model/use-documents-export";

const documentTypeLabelKeyByValue: Record<DocumentType, string> = {
  "Акт выполненных работ": "documents.types.completedWorkAct",
  "Финансовый акт": "documents.types.financialAct",
  "Договор поставки": "documents.types.supplyContract",
  "Служебная записка": "documents.types.serviceMemo",
  "Приказ по персоналу": "documents.types.hrOrder",
};

const documentStatusLabelKeyByValue: Record<DocumentStatus, string> = {
  "Активный": "status.active",
  "В архиве": "documents.status.archived",
  "На согласовании": "documents.status.pendingApproval",
};

const documentStatusTagColorByValue: Record<DocumentStatus, "Blue" | "Gray" | "Amber"> = {
  "Активный": "Blue",
  "В архиве": "Gray",
  "На согласовании": "Amber",
};

type DocumentsSection = "OUTGOING" | "INCOMING" | "TEMPLATES";
type StatusQuickFilter = "ALL" | DocumentStatus;

const documentsSectionItems: { key: DocumentsSection; labelKey: string }[] = [
  { key: "OUTGOING", labelKey: "documents.sections.outgoingActs" },
  { key: "INCOMING", labelKey: "documents.sections.incomingActs" },
  { key: "TEMPLATES", labelKey: "documents.sections.actTemplates" },
];

const statusQuickFilterItems: { key: StatusQuickFilter; labelKey: string }[] = [
  { key: "ALL", labelKey: "documents.filters.allTypes" },
  { key: "Активный", labelKey: "documents.filters.active" },
  { key: "На согласовании", labelKey: "documents.filters.pendingApproval" },
];

const PAGINATION_SIZE = 9;

export const DocumentsPage = () => {
  const { t } = useTranslation("common");
  const { data, isLoading, isError } = useDocuments();
  const documents = data ?? [];
  const [activeSection, setActiveSection] = useState<DocumentsSection>("OUTGOING");
  const [page, setPage] = useState(1);
  const { filteredDocuments, search, selectedStatus, selectedType, setSearch, setSelectedStatus, setSelectedType } =
    useDocumentsFilter(documents);
  const { exportSingleDocument } = useDocumentsExport({
    getStatusLabel: (status) => t(documentStatusLabelKeyByValue[status]),
    getTypeLabel: (type) => t(documentTypeLabelKeyByValue[type]),
  });
  const typeOptions: SelectOptionType<"ALL" | DocumentType>[] = [
    { label: t("documents.filters.allTypes"), value: "ALL" },
    ...DOCUMENT_TYPES.map((type) => ({ label: t(documentTypeLabelKeyByValue[type]), value: type })),
  ];
  const totalPages = Math.max(1, Math.ceil(filteredDocuments.length / PAGINATION_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginationPages = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (safePage <= 3) {
      return [1, 2, 3, 0, totalPages];
    }

    if (safePage >= totalPages - 2) {
      return [1, 0, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, 0, safePage, 0, totalPages];
  }, [safePage, totalPages]);

  const paginatedDocuments = useMemo(() => {
    const from = (safePage - 1) * PAGINATION_SIZE;
    return filteredDocuments.slice(from, from + PAGINATION_SIZE);
  }, [filteredDocuments, safePage]);

  if (isLoading) return <p className="p-4">{t("documents.loading")}</p>;
  if (isError) return <p className="p-4 text-error-500">{t("documents.error.loadFailed")}</p>;

  return (
    <div className="space-y-4">
      <PageHeader subtitle={t("documents.subtitle")} title={t("documents.title")} />
      <Panel>
        <div className="mb-5 flex flex-wrap gap-2 border-b border-greyscale-200 pb-4">
          {documentsSectionItems.map((item) => {
            const isActive = item.key === activeSection;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveSection(item.key)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive ? "bg-[#3B4BDC] text-white" : "bg-greyscale-100 text-greyscale-700 hover:bg-greyscale-200"
                }`}
              >
                {t(item.labelKey)}
              </button>
            );
          })}
        </div>

        <div className="mb-4 grid grid-cols-1 gap-3 lg:grid-cols-[240px_auto_1fr]">
          <Select
            isSearchable={false}
            onChange={(option) => {
              setSelectedType(option?.value ?? "ALL");
              setPage(1);
            }}
            options={typeOptions}
            value={typeOptions.find((item) => item.value === selectedType)}
            placeholder={t("documents.filters.allTypes")}
          />
          <div className="flex flex-wrap items-center gap-2">
            {statusQuickFilterItems.map((item) => {
              const isActive = selectedStatus === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setSelectedStatus(item.key);
                    setPage(1);
                  }}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                    isActive ? "bg-[#3B4BDC] text-white" : "bg-greyscale-100 text-greyscale-700 hover:bg-greyscale-200"
                  }`}
                >
                  {t(item.labelKey)}
                </button>
              );
            })}
          </div>
          <Input
            leftIcon={<Icon name="search" />}
            placeholder={t("documents.filters.searchShortPlaceholder")}
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
          />
        </div>

        {filteredDocuments.length === 0 ? (
          <p className="text-sm text-greyscale-600">{t("documents.empty.filtered")}</p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {paginatedDocuments.map((document) => (
                <article
                  key={document.id}
                  className="flex min-h-[174px] flex-col justify-between rounded-2xl border border-greyscale-300 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-xs font-medium uppercase tracking-wide text-greyscale-500">
                        {t("documents.card.typeLabel")}
                      </p>
                      <h3 className="text-lg font-semibold leading-6 text-greyscale-900">
                        {t(documentTypeLabelKeyByValue[document.type])}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => exportSingleDocument(document)}
                      aria-label={`${t("documents.actions.exportDocument")} ${document.title}`}
                      className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-greyscale-300 text-greyscale-700 transition hover:bg-greyscale-100"
                    >
                      <Icon name="download" className="size-4" />
                    </button>
                  </div>

                  <div className="mt-4 rounded-xl bg-greyscale-100/70 p-3">
                    <p className="truncate text-sm font-medium text-greyscale-900">{document.title}</p>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <p className="text-xs text-greyscale-600">{document.createdAt}</p>
                      <Tag colorType={documentStatusTagColorByValue[document.status]}>
                        {t(documentStatusLabelKeyByValue[document.status])}
                      </Tag>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-greyscale-200 pt-4">
              <p className="text-sm text-greyscale-600">
                {t("documents.pagination.page")} {safePage} {t("documents.pagination.of")} {totalPages}
              </p>
              <div className="flex items-center gap-2">
                {paginationPages.map((paginationItem, index) =>
                  paginationItem === 0 ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-greyscale-500">
                      ...
                    </span>
                  ) : (
                    <button
                      key={paginationItem}
                      type="button"
                      onClick={() => setPage(paginationItem)}
                      className={`size-9 rounded-lg border text-sm transition ${
                        safePage === paginationItem
                          ? "border-[#3B4BDC] bg-[#3B4BDC] text-white"
                          : "border-greyscale-300 text-greyscale-700 hover:bg-greyscale-100"
                      }`}
                    >
                      {paginationItem}
                    </button>
                  ),
                )}
              </div>
            </div>
          </>
        )}
      </Panel>
    </div>
  );
};


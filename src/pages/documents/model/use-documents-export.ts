import type { DocumentItem } from "@/entities/document";

type ExportableDocument = Pick<DocumentItem, "createdAt" | "title" | "type" | "status">;

type UseDocumentsExportParams = {
  getTypeLabel: (value: DocumentItem["type"]) => string;
  getStatusLabel: (value: DocumentItem["status"]) => string;
};

const escapeCsvCell = (value: string) => `"${value.replaceAll(`"`, `""`)}"`;

const createCsvRow = (document: ExportableDocument, getTypeLabel: UseDocumentsExportParams["getTypeLabel"], getStatusLabel: UseDocumentsExportParams["getStatusLabel"]) =>
  [document.createdAt, document.title, getTypeLabel(document.type), getStatusLabel(document.status)]
    .map(escapeCsvCell)
    .join(",");

const downloadCsv = (rows: string[], fileName: string) => {
  const csvHeader = ["Дата", "Название", "Тип", "Статус"].join(",");
  const csvContent = [csvHeader, ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
};

export const useDocumentsExport = ({ getStatusLabel, getTypeLabel }: UseDocumentsExportParams) => {
  const exportDocuments = (documents: ExportableDocument[]) => {
    if (documents.length === 0) {
      return;
    }

    const rows = documents.map((item) => createCsvRow(item, getTypeLabel, getStatusLabel));
    downloadCsv(rows, "documents-export.csv");
  };

  const exportSingleDocument = (document: ExportableDocument) => {
    const row = createCsvRow(document, getTypeLabel, getStatusLabel);
    const fileName = `${document.title.replace(/\s+/g, "-").toLowerCase()}-export.csv`;
    downloadCsv([row], fileName);
  };

  return { exportDocuments, exportSingleDocument };
};


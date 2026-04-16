export const DOCUMENT_TYPES = [
  "Акт выполненных работ",
  "Финансовый акт",
  "Договор поставки",
  "Служебная записка",
  "Приказ по персоналу",
] as const;

export type DocumentType = (typeof DOCUMENT_TYPES)[number];

export const DOCUMENT_STATUSES = ["Активный", "В архиве", "На согласовании"] as const;
export type DocumentStatus = (typeof DOCUMENT_STATUSES)[number];

export interface DocumentItem {
  id: string;
  title: string;
  type: DocumentType;
  status: DocumentStatus;
  createdAt: string;
}


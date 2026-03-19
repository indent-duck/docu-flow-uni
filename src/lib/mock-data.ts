export type RequestStatus = "pending_payment" | "processing" | "ready" | "completed";

export interface DocumentRequest {
  id: string;
  referenceId: string;
  documentType: string[];
  purpose: string;
  quantity: number;
  status: RequestStatus;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export const DOCUMENT_TYPES = [
  "Transcript of Records",
  "Certificate of Grades",
  "Diploma",
  "Good Moral Certificate",
  "Certificate of Enrollment",
  "Honorable Dismissal",
] as const;

export const PURPOSES = [
  "Employment",
  "Further Studies",
  "Board Exam",
  "Scholarship",
  "Personal Records",
  "Other",
] as const;

export const PRICE_PER_DOCUMENT = 100;

export const mockRequests: DocumentRequest[] = [
  {
    id: "1",
    referenceId: "RT-8842",
    documentType: ["Transcript of Records"],
    purpose: "Employment",
    quantity: 2,
    status: "processing",
    amount: 200,
    createdAt: "2026-03-17T08:30:00Z",
    updatedAt: "2026-03-18T14:20:00Z",
  },
  {
    id: "2",
    referenceId: "RT-8801",
    documentType: ["Good Moral Certificate"],
    purpose: "Further Studies",
    quantity: 1,
    status: "ready",
    amount: 100,
    createdAt: "2026-03-10T10:00:00Z",
    updatedAt: "2026-03-15T09:00:00Z",
  },
  {
    id: "3",
    referenceId: "RT-8790",
    documentType: ["Certificate of Grades", "Certificate of Enrollment"],
    purpose: "Scholarship",
    quantity: 1,
    status: "completed",
    amount: 200,
    createdAt: "2026-03-01T12:00:00Z",
    updatedAt: "2026-03-05T16:00:00Z",
  },
];

export function getStatusLabel(status: RequestStatus): string {
  const labels: Record<RequestStatus, string> = {
    pending_payment: "Pending Payment",
    processing: "Processing",
    ready: "Ready to Claim",
    completed: "Completed",
  };
  return labels[status];
}

export function getStatusStep(status: RequestStatus): number {
  const steps: Record<RequestStatus, number> = {
    pending_payment: 0,
    processing: 1,
    ready: 2,
    completed: 3,
  };
  return steps[status];
}

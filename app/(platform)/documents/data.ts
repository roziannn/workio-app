export type DocumentStatus = "Draft" | "Submitted" | "Approved" | "Rejected";

export interface Document {
  id: number;
  docNo: string;
  title: string;
  project: string;
  status: DocumentStatus;
  createdBy: string;
  submittedDate?: string;
  lastUpdated: string;
  reviewer?: string;
}

export const documentsData: Document[] = Array.from({ length: 72 }, (_, i) => {
  const users = ["Firda Rosiana", "Andi Pratama", "Siti Aisyah", "Budi Santoso", "Dewi Lestari", "Rizky Hidayat", "Nina Puspita"];
  const titles = ["Project Brief", "Contract Client", "Design Mockup", "Budget Proposal", "Meeting Notes", "Test Plan"];
  const projects = ["PRJ-WEB-202509-001", "PRJ-MOB-202509-002", "PRJ-INT-202509-003"];
  const status: DocumentStatus[] = ["Draft", "Submitted", "Approved", "Rejected"];

  const user = users[i % users.length];
  const title = titles[i % titles.length];
  const project = projects[i % projects.length];
  const docStatus = status[i % status.length];
  const reviewer = docStatus === "Approved" || docStatus === "Rejected" ? users[(i + 1) % users.length] : undefined;
  const submittedDate = docStatus !== "Draft" ? `2025-09-${String(10 + (i % 20)).padStart(2, "0")}` : undefined;
  const lastUpdated = `2025-09-${String(10 + (i % 20)).padStart(2, "0")}`;

  return {
    id: i + 1,
    docNo: `DOC-2025-${String(i + 1).padStart(3, "0")}`,
    title,
    project,
    status: docStatus,
    createdBy: user,
    submittedDate,
    lastUpdated,
    reviewer,
  };
});

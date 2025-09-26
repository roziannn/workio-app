export interface Task {
  id: number;
  title: string;
  createdAt: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  status: "In Progress" | "Completed";
  assignee: string;
  project: number | null;
  notes: string;
}

export const tasksData: Task[] = [
  { id: 1, title: "Install Figma on Windows Server", createdAt: "2024-08-22", dueDate: "2024-09-23", priority: "High", status: "In Progress", assignee: "Juliente", project: 1, notes: "Install latest Figma version" },
  { id: 2, title: "Download RAM Upgrade to 1280MBps", createdAt: "2024-08-22", dueDate: "2024-09-25", priority: "Medium", status: "Completed", assignee: "Milanio", project: 2, notes: "Check compatibility with server" },
  { id: 3, title: "Payment Settings for Kios Apps", createdAt: "2024-08-22", dueDate: "2024-09-26", priority: "Low", status: "In Progress", assignee: "Amaratki", project: 3, notes: "" },
  { id: 4, title: "Deploy New API Endpoint", createdAt: "2024-08-25", dueDate: "2024-09-28", priority: "High", status: "In Progress", assignee: "Nadia", project: 3, notes: "Use version v2.1" },
  { id: 5, title: "UI Testing for Customer Portal", createdAt: "2024-08-26", dueDate: "2024-09-28", priority: "Medium", status: "Completed", assignee: "Daniel", project: 1, notes: "" },
  { id: 6, title: "Create Database Backup Plan", createdAt: "2024-08-27", dueDate: "2024-09-29", priority: "High", status: "In Progress", assignee: "Alicia", project: 2, notes: "Schedule daily backups" },
  { id: 7, title: "Optimize Mobile App Performance", createdAt: "2024-08-28", dueDate: "2024-10-01", priority: "Low", status: "Completed", assignee: "Lukas", project: 2, notes: "" },
  { id: 8, title: "Setup CI/CD Pipeline", createdAt: "2024-08-28", dueDate: "2024-10-02", priority: "High", status: "In Progress", assignee: "Maria", project: 3, notes: "Integrate with GitHub Actions" },
  { id: 9, title: "Security Audit for APIs", createdAt: "2024-08-29", dueDate: "2024-10-04", priority: "Medium", status: "Completed", assignee: "Sofia", project: 3, notes: "Check OAuth2 flows" },
  { id: 10, title: "Migrate Legacy System to Cloud", createdAt: "2024-08-30", dueDate: "2024-10-05", priority: "High", status: "In Progress", assignee: "Armand", project: 2, notes: "" },
  { id: 11, title: "Refactor Authentication Module", createdAt: "2024-09-01", dueDate: "2024-10-07", priority: "Medium", status: "In Progress", assignee: "Rizky", project: 1, notes: "Use JWT tokens" },
  { id: 12, title: "Prepare Monthly Project Report", createdAt: "2024-09-02", dueDate: "2024-10-08", priority: "Low", status: "Completed", assignee: "Dewi", project: 1, notes: "Include all milestones" },
];

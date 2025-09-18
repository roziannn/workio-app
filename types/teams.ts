export interface Task {
  id: number;
  title: string;
  status: "Completed" | "In Progress" | "Pending";
}

export interface HistoryItem {
  id: number;
  type: "Unit Change" | "Status Update";
  from: string;
  to: string;
  date: string;
}

export interface Teams {
  id: number;
  name: string;
  email: string;
  role: string;
  unit: string;
  registeredAt: string;
  status: "Active" | "Inactive";
  tasks: Task[];
  history: HistoryItem[];
}

export const mst_categoryProjects = ["Web Application", "Mobile Application", "Internal Tool"] as const;

export type CategoryName = (typeof mst_categoryProjects)[number];

export const categoryProjects = mst_categoryProjects.map((categoryProject, index) => ({
  id: index + 1,
  name: categoryProject,
  status: "Active" as "Active" | "Inactive",
  icon: (index === 0 ? "Monitor" : index === 1 ? "Smartphone" : "Wrench") as "Monitor" | "Smartphone" | "Wrench",
  createdAt: new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
  createdBy: `System Workio`,
}));

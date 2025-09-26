import { mst_categoryProjects } from "@/data/dummy/mst_categoryProjects";

export type CategoryName = (typeof mst_categoryProjects)[number];

export function generateProjectNo(category: CategoryName, sequence: number = 1) {
  const prefixMap: Record<CategoryName, string> = {
    "Web Application": "WEB",
    "Mobile Application": "MOB",
    "Internal Tool": "INT",
  };

  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");

  const seq = String(sequence).padStart(3, "0");

  return `${prefixMap[category]}-${yyyy}${mm}-${seq}`;
}

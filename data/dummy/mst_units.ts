export const mst_units = [
  { id: 1, name: "Frontend Developer" },
  { id: 2, name: "Backend Developer" },
  { id: 3, name: "Full-stack Developer" },
  { id: 4, name: "Product Design" },
  { id: 5, name: "DevOps & Infrastructure" },
  { id: 6, name: "Data & Analytics" },
  { id: 7, name: "Project & Product Management" },
];

export const units = mst_units.map((unit, index) => ({
  id: index + 1,
  unitName: unit,
  status: "Active",
  createdAt: new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
  createdBy: `User${Math.floor(Math.random() * 10) + 1}`,
}));

export const mst_roles = ["Officer", "Administrator", "Manager", "Lead", "Developer/Engineer", "Designer/Creative"];

export const roles = mst_roles.map((role, index) => ({
  id: index + 1,
  roleName: role,
  status: "Active",
  createdAt: new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
  createdBy: `User${Math.floor(Math.random() * 10) + 1}`,
}));

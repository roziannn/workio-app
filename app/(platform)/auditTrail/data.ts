export interface AuditTrail {
  id: number;
  user: string;
  action: string;
  module: string;
  timestamp: string;
  status: "Success" | "Failed";
}

export const auditTrailData: AuditTrail[] = Array.from({ length: 58 }, (_, i) => {
  const users = ["Firda Rosiana", "Andi Pratama", "Siti Aisyah", "Budi Santoso", "Dewi Lestari", "Rizky Hidayat", "Nina Puspita"];
  const actions = ["Login", "Logout", "Buat Tugas", "Perbarui Tugas", "Review Dokumen", "Approve Dokumen", "Hapus Dokumen", "Perbarui Proyek"];
  const modules = ["Overview", "Master", "Teams", "Tasks", "Projects", "Documents", "AuditTrail", "Settings", "Logout"];
  const status: ("Success" | "Failed")[] = ["Success", "Failed"];

  const randomUser = users[i % users.length];
  const randomAction = actions[i % actions.length];
  const randomModule = modules[i % modules.length];
  const randomStatus = status[i % status.length];
  const timestamp = `2025-09-${String(1 + (i % 30)).padStart(2, "0")} ${String(8 + (i % 10)).padStart(2, "0")}:${String(15 + (i % 45)).padStart(2, "0")}`;

  return {
    id: i + 1,
    user: randomUser,
    action: randomAction,
    module: randomModule,
    timestamp,
    status: randomStatus,
  };
});

export function generateProjectNo(category: "Web App" | "Mobile App" | "Internal Tool", sequence: number = 1) {
  const prefixMap: Record<string, string> = {
    "Web App": "WEB",
    "Mobile App": "MOB",
    "Internal Tool": "INT",
  };

  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0"); // bulan 01-12

  const seq = String(sequence).padStart(3, "0");

  return `PRJ-${prefixMap[category]}-${yyyy}${mm}-${seq}`;
}

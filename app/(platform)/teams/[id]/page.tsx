"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Teams } from "@/types/teams";
import { CheckCircle2, Loader2, Clock } from "lucide-react";
import InputField from "@/components/InputField";
import ToggleSwitch from "@/components/Toggle";

const teamsData: Teams[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Manager",
    unit: "Frontend Developer",
    registeredAt: "2024-01-12",
    status: "Active",
    tasks: [
      { id: 101, title: "Build dashboard", status: "Completed" },
      { id: 102, title: "Update API integration", status: "In Progress" },
      { id: 103, title: "Design new icon set", status: "Pending" },
    ],
    history: [
      { id: 1, type: "Unit Change", from: "Backend Engineer", to: "Frontend Developer", date: "2024-02-01" },
      { id: 2, type: "Status Update", from: "Inactive", to: "Active", date: "2024-01-12" },
    ],
  },
];

const statusStyles: Record<string, string> = {
  Completed: "bg-green-100 text-green-800",
  "In Progress": "bg-yellow-100 text-yellow-800",
  Pending: "bg-gray-100 text-gray-800",
};

export default function EditTeamPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [team, setTeam] = useState<Teams | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [unit, setUnit] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  useEffect(() => {
    const found = teamsData.find((t) => t.id === id);
    if (found) {
      setTeam(found);
      setName(found.name);
      setEmail(found.email);
      setRole(found.role);
      setUnit(found.unit);
      setStatus(found.status as "Active" | "Inactive");
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ id, name, email, role, unit, status });
    alert("Data updated!");
    router.push("/teams");
  };

  if (!team) return <p className="p-6">Team not found</p>;

  // Hitung status tasks
  const taskCounts = team.tasks.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left: Form */}
      <div className="lg:col-span-6 bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Edit Team Member</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Name" value={name} onChange={setName} placeholder="Enter name" />
          <InputField label="Email" value={email} onChange={setEmail} placeholder="Enter email" type="email" />
          <InputField label="Role" value={role} onChange={setRole} placeholder="Enter role" />
          <InputField label="Unit" value={unit} onChange={setUnit} placeholder="Enter unit" />

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as "Active" | "Inactive")} className="mt-1 w-full border px-3 py-2 rounded-lg focus:outline-none focus:border-red-500">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <button type="submit" className="btn-primary">
            Save Changes
          </button>
        </form>
      </div>

      {/* Right: History & Tasks */}
      <div className="lg:col-span-6 space-y-6">
        {/* Tasks Section */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 flex items-center justify-between">
            Tasks
            <span className="text-sm text-gray-500">
              Completed: {taskCounts["Completed"] || 0} | In Progress: {taskCounts["In Progress"] || 0} | Pending: {taskCounts["Pending"] || 0}
            </span>
          </h3>
          <ul className="space-y-2">
            {team.tasks.map((t) => (
              <li key={t.id} className="flex items-center justify-between border p-3 rounded-lg hover:bg-gray-50 transition">
                <p className="font-medium">{t.title}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${statusStyles[t.status]}`}>
                  {t.status === "Completed" ? <CheckCircle2 className="inline mr-1 h-3 w-3" /> : t.status === "In Progress" ? <Loader2 className="inline mr-1 h-3 w-3 animate-spin" /> : <Clock className="inline mr-1 h-3 w-3" />}
                  {t.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* History Section */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">History</h3>
          <ul className="space-y-2">
            {team.history?.map((h) => (
              <li key={h.id} className="border-l-4 border-blue-500 pl-3 py-2 bg-gray-50 rounded-md">
                <p className="font-medium">{h.type}</p>
                <p>
                  {h.from} → {h.to}
                </p>
                <p className="text-xs text-gray-400">{h.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

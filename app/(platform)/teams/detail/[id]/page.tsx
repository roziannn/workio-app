"use client";

import { useParams } from "next/navigation";
import { Teams } from "@/types/teams";
import { CheckCircle2, Clock, Globe, PlayCircle, Smartphone, Wrench } from "lucide-react";
import InputField from "@/components/InputField";
import { formatDate } from "@/utils/dateHelper";

const teamsData: Teams[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "0897818820",
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

export default function DetailTeamPage() {
  const params = useParams();
  const id = Number(params.id);

  const team = teamsData.find((t) => t.id === id) || null;

  if (!team) return <p className="p-6">Team not found</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-6 bg-white p-6 rounded-3xl">
        <h2 className="text-xl font-semibold mb-1">Team Detail</h2>
        <p className="text-sm text-gray-500 mb-6">View the details for this team member.</p>
        <div className="space-y-4">
          <InputField label="Name" value={team.name} onChange={() => {}} readonly />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-0">
            <InputField label="Phone" value={team.phone} onChange={() => {}} readonly />
            <InputField label="Email" value={team.email} onChange={() => {}} readonly />
          </div>
          <InputField label="Role" value={team.role} onChange={() => {}} readonly />
          <InputField label="Unit" value={team.unit} onChange={() => {}} readonly />
        </div>
        <div className="p-2">
          <h3 className="text-xl font-semibold mb-4">History</h3>
          <ul className="space-y-4">
            {team.history?.map((h) => (
              <li key={h.id} className="relative pl-6 border-l-2 border-slate-400">
                <span className="absolute -left-2 top-1 w-3 h-3 rounded-full bg-slate-400"></span>

                <div className="flex justify-between items-center mb-1">
                  <p className="font-medium text-sm text-gray-800">{h.type}</p>
                  <p className="text-sm text-gray-400">{formatDate(h.date)}</p>
                </div>

                <p className="text-gray-600 text-sm">
                  from {h.from} to {h.to}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="lg:col-span-6 space-y-6">
        <div className="bg-white p-6 rounded-3xl">
          <h3 className="text-xl font-semibold mb-1 flex items-center justify-between">Tasks</h3>
          <p className="text-sm text-gray-500 mb-6">View the details for this team member.</p>

          <ul className="space-y-3">
            {team.tasks.map((t) => (
              <li key={t.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition">
                <div className="flex items-center gap-3">
                  {t.status === "Completed" && <CheckCircle2 className="text-green-500 w-5 h-5" />}
                  {t.status === "In Progress" && <PlayCircle className="text-yellow-500 w-5 h-5 animate-pulse" />}
                  {t.status === "Pending" && <Clock className="text-gray-400 w-5 h-5" />}
                  <p className="font-medium text-gray-800">{t.title}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${t.status === "Completed" ? "bg-green-100 text-green-700" : t.status === "In Progress" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600"}`}>
                  {t.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-3xl">
          <h3 className="text-xl font-semibold mb-1 flex items-center justify-between">Projects</h3>
          <p className="text-sm text-gray-500 mb-6">Projects handled by this team member.</p>
          <ul className="space-y-3">
            <li className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition">
              <div className="flex items-center gap-3">
                <Globe className="text-blue-500 w-5 h-5" />
                <p className="font-medium text-gray-800">Customer Portal Revamp</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">Completed</span>
            </li>

            <li className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition">
              <div className="flex items-center gap-3">
                <Smartphone className="text-purple-500 w-5 h-5" />
                <p className="font-medium text-gray-800">E-Commerce Mobile Shop</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">In Progress</span>
            </li>

            <li className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition">
              <div className="flex items-center gap-3">
                <Wrench className="text-orange-500 w-5 h-5" />
                <p className="font-medium text-gray-800">Payment Gateway API</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-600">Pending</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

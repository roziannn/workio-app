"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Flag } from "lucide-react";
import InputField from "@/components/InputField";
import { formatDate } from "@/utils/dateHelper";
import SkeletonEditForm from "@/components/Skeleton";

import { getUserById } from "@/data/dummy/mappers/userMapper";
import { UserData } from "@/data/dummy/user";
import Badge from "@/components/Badge";

export default function DetailTeamPage() {
  const params = useParams();
  const id = Number(params.id);

  const [team, setTeam] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const user = getUserById(id);
    if (user) {
      setTeam(user);
    }
    setIsLoading(false);
  }, [id]);

  if (isLoading) return <SkeletonEditForm />;
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

        <div className="p-2 mt-6">
          <h3 className="text-xl font-semibold mb-4">History</h3>
          {team.history && team.history.length > 0 ? (
            <ul className="space-y-4">
              {team.history.map((h) => (
                <li key={h.id} className="relative pl-6 border-l-2 border-slate-200">
                  <span className="absolute -left-2 top-1 w-3 h-3 rounded-full bg-slate-300"></span>
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium text-sm text-gray-800">{h.type}</p>
                    <p className="text-xs text-gray-500">{formatDate(h.date)}</p>
                  </div>
                  <p className="text-sm">
                    from {h.from} to {h.to}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No history available.</p>
          )}
        </div>
      </div>

      <div className="lg:col-span-6 space-y-6">
        <div className="bg-white p-6 rounded-3xl">
          <h3 className="text-xl font-semibold mb-1 flex items-center justify-between">Tasks In Progress</h3>
          <p className="text-sm text-gray-500 mb-6">View the tasks for this team member.</p>
          {team.tasks && team.tasks.length > 0 ? (
            <ul className="space-y-3">
              <ul className="space-y-3">
                {team.tasks.map((t) => (
                  <li key={t.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition">
                    <div className="flex items-center gap-3">
                      <p className="text-sm">{t.title}</p>
                    </div>
                    <Badge colorClass={t.priority === "High" ? "bg-red-100 text-red-700" : t.priority === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"} icon={<Flag className="w-3.5 h-3.5" />}>
                      {t.priority}
                    </Badge>
                  </li>
                ))}
              </ul>
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No tasks assigned.</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-3xl">
          <h3 className="text-xl font-semibold mb-1 flex items-center justify-between">Documents</h3>
          <p className="text-sm text-gray-500 mb-6">Documents handled by {team.name}</p>
          <p className="text-sm">No document data related.</p>
        </div>
      </div>
    </div>
  );
}

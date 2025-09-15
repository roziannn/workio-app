"use client";
import { useState } from "react";
import { Flag, User, Trash2, Pencil, CheckCircle2, Clock, LucideEye } from "lucide-react";
import DataListHeader from "@/components/DataListHeader";
import { formatDate } from "@/utils/dateHelper";
import Badge from "@/components/Badge";
import Pagination from "@/components/Pagination";

export default function TasksPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const tasks = [
    { id: 1, title: "Install Figma on Windows Server", createdAt: "2024-08-22", dueDate: "2024-05-23", priority: "High", status: "In Progress", assignee: "Juliente" },
    { id: 2, title: "Download RAM Upgrade to 1280MBps", createdAt: "2024-08-22", dueDate: "2024-05-23", priority: "Medium", status: "Completed", assignee: "Milanio" },
    { id: 3, title: "Payment Settings for Kios Apps", createdAt: "2024-08-22", dueDate: "2024-05-23", priority: "Low", status: "In Progress", assignee: "Amaratki" },
    { id: 4, title: "Deploy New API Endpoint", createdAt: "2024-08-25", dueDate: "2024-08-30", priority: "High", status: "In Progress", assignee: "Nadia" },
  ];

  const priorityStyles: Record<string, string> = {
    High: "bg-red-100 text-red-600 border-red-500",
    Medium: "bg-yellow-100 text-yellow-600 border-yellow-500",
    Low: "bg-purple-100 text-purple-600 border-purple-500",
  };

  const statusStyles: Record<string, string> = {
    "In Progress": "bg-blue-100 text-blue-600 border-blue-500",
    Completed: "bg-green-100 text-green-600 border-green-500",
  };

  const filterOptions = ["All", "In Progress", "Completed"];
  const filteredTasks = statusFilter === "All" ? tasks : tasks.filter((t) => t.status === statusFilter);

  // Pagination logic
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const paginatedTasks = filteredTasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-12 bg-white p-4 sm:p-6 rounded-3xl flex flex-col space-y-1">
        <DataListHeader title="All Tasks" total={filteredTasks.length} filterOptions={filterOptions} selectedFilter={statusFilter} onFilterChange={setStatusFilter} />

        {paginatedTasks.map((task) => (
          <div key={task.id} className="p-4 sm:p-6 hover:bg-slate-50 transition">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-semibold text-slate-800 hover:text-slate-900 cursor-pointer">{task.title}</h2>
              <div className="flex space-x-2">
                <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-gray-700 flex items-center justify-center">
                  <LucideEye size={16} />
                </button>
                <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-gray-700 flex items-center justify-center">
                  <Pencil size={16} />
                </button>
                <button className="p-2 rounded-lg bg-slate-100 hover:bg-red-500 text-gray-700 hover:text-white flex items-center justify-center">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-500 mb-4">Created at {formatDate(task.createdAt)}</p>

            <div className="flex items-center space-x-2 text-sm">
              <Badge colorClass={priorityStyles[task.priority]} icon={<Flag size={14} />}>
                {task.priority}
              </Badge>
              <Badge colorClass="text-red-500 border-none bg-transparent" icon={<Clock size={14} />}>
                {formatDate(task.dueDate)}
              </Badge>
              <Badge colorClass={statusStyles[task.status]} icon={task.status === "Completed" ? <CheckCircle2 size={14} /> : <Clock size={14} />}>
                {task.status}
              </Badge>
              <Badge colorClass="text-gray-700 border-none bg-transparent" icon={<User size={14} />}>
                {task.assignee}
              </Badge>
            </div>
          </div>
        ))}

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}

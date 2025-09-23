"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Eye, Pencil, CheckCircle2, XCircle, Monitor, Smartphone, Wrench, Flag } from "lucide-react";
import DataListHeader from "@/components/DataListHeader";
import Badge from "@/components/Badge";
import { formatDate } from "@/utils/dateHelper";
import Pagination from "@/components/Pagination";
import { projectsData } from "@/data/dummy/projects";

interface Project {
  id: number;
  projectNo: string;
  name: string;
  description: string;
  owner: string;
  category: "Web App" | "Mobile App" | "Internal Tool";
  startDate: string;
  endDate: string;
  status: "Active" | "Inactive" | "Completed";
  client: string;
  budget: number;
  progress: number;
  priority: "High" | "Medium" | "Low";
}

export default function ProjectsPage() {
  const router = useRouter();
  const projects = projectsData;

  const statusStyles: Record<Project["status"], string> = {
    Active: "bg-green-100 text-green-700 border-green-500",
    Inactive: "bg-red-100 text-red-700 border-red-500",
    Completed: "bg-blue-100 text-blue-700 border-blue-500",
  };

  const priorityStyles: Record<Project["priority"], string> = {
    High: "bg-red-100 text-red-700 border-red-500",
    Medium: "bg-yellow-100 text-yellow-700 border-yellow-500",
    Low: "bg-green-100 text-green-700 border-green-500",
  };

  const statusOptions = ["All", "Active", "Inactive", "Completed"];

  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 10;

  const filteredProjects = projects.filter((p) => {
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = q === "" || p.name.toLowerCase().includes(q) || p.projectNo.toLowerCase().includes(q) || p.client.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  const handleAddNewClick = () => {
    router.push("/projects/create");
  };

  const handleDetailClick = (projectNo: string) => {
    router.push(`/projects/detail/${projectNo}`);
  };

  const handleEditClick = (projectNo: string) => {
    router.push(`/projects/edit/${projectNo}`);
  };

  const getCategoryIcon = (category: Project["category"]) => {
    switch (category) {
      case "Web App":
        return (
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
            <Monitor className="h-5 w-5 text-blue-600" />
          </div>
        );
      case "Mobile App":
        return (
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
            <Smartphone className="h-5 w-5 text-green-500" />
          </div>
        );
      case "Internal Tool":
        return (
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
            <Wrench className="h-5 w-5 text-purple-600" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-12 bg-white p-4 sm:p-6 rounded-3xl flex flex-col">
        <DataListHeader
          title="All Projects"
          total={filteredProjects.length}
          filterOptions={statusOptions}
          selectedFilter={statusFilter}
          onAddNew={handleAddNewClick}
          onFilterChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
          onSearch={(q) => {
            setSearchQuery(q);
            setCurrentPage(1);
          }}
        />

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Project No.</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Client</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Budget</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">DueDate</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Progress</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Priority</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700 sticky right-0 bg-white z-10">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProjects.map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-3">
                    {getCategoryIcon(project.category)}
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-800">{project.name}</span>
                      <span className="text-xs text-gray-500 w-48 truncate">{project.description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-700">{project.projectNo}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-700">{project.client}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-700">{project.budget.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDate(project.endDate)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <p className="text-sm font-medium text-gray-700">{project.progress}%</p>
                    <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Badge colorClass={priorityStyles[project.priority]} icon={<Flag size={12} />}>
                      {project.priority}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Badge
                      colorClass={statusStyles[project.status]}
                      icon={project.status === "Active" ? <CheckCircle2 className="h-3 w-3" /> : project.status === "Inactive" ? <XCircle className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
                    >
                      {project.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right flex justify-end space-x-2 sticky right-0 bg-white z-10">
                    <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-gray-700" onClick={() => handleDetailClick(project.projectNo)}>
                      <Eye size={16} />
                    </button>
                    <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-gray-700 flex items-center justify-center" onClick={() => handleEditClick(project.projectNo)}>
                      <Pencil size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {currentProjects.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Eye, CheckCircle2, XCircle, Monitor, Smartphone, Wrench, MoreHorizontal, Edit3 } from "lucide-react";
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
  category: "Web Application" | "Mobile Application" | "Internal Tool";
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

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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
      case "Web Application":
        return (
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
            <Monitor className="h-5 w-5 text-slate-500" />
          </div>
        );
      case "Mobile Application":
        return (
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
            <Smartphone className="h-5 w-5 text-slate-500" />
          </div>
        );
      case "Internal Tool":
        return (
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
            <Wrench className="h-5 w-5 text-slate-500" />
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
            <thead className="bg-slate-100">
              <tr>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Project No.</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Client</th>
                {/* <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Budget</th> */}
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">DueDate</th>
                <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">Progress</th>
                {/* <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">Priority</th> */}
                <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
                <th className="px-5 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProjects.map((project) => (
                <tr key={project.id} className="mb-2 border-b border-slate-200">
                  <td className="px-5 py-4 whitespace-nowrap flex items-center space-x-3">
                    {getCategoryIcon(project.category)}
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-800">{project.name}</span>
                      <span className="text-xs text-gray-500 w-48 truncate">{project.description}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-700">{project.projectNo}</p>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-700">{project.client}</p>
                  </td>
                  {/* <td className="px-5 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-700">{project.budget.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</p>
                  </td> */}
                  <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">{formatDate(project.endDate)}</td>
                  <td className="px-5 py-4 whitespace-nowrap text-center">
                    <p className="text-sm font-medium text-gray-700">{project.progress}%</p>
                    <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                    </div>
                  </td>
                  {/* <td className="px-5 py-4 whitespace-nowrap text-center">
                    <Badge colorClass={priorityStyles[project.priority]} icon={<Flag size={12} />}>
                      {project.priority}
                    </Badge>
                  </td> */}
                  <td className="px-5 py-4 whitespace-nowrap text-center">
                    <Badge
                      colorClass={statusStyles[project.status]}
                      icon={project.status === "Active" ? <CheckCircle2 className="h-3 w-3" /> : project.status === "Inactive" ? <XCircle className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
                    >
                      {project.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap text-left relative">
                    <button className="p-2 rounded-lg hover:bg-slate-200 text-gray-700" onClick={() => setOpenDropdown(openDropdown === project.projectNo ? null : project.projectNo)}>
                      <MoreHorizontal size={16} />
                    </button>

                    {openDropdown === project.projectNo && (
                      <div className="absolute left-0 mt-2 w-28 bg-white border border-gray-200 rounded-lg shadow-sm z-10 flex flex-col">
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                          onClick={() => {
                            handleEditClick(project.projectNo);
                            setOpenDropdown(null);
                          }}
                        >
                          <Edit3 size={14} />
                          <span className="ml-2">Edit</span>
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                          onClick={() => {
                            handleDetailClick(project.projectNo);
                            setOpenDropdown(null);
                          }}
                        >
                          <Eye size={14} />
                          <span className="ml-2">Detail</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {currentProjects.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-5 py-4 text-center text-gray-500">
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

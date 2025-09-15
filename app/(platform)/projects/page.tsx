"use client";
import { useState } from "react";
import { Eye, Pencil, CheckCircle2, XCircle, Monitor, Smartphone, Wrench } from "lucide-react";
import DataListHeader from "@/components/DataListHeader";
import Badge from "@/components/Badge";
import { formatDate } from "@/utils/dateHelper";
import Pagination from "@/components/Pagination";

interface Project {
  id: number;
  name: string;
  owner: string;
  category: "Web App" | "Mobile App" | "Internal Tool";
  startDate: string;
  endDate: string;
  status: "Active" | "Inactive" | "Completed";
}

export default function ProjectsPage() {
  const projects: Project[] = [
    {
      id: 1,
      name: "Customer Portal Revamp",
      owner: "Alice Johnson",
      category: "Web App",
      startDate: "2024-01-12",
      endDate: "2024-03-12",
      status: "Active",
    },
    {
      id: 2,
      name: "E-Commerce Mobile Shop",
      owner: "Bob Smith",
      category: "Mobile App",
      startDate: "2024-02-01",
      endDate: "2024-04-15",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Spring Marketing Campaign",
      owner: "Charlie Brown",
      category: "Mobile App",
      startDate: "2024-03-01",
      endDate: "2024-03-30",
      status: "Completed",
    },
    {
      id: 4,
      name: "Payment Gateway API",
      owner: "Diana Prince",
      category: "Web App",
      startDate: "2024-03-05",
      endDate: "2024-06-10",
      status: "Active",
    },
    {
      id: 5,
      name: "Design System Toolkit",
      owner: "Ethan Hunt",
      category: "Internal Tool",
      startDate: "2024-04-01",
      endDate: "2024-06-01",
      status: "Inactive",
    },
  ];

  const statusStyles: Record<Project["status"], string> = {
    Active: "bg-green-100 text-green-700 border-green-500",
    Inactive: "bg-red-100 text-red-700 border-red-500",
    Completed: "bg-blue-100 text-blue-700 border-blue-500",
  };

  const statusOptions = ["All", "Active", "Inactive", "Completed"];

  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");

  const itemsPerPage = 5;

  const filteredProjects = projects.filter((p) => statusFilter === "All" || p.status === statusFilter);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  const getCategoryIcon = (category: Project["category"]) => {
    switch (category) {
      case "Web App":
        return (
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
            <Monitor className="h-5 w-5 text-blue-600" />
          </div>
        );
      case "Mobile App":
        return (
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-100">
            <Smartphone className="h-5 w-5 text-yellow-600" />
          </div>
        );
      case "Internal Tool":
        return (
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100">
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
          onFilterChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
        />

        {/* Projects table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Project</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">PIC</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Start</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">End</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProjects.map((project) => (
                <tr key={project.id} className="bg-white hover:bg-gray-50 rounded-2xl mb-2">
                  <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-3">
                    {getCategoryIcon(project.category)}
                    <span className="text-sm font-semibold text-gray-800">{project.name}</span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-700">{project.owner}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDate(project.startDate)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDate(project.endDate)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Badge
                      colorClass={statusStyles[project.status]}
                      icon={project.status === "Active" ? <CheckCircle2 className="h-3 w-3" /> : project.status === "Inactive" ? <XCircle className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
                    >
                      {project.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right flex justify-end space-x-2">
                    <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-gray-700">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-gray-700">
                      <Pencil size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}

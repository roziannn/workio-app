// ProjectsPage.tsx
"use client";
import { useState } from "react";
import { Eye, Pencil, CheckCircle2, XCircle, Monitor, Smartphone, Wrench, Flag } from "lucide-react";
import DataListHeader from "@/components/DataListHeader";
import Badge from "@/components/Badge";
import { formatDate } from "@/utils/dateHelper";
import Pagination from "@/components/Pagination";

interface Project {
  id: number;
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
  const projects: Project[] = [
    {
      id: 1,
      name: "Customer Portal Revamp",
      description: "Redesigning and rebuilding the user-facing customer portal with new features.",
      owner: "Alice Johnson",
      category: "Web App",
      startDate: "2024-01-12",
      endDate: "2024-03-12",
      status: "Active",
      client: "Global Solutions",
      budget: 50000,
      progress: 75,
      priority: "High",
    },
    {
      id: 2,
      name: "E-Commerce Mobile Shop",
      description: "Developing a new mobile application for our e-commerce platform.",
      owner: "Bob Smith",
      category: "Mobile App",
      startDate: "2024-02-01",
      endDate: "2024-04-15",
      status: "Inactive",
      client: "Retail Innovations",
      budget: 75000,
      progress: 20,
      priority: "Medium",
    },
    {
      id: 3,
      name: "Spring Marketing Campaign",
      description: "A new campaign to promote our spring product line through mobile channels.",
      owner: "Charlie Brown",
      category: "Mobile App",
      startDate: "2024-03-01",
      endDate: "2024-03-30",
      status: "Completed",
      client: "Internal Marketing",
      budget: 15000,
      progress: 100,
      priority: "Low",
    },
    {
      id: 4,
      name: "Payment Gateway API",
      description: "Building a secure and scalable API for all payment transactions.",
      owner: "Diana Prince",
      category: "Web App",
      startDate: "2024-03-05",
      endDate: "2024-06-10",
      status: "Active",
      client: "FinTech Partners",
      budget: 90000,
      progress: 50,
      priority: "High",
    },
    {
      id: 5,
      name: "Design System Toolkit",
      description: "Creating a comprehensive design system for consistent UI/UX across all products.",
      owner: "Ethan Hunt",
      category: "Internal Tool",
      startDate: "2024-04-01",
      endDate: "2024-06-01",
      status: "Inactive",
      client: "Internal R&D",
      budget: 20000,
      progress: 10,
      priority: "Low",
    },
  ];

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
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Client</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Budget</th>
                {/* <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Start</th> */}
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">DueDate</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Progress</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Priority</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700 sticky right-0 bg-white z-10">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProjects.map((project) => (
                <tr key={project.id} className="bg-white rounded-2xl mb-2">
                  <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-3">
                    {getCategoryIcon(project.category)}
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-800">{project.name}</span>
                      <span className="text-xs text-gray-500 w-48 truncate">{project.description}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-700">{project.client}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-700">{project.budget.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</p>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDate(project.startDate)}</td> */}
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

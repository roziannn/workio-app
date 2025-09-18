"use client";

import { useState } from "react";
import { Eye, Pencil, CheckCircle2, XCircle } from "lucide-react";
import DataListHeader from "@/components/DataListHeader";
import Badge from "@/components/Badge";
import Pagination from "@/components/Pagination";
import { Teams } from "@/types/teams";
import Link from "next/link";

export default function TeamsPage() {
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
      ],
      history: [
        { id: 1, type: "Unit Change", from: "Backend Engineer", to: "Frontend Developer", date: "2024-02-01" },
        { id: 2, type: "Status Update", from: "Inactive", to: "Active", date: "2024-01-12" },
      ],
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      role: "Staff",
      unit: "Backend Developer",
      registeredAt: "2024-02-08",
      status: "Inactive",
      tasks: [{ id: 103, title: "Fix login bug", status: "Pending" }],
      history: [
        { id: 1, type: "Unit Change", from: "Backend Engineer", to: "Frontend Developer", date: "2024-02-01" },
        { id: 2, type: "Status Update", from: "Inactive", to: "Active", date: "2024-01-12" },
      ],
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "Designer",
      unit: "UI/UX",
      registeredAt: "2024-02-20",
      status: "Active",
      tasks: [{ id: 104, title: "Design landing page", status: "Completed" }],
      history: [
        { id: 1, type: "Unit Change", from: "Backend Engineer", to: "Frontend Developer", date: "2024-02-01" },
        { id: 2, type: "Status Update", from: "Inactive", to: "Active", date: "2024-01-12" },
      ],
    },
  ];

  const personStatusStyles: Record<string, string> = {
    Active: "bg-green-100 text-green-700 border-green-500",
    Inactive: "bg-red-100 text-red-700 border-red-500",
  };

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredPeople = statusFilter === "All" ? teamsData : teamsData.filter((p) => p.status === statusFilter);
  const totalPages = Math.ceil(filteredPeople.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentPeople = filteredPeople.slice(indexOfFirst, indexOfLast);

  const filterOptions = ["All", "Active", "Inactive"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-12 bg-white p-4 sm:p-6 rounded-3xl flex flex-col">
        <DataListHeader
          title="All People"
          total={filteredPeople.length}
          filterOptions={filterOptions}
          selectedFilter={statusFilter}
          onFilterChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
          onAddNew={() => console.log("Add new clicked")}
          onImport={() => console.log("Import clicked")}
        />

        <div className="overflow-x-auto mt-4">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Job Level</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tasks</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPeople.map((person) => (
                <tr key={person.id} className="bg-white hover:bg-gray-50 rounded-2xl mb-2">
                  <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF0B55] to-[#FF8225] flex items-center justify-center text-white font-bold">{person.name.charAt(0)}</div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{person.name}</p>
                      <p className="text-xs text-gray-500">{person.email}</p>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-semibold text-gray-800">{person.role}</p>
                    <p className="text-xs text-gray-500">{person.unit}</p>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{person.tasks.length} assigned</td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Badge colorClass={personStatusStyles[person.status]} icon={person.status === "Active" ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}>
                      {person.status}
                    </Badge>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right flex justify-end space-x-2">
                    <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-gray-700">
                      <Eye size={16} />
                    </button>
                    <Link href={`/teams/${person.id}`}>
                      <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-gray-700">
                        <Pencil size={16} />
                      </button>
                    </Link>
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

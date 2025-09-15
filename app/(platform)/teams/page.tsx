"use client";

import { useState } from "react";
import { Eye, Pencil, CheckCircle2, XCircle } from "lucide-react";
import DataListHeader from "@/components/DataListHeader";
import Badge from "@/components/Badge";

export default function TeamsPage() {
  const people = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Manager", subRole: "Frontend Developer", registeredAt: "2024-01-12", status: "Active" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Staff", subRole: "Backend Developer", registeredAt: "2024-02-08", status: "Inactive" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Designer", subRole: "UI/UX", registeredAt: "2024-02-20", status: "Active" },
    { id: 4, name: "Diana Prince", email: "diana@example.com", role: "QA", subRole: "Engineer", registeredAt: "2024-03-05", status: "Inactive" },
    { id: 5, name: "Ethan Hunt", email: "ethan@example.com", role: "Marketing", subRole: "Specialist", registeredAt: "2024-03-15", status: "Active" },
  ];

  const personStatusStyles: Record<string, string> = {
    Active: "bg-green-100 text-green-700 border-green-500",
    Inactive: "bg-red-100 text-red-700 border-red-500",
  };

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredPeople = statusFilter === "All" ? people : people.filter((p) => p.status === statusFilter);
  const totalPages = Math.ceil(filteredPeople.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentPeople = filteredPeople.slice(indexOfFirst, indexOfLast);

  const filterOptions = ["All", "Active", "Inactive"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-12 bg-white p-4 sm:p-6 rounded-3xl flex flex-col">
        {/* Gunakan DataListHeader */}
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

        {/* People list */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
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
                    <p className="text-xs text-gray-500">{person.subRole}</p>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Badge colorClass={personStatusStyles[person.status]} icon={person.status === "Active" ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}>
                      {person.status}
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

        {/* Pagination */}
        <div className="flex items-center justify-end mt-6">
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button key={page} onClick={() => setCurrentPage(page)} className={`px-3 py-1 rounded-md text-sm font-medium transition ${currentPage === page ? "bg-[#FF0B55] text-white" : "bg-slate-100 text-gray-700 hover:bg-slate-200"}`}>
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

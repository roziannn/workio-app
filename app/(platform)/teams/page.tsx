"use client";

import { useState } from "react";
import { Eye, Pencil, CheckCircle, XCircle } from "lucide-react";

export default function TeamsPage() {
  const people = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Manager", subRole: "Frontend Developer", registeredAt: "2024-01-12", status: "Active" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Staff", subRole: "Backend Developer", registeredAt: "2024-02-08", status: "Inactive" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Designer", subRole: "UI/UX", registeredAt: "2024-02-20", status: "Active" },
    { id: 4, name: "Diana Prince", email: "diana@example.com", role: "QA", subRole: "Engineer", registeredAt: "2024-03-05", status: "Inactive" },
    { id: 5, name: "Ethan Hunt", email: "ethan@example.com", role: "Marketing", subRole: "Specialist", registeredAt: "2024-03-15", status: "Active" },
  ];

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(people.length / itemsPerPage);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentPeople = people.slice(indexOfFirst, indexOfLast);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-12 bg-white p-4 sm:p-6 rounded-3xl flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm sm:text-md font-semibold text-slate-600 flex flex-col">
            <span className="text-lg text-slate-900">All People</span>
            <p className="text-xs text-gray-500 font-normal">{people.length} total people</p>
          </h2>

          <div className="flex space-x-2">
            <button className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg bg-[#FF0B55] text-white text-xs sm:text-sm font-medium hover:bg-[#e00a4c] transition">+ Add New</button>
            <button className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg bg-slate-100 text-gray-700 text-xs sm:text-sm font-medium hover:bg-slate-200 transition">Import</button>
          </div>
        </div>

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
                  {/* Name + Avatar */}
                  <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF0B55] to-[#FF8225] flex items-center justify-center text-white font-bold">{person.name.charAt(0)}</div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{person.name}</p>
                      <p className="text-xs text-gray-500">{person.email}</p>
                    </div>
                  </td>

                  {/* Role + SubRole */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-semibold text-gray-800">{person.role}</p>
                    <p className="text-xs text-gray-500">{person.subRole}</p>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${person.status === "Active" ? "bg-green-100 text-green-700 border-green-500" : "bg-red-100 text-red-700 border-red-500"}`}>
                      {person.status === "Active" ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                      {person.status}
                    </span>
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

        {/* Footer: pagination */}
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

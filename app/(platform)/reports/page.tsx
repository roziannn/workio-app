"use client";

import { useState } from "react";
import { Pencil, CheckCircle, XCircle } from "lucide-react";
import DataListHeader from "@/components/DataListHeader";
import Badge from "@/components/Badge";

interface UserAccount {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
}

export default function AccountsPage() {
  const users: UserAccount[] = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Staff", status: "Inactive" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Editor", status: "Active" },
    { id: 4, name: "Diana Prince", email: "diana@example.com", role: "Staff", status: "Inactive" },
    { id: 5, name: "Ethan Hunt", email: "ethan@example.com", role: "Admin", status: "Active" },
  ];

  const statusStyles: Record<UserAccount["status"], string> = {
    Active: "bg-green-100 text-green-700 border-green-500",
    Inactive: "bg-red-100 text-red-700 border-red-500",
  };

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");

  const filterOptions = ["All", "Active", "Inactive"];
  const filteredUsers = statusFilter === "All" ? users : users.filter((u) => u.status === statusFilter);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-12 bg-white p-4 sm:p-6 rounded-3xl flex flex-col">
        {/* Header dengan filter */}
        <DataListHeader
          title="User Accounts"
          total={filteredUsers.length}
          filterOptions={filterOptions}
          selectedFilter={statusFilter}
          onFilterChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
          onAddNew={() => console.log("Add new user clicked")}
        />

        {/* Table users */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id} className="bg-white hover:bg-gray-50 rounded-2xl mb-2">
                  <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF0B55] to-[#FF8225] flex items-center justify-center text-white font-bold">{user.name.charAt(0)}</div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-700">{user.email}</p>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-700">{user.role}</p>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Badge colorClass={statusStyles[user.status]} icon={user.status === "Active" ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}>
                      {user.status}
                    </Badge>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right flex justify-end space-x-2">
                    <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-gray-700">
                      <Pencil size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {currentUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
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

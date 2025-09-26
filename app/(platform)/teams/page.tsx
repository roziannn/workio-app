"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, CheckCircle2, XCircle, MoreHorizontal, Edit3 } from "lucide-react";
import DataListHeader from "@/components/DataListHeader";
import Badge from "@/components/Badge";
import Pagination from "@/components/Pagination";
import LoadingSpinner from "@/components/Loading";

import { getAllUsers } from "@/data/dummy/mappers/userMapper";
import { UserData } from "@/data/dummy/user";

export default function TeamsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const personStatusStyles: Record<string, string> = {
    Active: "bg-green-100 text-green-700 border-green-500",
    Inactive: "bg-red-100 text-red-700 border-red-500",
  };

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const allUsers = getAllUsers();
  const filteredPeople = allUsers.filter((p: UserData) => {
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.email.toLowerCase().includes(searchQuery.toLowerCase()) || p.unit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPeople.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentPeople = filteredPeople.slice(indexOfFirst, indexOfLast);

  const filterOptions = ["All", "Active", "Inactive"];

  const handleNavigation = (url: string) => {
    setIsLoading(true);
    setTimeout(() => {
      router.push(url);
    }, 300);
  };

  if (isLoading) return <LoadingSpinner />;

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
          onAddNew={() => handleNavigation("/teams/create")}
          onSearch={(query) => {
            setSearchQuery(query);
            setCurrentPage(1);
          }}
        />

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Job Level</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Tasks</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPeople.map((person) => (
                <tr key={person.id} className="mb-2 border-b border-slate-200">
                  <td className="px-5 py-4 whitespace-nowrap flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF0B55] to-[#FF8225] flex items-center justify-center text-white font-bold">{person.name.charAt(0)}</div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{person.name}</p>
                      <p className="text-xs text-gray-500">{person.email}</p>
                    </div>
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap">
                    <p className="text-sm font-semibold text-gray-800">{person.role}</p>
                    <p className="text-xs text-gray-500">{person.unit}</p>
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-800">{person.tasks.length} assigned</td>

                  <td className="px-5 py-4 whitespace-nowrap">
                    <Badge colorClass={personStatusStyles[person.status]} icon={person.status === "Active" ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}>
                      {person.status}
                    </Badge>
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap relative">
                    <button className="p-2 rounded-lg hover:bg-slate-200 text-gray-700" onClick={() => setOpenDropdown(openDropdown === person.id ? null : person.id)}>
                      <MoreHorizontal size={16} />
                    </button>

                    {openDropdown === person.id && (
                      <div className="absolute left-0 mt-2 w-28 bg-white border border-gray-200 rounded-lg shadow-sm z-10 flex flex-col">
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2" onClick={() => handleNavigation(`/teams/edit/${person.id}`)}>
                          <Edit3 size={14} />
                          <span className="ml-2">Edit</span>
                        </button>

                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2" onClick={() => handleNavigation(`/teams/detail/${person.id}`)}>
                          <Eye size={14} />
                          <span className="ml-2">Detail</span>
                        </button>
                      </div>
                    )}
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

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Flag, User, Pencil, CheckCircle2, Clock, Archive, MoreHorizontal } from "lucide-react";
import DataListHeader from "@/components/DataListHeader";
import { formatDate } from "@/utils/dateHelper";
import Badge from "@/components/Badge";
import Pagination from "@/components/Pagination";
import ModalArchive from "@/components/ModalArchive";
import { notify } from "@/components/NotifiactionManager";
import { tasksData } from "@/data/dummy/tasks";

export default function TasksPage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [itemToArchive, setItemToArchive] = useState<{ id: number; name: string } | null>(null);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const handleAddNewClick = () => {
    router.push("/tasks/create");
  };

  const handleEditClick = (id: number) => {
    router.push(`/tasks/${id}`);
  };

  const handleOpenArchiveModal = (task: { id: number; title: string }) => {
    setItemToArchive({ id: task.id, name: task.title });
    setIsArchiveModalOpen(true);
  };

  const handleCloseArchiveModal = () => {
    setIsArchiveModalOpen(false);
    setItemToArchive(null);
  };

  const handleArchiveTask = (id: number) => {
    notify("success", "Data archived successfully!");
  };

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

  const filteredTasks = tasksData.filter((t) => {
    const matchStatus = statusFilter === "All" || t.status === statusFilter;
    const matchSearch = t.title.toLowerCase().includes(searchText.toLowerCase()) || t.assignee.toLowerCase().includes(searchText.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const paginatedTasks = filteredTasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-12 bg-white p-4 sm:p-6 rounded-3xl flex flex-col">
        <DataListHeader
          title="All Tasks"
          total={filteredTasks.length}
          filterOptions={filterOptions}
          selectedFilter={statusFilter}
          onFilterChange={(val) => {
            setStatusFilter(val);
            setCurrentPage(1);
          }}
          onSearch={(val) => {
            setSearchText(val);
            setCurrentPage(1);
          }}
          onAddNew={handleAddNewClick}
        />

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Priority</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Due Date</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Assignee</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTasks.map((task) => (
                <tr key={task.id} className="border-b border-slate-200">
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-gray-800">{task.title}</p>
                    <p className="text-xs text-gray-500">Created at {formatDate(task.createdAt)}</p>
                  </td>
                  <td className="px-5 py-4">
                    <Badge colorClass={priorityStyles[task.priority]} icon={<Flag size={14} />}>
                      {task.priority}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-700">{formatDate(task.dueDate)}</td>
                  <td className="px-5 py-4">
                    <Badge colorClass={statusStyles[task.status]} icon={task.status === "Completed" ? <CheckCircle2 size={14} /> : <Clock size={14} />}>
                      {task.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-700 flex items-center gap-2">
                    <User size={14} className="text-gray-500" /> {task.assignee}
                  </td>
                  <td className="px-5 py-4 relative">
                    <button className="p-2 rounded-lg hover:bg-slate-200 text-gray-700" onClick={() => setOpenDropdown(openDropdown === task.id ? null : task.id)}>
                      <MoreHorizontal size={16} />
                    </button>
                    {openDropdown === task.id && (
                      <div className="absolute left-0 mt-2 w-28 bg-white border border-gray-200 rounded-lg shadow-sm z-10 flex flex-col">
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                          onClick={() => {
                            handleEditClick(task.id);
                            setOpenDropdown(null);
                          }}
                        >
                          <Pencil size={14} />
                          <span className="ml-2">Edit</span>
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                          onClick={() => {
                            handleOpenArchiveModal(task);
                            setOpenDropdown(null);
                          }}
                        >
                          <Archive size={14} />
                          <span className="ml-2">Archive</span>
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

      {isArchiveModalOpen && itemToArchive && <ModalArchive isOpen={isArchiveModalOpen} onClose={handleCloseArchiveModal} onArchive={handleArchiveTask} itemId={itemToArchive.id} itemName={itemToArchive.name} />}
    </div>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Flag, User, Pencil, CheckCircle2, Clock, Archive } from "lucide-react";
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

  const handleAddNewClick = () => {
    router.push("/tasks/create");
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-12 bg-white p-4 sm:p-6 rounded-3xl flex flex-col space-y-1">
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

        {paginatedTasks.map((task) => (
          <div key={task.id} className="px-3 py-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2">
              <h2 className="text-base font-semibold text-slate-800 hover:text-slate-900 cursor-pointer break-words">{task.title}</h2>
              <div className="flex space-x-2 self-start sm:self-auto mb-4 lg:mb-0">
                <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-gray-700 flex items-center justify-center" onClick={() => handleEditClick(task.id)}>
                  <Pencil size={16} />
                </button>
                <button className="p-2 rounded-lg bg-slate-100 hover:bg-yellow-500 text-gray-700 hover:text-white flex items-center justify-center" onClick={() => handleOpenArchiveModal(task)}>
                  <Archive size={16} />
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-500 mb-5">Created at {formatDate(task.createdAt)}</p>

            <div className="flex flex-wrap gap-2 text-sm">
              <Badge colorClass={priorityStyles[task.priority]} icon={<Flag size={14} />}>
                {task.priority}
              </Badge>
              <Badge colorClass="text-red-500 border-none bg-transparent" icon={<Clock size={14} />}>
                {formatDate(task.dueDate)}
              </Badge>
              <Badge colorClass={statusStyles[task.status]} icon={task.status === "Completed" ? <CheckCircle2 size={14} /> : <Clock size={14} />}>
                {task.status}
              </Badge>
              <Badge colorClass="text-gray-700 border-none bg-transparent" icon={<User size={14} />}>
                {task.assignee}
              </Badge>
            </div>
          </div>
        ))}

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>

      {isArchiveModalOpen && itemToArchive && <ModalArchive isOpen={isArchiveModalOpen} onClose={handleCloseArchiveModal} onArchive={handleArchiveTask} itemId={itemToArchive.id} itemName={itemToArchive.name} />}
    </div>
  );
}

"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Download, X } from "lucide-react";
import { formatDateTime } from "@/utils/dateHelper";
import Badge from "@/components/Badge";

interface AuditTrail {
  id: number;
  user: string;
  action: string;
  module: string;
  timestamp: string;
  status: "Success" | "Failed";
}

const initialAuditTrail: AuditTrail[] = [
  { id: 1, user: "Alice Johnson", action: "Login", module: "Authentication", timestamp: "2025-09-12 08:00", status: "Success" },
  { id: 2, user: "Bob Smith", action: "Update Project", module: "Project Management", timestamp: "2025-09-12 09:15", status: "Failed" },
  { id: 3, user: "Charlie Brown", action: "Create Task", module: "Task Management", timestamp: "2025-09-12 10:30", status: "Success" },
  { id: 4, user: "Diana Prince", action: "Delete Document", module: "Document Management", timestamp: "2025-09-12 11:45", status: "Success" },
];

export default function AuditTrailPage() {
  const [auditList, setAuditList] = useState(initialAuditTrail);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const itemsPerPage = 5;
  const filterOptions = ["All", "Success", "Failed"];
  const filteredAudits = statusFilter === "All" ? auditList : auditList.filter((a) => a.status === statusFilter);

  const totalPages = Math.ceil(filteredAudits.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentAudits = filteredAudits.slice(indexOfFirst, indexOfLast);

  const statusStyles: Record<AuditTrail["status"], string> = {
    Success: "bg-green-100 text-green-700 border-green-500",
    Failed: "bg-red-100 text-red-700 border-red-500",
  };

  const handleExport = () => {
    setShowModal(true);
  };

  const confirmExport = () => {
    console.log("Export from", startDate, "to", endDate);
    setShowModal(false);
    // nanti bisa diganti dengan library CSV / Excel export
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-12 bg-white p-4 sm:p-6 rounded-3xl flex flex-col">
        {/* Header hanya dengan tombol Export */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Audit Trail</h2>
          <button onClick={handleExport} className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-lg text-sm font-medium">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>

        {/* Filter */}
        <div className="mt-4 flex space-x-2">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => {
                setStatusFilter(option);
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-md text-sm font-medium transition ${statusFilter === option ? "bg-[#FF0B55] text-white" : "bg-slate-100 text-gray-700 hover:bg-slate-200"}`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">User</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Module</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Timestamp</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentAudits.map((audit) => (
                <tr key={audit.id} className="bg-white hover:bg-gray-50 rounded-2xl mb-2">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{audit.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{audit.action}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{audit.module}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDateTime(audit.timestamp)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{audit.status}</td>
                </tr>
              ))}

              {currentAudits.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No audit data found.
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

        {/* Modal Export */}
        {showModal && (
          <div className="fixed inset-0 m-3 bg-opacity-50 backdrop-blur-xs flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-6 w-full max-w-md relative shadow-lg">
              <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                <X />
              </button>
              <h3 className="text-lg font-semibold mb-4">Export Audit Trail</h3>
              <div className="flex flex-col space-y-4">
                <label className="flex flex-col text-sm text-gray-700">
                  Start Date
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mt-1 p-2 border rounded-md" />
                </label>
                <label className="flex flex-col text-sm text-gray-700">
                  End Date
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="mt-1 p-2 border rounded-md" />
                </label>
                <button onClick={confirmExport} className="flex items-center justify-center px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-lg text-sm font-medium mt-2">
                  <Download className="h-4 w-4 mr-2" /> Export
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

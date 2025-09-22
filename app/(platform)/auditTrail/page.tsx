"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { formatDateTime } from "@/utils/dateHelper";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal";
import InputField from "@/components/InputField";
import { auditTrailData } from "./data";

export default function AuditTrailPage() {
  const [auditList] = useState(auditTrailData);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const itemsPerPage = 10;
  const filteredAudits = statusFilter === "All" ? auditList : auditList.filter((a) => a.status === statusFilter);

  const totalPages = Math.ceil(filteredAudits.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentAudits = filteredAudits.slice(indexOfFirst, indexOfLast);

  const handleExport = () => setShowModal(true);

  const confirmExport = () => {
    setShowModal(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-12 bg-white p-4 sm:p-6 rounded-3xl flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Audit Trail</h2>
          <button onClick={handleExport} className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-lg text-sm font-medium">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">User</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Module</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {currentAudits.map((audit) => (
                <tr key={audit.id} className="mb-2 border-b border-gray-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{audit.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{audit.action}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{audit.module}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{audit.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDateTime(audit.timestamp)}</td>
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
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Export Audit Trail">
          <InputField label="Start Date" type="date" value={startDate} onChange={setStartDate} />
          <InputField label="End Date" type="date" value={endDate} onChange={setEndDate} />
          <button onClick={confirmExport} className="btn-secondary mt-4">
            Export
          </button>
        </Modal>
      </div>
    </div>
  );
}

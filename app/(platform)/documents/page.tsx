"use client";

import { useState } from "react";
import { Eye, CheckCircle, XCircle, FileText, Clock } from "lucide-react";
import DataListHeader from "@/components/DataListHeader";
import Badge from "@/components/Badge";
import { formatDate } from "@/utils/dateHelper";
import Pagination from "@/components/Pagination";

interface DocumentApproval {
  id: number;
  title: string;
  project: string;
  task: string;
  owner: string;
  submittedDate: string;
  status: "Pending" | "Approved" | "Rejected";
}

export default function DocumentApprovalPage() {
  const documents: DocumentApproval[] = [
    { id: 1, title: "Proposal Alpha", project: "Project 1", task: "Task A", owner: "Alice Johnson", submittedDate: "2025-09-10", status: "Pending" },
    { id: 2, title: "Design Beta", project: "Project 1", task: "Task B", owner: "Bob Smith", submittedDate: "2025-09-11", status: "Approved" },
    { id: 3, title: "Report Gamma", project: "Project 2", task: "Task C", owner: "Charlie Brown", submittedDate: "2025-09-12", status: "Rejected" },
    { id: 4, title: "Specification Delta", project: "Project 3", task: "Task D", owner: "Diana Prince", submittedDate: "2025-09-12", status: "Pending" },
    { id: 5, title: "Test Plan Epsilon", project: "Project 3", task: "Task E", owner: "Ethan Hunt", submittedDate: "2025-09-13", status: "Approved" },
  ];

  const statusStyles: Record<DocumentApproval["status"], string> = {
    Pending: "bg-yellow-100 text-yellow-700 border-yellow-500",
    Approved: "bg-green-100 text-green-700 border-green-500",
    Rejected: "bg-red-100 text-red-700 border-red-500",
  };

  const statusOptions = ["All", "Pending", "Approved", "Rejected"];
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const itemsPerPage = 5;

  const filteredDocuments = documents.filter((doc) => statusFilter === "All" || doc.status === statusFilter);
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentDocuments = filteredDocuments.slice(indexOfFirst, indexOfLast);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-12 bg-white p-4 sm:p-6 rounded-3xl flex flex-col">
        <DataListHeader
          title="Document Approval"
          total={filteredDocuments.length}
          filterOptions={statusOptions}
          selectedFilter={statusFilter}
          onFilterChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
        />

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Project</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Owner</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Submitted</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentDocuments.map((doc) => (
                <tr key={doc.id} className="bg-white hover:bg-gray-50 rounded-2xl mb-2">
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-800">{doc.title}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{doc.project}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{doc.owner}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDate(doc.submittedDate)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Badge colorClass={statusStyles[doc.status]} icon={doc.status === "Approved" ? <CheckCircle className="h-3 w-3" /> : doc.status === "Rejected" ? <XCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}>
                      {doc.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right flex justify-end space-x-2">
                    <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-gray-700">
                      <Eye size={16} />
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

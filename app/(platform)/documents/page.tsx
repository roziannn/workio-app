"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Eye, Pencil, FileText, CheckCircle2, XCircle, Clock } from "lucide-react";
import DataListHeader from "@/components/DataListHeader";
import Badge from "@/components/Badge";
import Pagination from "@/components/Pagination";
import { formatDate } from "@/utils/dateHelper";
import { documentsData, Document } from "./data";

export default function DocumentsPage() {
  const router = useRouter();

  const documents: Document[] = documentsData;

  const statusStyles: Record<Document["status"], string> = {
    Draft: "bg-gray-100 text-gray-700 border-gray-400",
    Submitted: "bg-yellow-100 text-yellow-700 border-yellow-500",
    Approved: "bg-green-100 text-green-700 border-green-500",
    Rejected: "bg-red-100 text-red-700 border-red-500",
  };

  const statusOptions = ["All", "Draft", "Submitted", "Approved", "Rejected"];
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchText, setSearchText] = useState("");
  const itemsPerPage = 10;

  const filteredDocuments = documents.filter((doc) => {
    const matchesStatus = statusFilter === "All" || doc.status === statusFilter;
    const matchesSearch =
      doc.docNo.toLowerCase().includes(searchText.toLowerCase()) ||
      doc.title.toLowerCase().includes(searchText.toLowerCase()) ||
      doc.project.toLowerCase().includes(searchText.toLowerCase()) ||
      doc.createdBy.toLowerCase().includes(searchText.toLowerCase()) ||
      (doc.reviewer && doc.reviewer.toLowerCase().includes(searchText.toLowerCase()));

    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentDocuments = filteredDocuments.slice(indexOfFirst, indexOfLast);

  const getStatusIcon = (status: Document["status"]) => {
    switch (status) {
      case "Approved":
        return <CheckCircle2 className="h-3 w-3" />;
      case "Rejected":
        return <XCircle className="h-3 w-3" />;
      case "Submitted":
        return <Clock className="h-3 w-3" />;
      default:
        return <FileText className="h-3 w-3" />;
    }
  };

  const handleAddNewClick = () => {
    router.push("/documents/create");
  };
  const handleDetailClick = (docNo: string) => {
    router.push(`/documents/detail/${docNo}`);
  };
  const handleEditClick = (docNo: string) => {
    router.push(`/documents/edit/${docNo}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-12 bg-white p-4 sm:p-6 rounded-3xl flex flex-col">
        <DataListHeader
          title="All Documents"
          total={filteredDocuments.length}
          filterOptions={statusOptions}
          selectedFilter={statusFilter}
          onAddNew={handleAddNewClick}
          onFilterChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
          onSearch={(value) => {
            setSearchText(value);
            setCurrentPage(1); // reset page biar gak mentok
          }}
        />

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Doc. No</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Project No.</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Reviewer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">CreatedBy</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Submitted</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Updated</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentDocuments.map((doc) => (
                <tr key={doc.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{doc.docNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{doc.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{doc.project}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Badge colorClass={statusStyles[doc.status]} icon={getStatusIcon(doc.status)}>
                      {doc.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{doc.status === "Approved" || doc.status === "Rejected" ? doc.reviewer || "-" : "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{doc.createdBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{doc.submittedDate ? formatDate(doc.submittedDate) : "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDate(doc.lastUpdated)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right flex justify-end space-x-2">
                    <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-gray-700" onClick={() => handleDetailClick(doc.docNo)}>
                      <Eye size={16} />
                    </button>
                    <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-gray-700" onClick={() => handleEditClick(doc.docNo)}>
                      <Pencil size={16} />
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

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-end space-x-2 mt-4">
      {pages.map((page) => (
        <button key={page} onClick={() => onPageChange(page)} className={`px-3 py-1 rounded-md text-sm font-medium transition ${currentPage === page ? "bg-[#FF0B55] text-white" : "bg-slate-100 text-gray-700 hover:bg-slate-200"}`}>
          {page}
        </button>
      ))}
    </div>
  );
}

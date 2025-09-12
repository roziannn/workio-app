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
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-full text-sm font-medium border transition ${page === currentPage ? "bg-[#FF0B55] text-white border-[#FF0B55]" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

interface DataListHeaderProps {
  title: string;
  total: number;
  onAddNew?: () => void;
  onImport?: () => void;
  filterOptions?: string[];
  selectedFilter?: string;
  onFilterChange?: (value: string) => void;
}

export default function DataListHeader({ title, total, onAddNew, onImport, filterOptions, selectedFilter, onFilterChange }: DataListHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
      <h2 className="text-sm sm:text-md font-semibold text-slate-600">
        <span className="block text-lg text-slate-900">{title}</span>
        <p className="text-xs text-gray-500 font-normal">
          {total} total {title.toLowerCase()}
        </p>
      </h2>

      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
        {filterOptions && onFilterChange && (
          <div className="relative">
            <button onClick={() => setOpen(!open)} className="w-full sm:w-40 flex items-center justify-between px-3 py-2 border border-slate-300 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 transition">
              <span>{selectedFilter || "All"}</span>
              <ChevronDown size={16} className={`ml-2 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
              <div className="absolute mt-2 w-full sm:w-40 bg-white border border-gray-100 rounded-lg shadow-lg z-10">
                {filterOptions.map((opt) => (
                  <div
                    key={opt}
                    onClick={() => {
                      onFilterChange(opt);
                      setOpen(false);
                    }}
                    className={`flex items-center justify-between px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${selectedFilter === opt ? "text-slate-900 font-semibold" : "text-gray-700"}`}
                  >
                    <span>{opt}</span>
                    {selectedFilter === opt && <Check size={14} />}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <button onClick={onAddNew} className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-[#FF0B55] text-white text-sm font-medium hover:bg-[#e00a4c] transition">
          + Add New
        </button>
        <button onClick={onImport} className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-slate-100 text-gray-700 text-sm font-medium hover:bg-slate-200 transition">
          Import
        </button>
      </div>
    </div>
  );
}

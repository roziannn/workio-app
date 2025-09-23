import React, { useState } from "react";
import { ChevronDown, Check, Search, Download } from "lucide-react";

interface DataListHeaderProps {
  title: string;
  total: number;
  onAddNew?: () => void;
  onImport?: () => void;
  filterOptions?: string[];
  selectedFilter?: string;
  onFilterChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  isBtnAddNew?: boolean;
  isBtnExport?: boolean;
}

export default function DataListHeader({ title, total, onAddNew, onImport, filterOptions, selectedFilter, onFilterChange, onSearch, isBtnAddNew = true, isBtnExport = true }: DataListHeaderProps) {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
      <div className="text-sm sm:text-md font-semibold text-slate-600 sm:w-1/3">
        <span className="block text-lg text-slate-900">{title}</span>
        <p className="text-xs text-gray-500 font-normal">
          {total} total {title.toLowerCase()}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center sm:space-x-2 space-y-2 sm:space-y-0 sm:w-1/3">
        {filterOptions && onFilterChange && (
          <div className="relative w-full sm:w-32">
            <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-3 py-2 border border-slate-300 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 transition">
              <span>{selectedFilter || "All"}</span>
              <ChevronDown size={16} className={`ml-2 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
              <div className="absolute mt-2 w-full bg-white border border-gray-100 rounded-lg shadow-lg z-10">
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

        <div className="relative w-full sm:flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              onSearch?.(e.target.value);
            }}
            className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-[#FF0B55] focus:border-[#FF0B55] bg-white"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
        </div>
      </div>

      {/* buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-2 space-y-2 sm:space-y-0 sm:w-1/3">
        {isBtnAddNew && onAddNew && (
          <button onClick={onAddNew} className="w-full sm:w-auto px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-[#FF0B55] text-white text-sm font-medium hover:bg-[#e00a4c] transition">
            + Add New
          </button>
        )}
        {isBtnExport && onImport && (
          <button onClick={onImport} className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        )}
      </div>
    </div>
  );
}

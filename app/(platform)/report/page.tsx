"use client";

import { useState } from "react";
import { Download, ChevronDown, Check } from "lucide-react";
import InputField from "@/components/InputField";

export default function ReportsPage() {
  const reportOptions = ["Master Data", "Documents", "Transactions", "Users"];
  const [selectedReport, setSelectedReport] = useState(reportOptions[0]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [open, setOpen] = useState(false);

  const handleDownload = () => {
    console.log(`Download report: ${selectedReport}, from ${startDate} to ${endDate}`);
  };

  return (
    <div className="min-h-full grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-12 bg-white p-4 sm:p-6 rounded-3xl flex flex-col">
        <div className="text-sm sm:text-md font-semibold text-slate-600">
          <span className="block text-lg text-slate-900">Report</span>
          <p className="text-xs text-gray-500 font-normal">Save a copy of your data</p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-end gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Report:</label>
            <div className="relative w-full sm:w-48">
              <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-3 py-2 border border-slate-300 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 transition">
                <span>{selectedReport || "All"}</span>
                <ChevronDown size={16} className={`ml-2 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
              </button>
              {open && (
                <div className="absolute mt-2 w-full bg-white border border-gray-100 rounded-lg shadow-lg z-10">
                  {reportOptions.map((opt) => (
                    <div
                      key={opt}
                      onClick={() => {
                        setSelectedReport(opt);
                        setOpen(false);
                      }}
                      className={`flex items-center justify-between px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${selectedReport === opt ? "text-slate-900 font-semibold" : "text-gray-700"}`}
                    >
                      <span>{opt}</span>
                      {selectedReport === opt && <Check size={14} />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <InputField label="From:" type="date" value={startDate} onChange={setStartDate} />
            <InputField label="To:" type="date" value={endDate} onChange={setEndDate} />
          </div>

          <button onClick={handleDownload} className="btn-secondary w-32">
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

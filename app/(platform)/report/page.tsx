"use client";

import { useState } from "react";
import DataListHeader from "@/components/DataListHeader";
import { Download } from "lucide-react";

export default function ReportsPage() {
  const reportOptions = ["Master Data", "Documents", "Transactions", "Users"];
  const [selectedReport, setSelectedReport] = useState(reportOptions[0]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDownload = () => {
    console.log(`Download report: ${selectedReport}, from ${startDate} to ${endDate}`);
    // nanti ganti dengan API fetch / file download sesuai range
  };

  return (
    <div className="min-h-full grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-12 bg-white p-4 sm:p-6 rounded-3xl flex flex-col">
        <DataListHeader title="Download Reports" total={reportOptions.length} />

        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <p className="text-gray-700 font-medium">Report:</p>
            <select value={selectedReport} onChange={(e) => setSelectedReport(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF0B55]">
              {reportOptions.map((report) => (
                <option key={report} value={report}>
                  {report}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <p className="text-gray-700 font-medium">From:</p>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF0B55]" />
            <p className="text-gray-700 font-medium">To:</p>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF0B55]" />
          </div>

          <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 bg-[#FF0B55] text-white rounded-lg hover:bg-[#e0004d]">
            <Download size={16} />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

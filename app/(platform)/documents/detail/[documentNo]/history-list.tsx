"use client";

import { Download } from "lucide-react";
import { formatDate } from "@/utils/dateHelper";

interface History {
  id: number;
  version: string;
  updatedBy: string;
  updatedAt: string;
  fileUrl: string;
  documentNo: string;
}

interface HistoryListProps {
  documentNo: string;
  histories: History[];
}

export default function HistoryList({ documentNo, histories }: HistoryListProps) {
  const filteredHistories = histories.filter((h) => h.documentNo === documentNo);

  if (filteredHistories.length === 0) {
    return <p className="text-gray-500 text-sm">No history available for this document.</p>;
  }

  return (
    <ul className="space-y-2">
      {filteredHistories.map((h) => (
        <li key={h.id} className="flex justify-between items-center p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition">
          <div className="flex flex-col">
            <span className="mb-1 font-medium text-gray-800">{h.version}</span>
            <span className="text-sm font-medium text-slate-500">Updated by {h.updatedBy}</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-slate-600">{formatDate(h.updatedAt)}</span>
            <a href={h.fileUrl} download className="p-2 rounded-lg hover:bg-gray-200">
              <Download size={16} className="text-slate-600" />
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}

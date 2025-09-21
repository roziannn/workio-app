"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FileText, User, Folder, CheckCircle2, MessageSquare, X, Download, ThumbsUp, Upload, Plus, Paperclip } from "lucide-react";
import Badge from "@/components/Badge";
import { formatDate } from "@/utils/dateHelper";
import { notify } from "@/components/NotifiactionManager";
import Modal from "@/components/Modal";
import InputField from "@/components/InputField";
import CommentDrawer from "./comment-drawer";
import HistoryList from "./history-list";

type Status = "Active" | "Inactive" | "Completed";

interface Document {
  id: number;
  documentNo: string;
  title: string;
  projectNo: string;
  reviewer: string;
  notes: string;
  status: Status;
  createdAt: string;
}

interface History {
  id: number;
  version: string;
  updatedBy: string;
  updatedAt: string;
  fileUrl: string;
  documentNo: string;
}

const mockDocuments: Document[] = [
  {
    id: 1,
    documentNo: "DOC-2025-001",
    title: "Project Brief",
    projectNo: "PRJ-WEB-202509-001",
    reviewer: "Alice",
    notes:
      "This document outlines the key objectives, scope, and deliverables of the project. It highlights critical dependencies, resource allocations, and identified risks that must be addressed to ensure successful implementation. All teams are expected to review and align on the outlined requirements prior to the next development sprint.",
    status: "Active",
    createdAt: "2025-09-18",
  },
  {
    id: 2,
    documentNo: "DOC-2025-002",
    title: "Contract Client",
    projectNo: "PRJ-MOB-202509-001",
    reviewer: "Charlie",
    notes: "Legal review required",
    status: "Completed",
    createdAt: "2025-09-16",
  },
];

const mockHistories: History[] = [
  {
    id: 1,
    version: "v1.0",
    updatedBy: "Alice",
    updatedAt: "2025-09-15",
    fileUrl: "/files/DOC-2025-001-v1.pdf",
    documentNo: "DOC-2025-001",
  },
  {
    id: 2,
    version: "v1.1",
    updatedBy: "Bob",
    updatedAt: "2025-09-17",
    fileUrl: "/files/DOC-2025-001-v1.1.pdf",
    documentNo: "DOC-2025-001",
  },
  {
    id: 3,
    version: "v1.0",
    updatedBy: "Charlie",
    updatedAt: "2025-09-16",
    fileUrl: "/files/DOC-2025-002-v1.pdf",
    documentNo: "DOC-2025-002",
  },
];

export default function DocumentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const documentNo = params.documentNo as string;

  const [document, setDocument] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [newVersion, setNewVersion] = useState("");
  const [newFile, setNewFile] = useState<File | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const doc = mockDocuments.find((d) => d.documentNo === documentNo);
      if (!doc) {
        notify("error", "Document not found.");
        router.push("/documents");
      } else {
        setDocument(doc);
      }
      setIsLoading(false);
    }, 500);
  }, [documentNo, router]);

  const handleUploadVersion = () => {
    if (!newVersion || !newFile) {
      notify("error", "Please enter version and choose a file.");
      return;
    }
    notify("success", `New version ${newVersion} uploaded successfully.`);
    setIsUploadOpen(false);
    setNewVersion("");
    setNewFile(null);
  };

  const handleApprove = () => {
    notify("success", "Document approved successfully!");
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-96">
        <div className="flex flex-col items-center space-y-4 backdrop-blur-md animate-fadeIn">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-700 animate-pulse">Loading data...</p>
        </div>
      </div>
    );

  if (!document) return null;

  const statusStyles: Record<Status, string> = {
    Active: "bg-green-100 text-green-700 border-green-500",
    Inactive: "bg-red-100 text-red-700 border-red-500",
    Completed: "bg-blue-100 text-blue-700 border-blue-500",
  };

  return (
    <div className="bg-white rounded-3xl p-6 relative">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="p-4 rounded-full bg-gray-100">
            <FileText className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">{document.title}</h1>
            <p className="text-sm text-gray-500">{document.documentNo}</p>
          </div>
        </div>

        <button onClick={() => router.push("/documents")} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition">
          Back
        </button>
      </div>

      {/* Document Info*/}
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Document Info</h2>
      <div className="rounded-xl grid grid-cols-1 md:grid-cols-2 divide-x divide-dashed divide-gray-400 mb-4">
        <div>
          {[
            {
              label: "CreatedBy",
              value: (
                <span className="flex items-center">
                  <User size={14} className="mr-1" /> {document.reviewer}
                </span>
              ),
            },
            {
              label: "Project",
              value: (
                <span className="flex items-center">
                  <Folder size={14} className="mr-1 text-slate-500" />
                  <Link href={`/projects/detail/${document?.projectNo}`} className="font-semibold text-indigo-500 hover:text-indigo-700 hover:underline">
                    {document?.projectNo}
                  </Link>
                </span>
              ),
            },
            {
              label: "Status",
              value: (
                <Badge colorClass={statusStyles[document.status]} icon={<CheckCircle2 size={14} />}>
                  {document.status}
                </Badge>
              ),
            },
            { label: "Submitted", value: formatDate(document.createdAt) },
          ].map((item, index) => (
            <div key={index} className="flex justify-between items-center p-3">
              <span className="font-medium">{item.label}</span>
              <div className="flex items-center">{item.value}</div>
            </div>
          ))}
        </div>

        {/*  Notes */}
        <div className="p-3">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Notes</h2>
          <p className="text-gray-700 flex items-start">{document.notes}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">History</h2>
        <HistoryList documentNo={document.documentNo} histories={mockHistories} />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3">
        <button onClick={handleApprove} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
          <ThumbsUp size={16} className="mr-1" /> Approve
        </button>
        <button onClick={() => setIsUploadOpen(true)} className="px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 flex items-center">
          <Upload size={16} className="mr-1" /> New Version
        </button>
        <button onClick={() => setIsCommentOpen(true)} className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 flex items-center">
          <MessageSquare size={16} className="mr-1" /> Comments
        </button>
      </div>

      {/* Comment Drawer */}
      <CommentDrawer isOpen={isCommentOpen} documentNo={document.documentNo} onClose={() => setIsCommentOpen(false)} />

      <Modal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} title="Upload New Version">
        <div className="space-y-3">
          <InputField label="Version" value={newVersion} onChange={setNewVersion} placeholder="e.g., v2.1" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload a file</label>
            <div className="relative flex items-center">
              <Paperclip className="absolute left-3 text-gray-500" size={18} />
              <input
                type="file"
                onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                className={`
                  w-full pl-10 pr-4 py-1 border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                  file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0
                  file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100 text-sm text-gray-500 mb-2
                `}
              />
            </div>
          </div>

          <button onClick={handleUploadVersion} className="btn-secondary">
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
}

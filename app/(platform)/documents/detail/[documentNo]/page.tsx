"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FileText, User, Folder, CheckCircle2, MessageSquare, ThumbsUp, Upload, Paperclip } from "lucide-react";
import Badge from "@/components/Badge";
import { formatDate } from "@/utils/dateHelper";
import { notify } from "@/components/NotifiactionManager";
import Modal from "@/components/Modal";
import InputField from "@/components/InputField";
import CommentDrawer from "./comment-drawer";
import HistoryList from "./history-list";
import LoadingSpinner from "@/components/Loading";

import { getDocumentByDocNo } from "@/data/dummy/mappers/documentMapper";
import { Document } from "@/data/dummy/documents";

interface History {
  id: number;
  version: string;
  updatedBy: string;
  updatedAt: string;
  fileUrl: string;
  documentNo: string;
}

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
      const doc = getDocumentByDocNo(documentNo);
      if (!doc) {
        notify("error", "Document not found.");
        router.push("/documents");
      } else {
        setDocument(doc);
      }
      setIsLoading(false);
    }, 300);
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

  if (isLoading) return <LoadingSpinner />;
  if (!document) return null;

  const statusStyles: Record<Document["status"], string> = {
    Draft: "bg-gray-100 text-gray-700 border-gray-500",
    Submitted: "bg-yellow-100 text-yellow-700 border-yellow-500",
    Approved: "bg-green-100 text-green-700 border-green-500",
    Rejected: "bg-red-100 text-red-700 border-red-500",
  };

  return (
    <div className="bg-white rounded-3xl p-6 relative">
      <div className="flex items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="p-4 rounded-full bg-gray-100">
            <FileText className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">{document.title}</h1>
            <p className="text-sm text-gray-500">{document.docNo}</p>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-gray-800 mb-2">Document Info</h2>
      <div className="rounded-xl grid grid-cols-1 md:grid-cols-2 divide-x divide-dashed divide-gray-400 mb-4">
        <div>
          {[
            {
              label: "Created By",
              value: (
                <span className="flex items-center">
                  <User size={14} className="mr-1" /> {document.createdBy}
                </span>
              ),
            },
            {
              label: "Project",
              value: (
                <span className="flex items-center">
                  <Folder size={14} className="mr-1 text-slate-500" />
                  <Link href={`/projects/detail/${document.projectNo}`} className="font-semibold text-indigo-500 hover:text-indigo-700 hover:underline">
                    {document.projectNo}
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

        <div className="p-3">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Notes</h2>
          <p className="text-gray-700 flex items-start">{document.notes}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">History</h2>
        <HistoryList documentNo={document.docNo} histories={mockHistories} />
      </div>

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

      <CommentDrawer isOpen={isCommentOpen} documentNo={document.docNo} onClose={() => setIsCommentOpen(false)} />

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
                  w-full pl-10 pr-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                  file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
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

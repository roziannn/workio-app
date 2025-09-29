"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { CheckCircle2, Paperclip, User, X, Search } from "lucide-react";

import { notify } from "@/components/NotifiactionManager";
import InputField from "@/components/InputField";
import TextareaField from "@/components/TextareaField";
import LoadingSpinner from "@/components/Loading";
import Pagination from "@/components/Pagination";

import { usersData } from "@/data/dummy/user";
import { getActiveProjectLOV } from "@/data/dummy/mappers/projectsMapper";
import { getDocumentByDocNo } from "@/data/dummy/mappers/documentMapper";

export default function EditDocumentPage() {
  const router = useRouter();
  const params = useParams();
  const docNo = params.documentNo as string;

  const [isLoading, setIsLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [projectNo, setProjectNo] = useState<string | null>(null);
  const [reviewers, setReviewers] = useState<number[]>([]);
  const [reviewerSearchQuery, setReviewerSearchQuery] = useState("");
  const [showReviewerSuggestions, setShowReviewerSuggestions] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const reviewerInputRef = useRef<HTMLInputElement>(null);

  const activeProjects = getActiveProjectLOV();

  useEffect(() => {
    setIsLoading(true);
    const doc = getDocumentByDocNo(docNo);
    if (doc) {
      setTitle(doc.title || "");
      setNotes(doc.notes || "");
      setProjectNo(doc.projectNo);

      const reviewerIds: number[] = [];
      if (doc.reviewer) {
        const found = usersData.find((u) => u.name.toLowerCase() === doc.reviewer?.toLowerCase());
        if (found) reviewerIds.push(found.id);
      }
      setReviewers(reviewerIds);
    } else {
      notify("error", "Document not found");
      router.push("/documents");
    }
    setIsLoading(false);
  }, [docNo, router]);

  const filteredProjects = activeProjects.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const totalPages = Math.ceil(filteredProjects.length / pageSize);
  const paginatedProjects = filteredProjects.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const filteredReviewers = usersData.filter((r) => r.name.toLowerCase().includes(reviewerSearchQuery.toLowerCase()) && !reviewers.includes(r.id));

  const handleReviewerChange = (id: number) => {
    if (reviewers.length >= 2) return;
    setReviewers([...reviewers, id]);
    setReviewerSearchQuery("");
    setShowReviewerSuggestions(false);
  };

  const handleRemoveReviewer = (id: number) => {
    setReviewers(reviewers.filter((r) => r !== id));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!title.trim()) errors.title = "Title is required";
    if (!projectNo) errors.project = "Please select a project";
    if (reviewers.length === 0) errors.reviewer = "At least 1 reviewer is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      notify("error", "Please fill in all required fields.");
      return;
    }
    notify("success", "Document updated successfully!");
    router.push("/documents");
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-6 bg-white p-6 rounded-3xl space-y-6">
        <h2 className="text-xl font-semibold mb-1">Edit Document</h2>
        <p className="text-sm text-gray-500 mb-6">Update the document details below.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField label="Document Number" value={docNo} onChange={() => {}} type="text" readonly />
          <InputField
            label="Title"
            value={title}
            onChange={(val) => {
              setTitle(val);
              setFormErrors((prev) => ({ ...prev, title: "" }));
            }}
            placeholder="e.g., File Design System"
            error={formErrors.title}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload a file</label>
            <div className="relative flex items-center">
              <Paperclip className="absolute left-3 text-gray-500" size={18} />
              <input
                type="file"
                onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                className="w-full pl-10 pr-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 text-sm text-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reviewer</label>
            <div className={`relative ${formErrors.reviewer ? "border-red-500 rounded-lg" : ""}`} ref={reviewerInputRef}>
              <div className={`flex flex-wrap items-center gap-2 p-2 border ${formErrors.reviewer ? "border-red-500" : "border-gray-300"} rounded-lg bg-white`}>
                {reviewers.map((id) => {
                  const member = usersData.find((r) => r.id === id);
                  return (
                    <span key={member?.id} className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium text-purple-800 bg-purple-100 rounded-full">
                      <User size={12} className="mr-1" />
                      {member?.name}
                      <button type="button" onClick={() => handleRemoveReviewer(id)} className="text-purple-600 hover:text-purple-800 focus:outline-none">
                        <X size={12} />
                      </button>
                    </span>
                  );
                })}
                {reviewers.length < 2 && (
                  <input
                    type="text"
                    value={reviewerSearchQuery}
                    onChange={(e) => setReviewerSearchQuery(e.target.value)}
                    onFocus={() => setShowReviewerSuggestions(true)}
                    placeholder={reviewers.length === 0 ? "e.g., John Doe" : ""}
                    className="flex-grow min-w-[5rem] bg-transparent focus:outline-none text-sm"
                  />
                )}
              </div>
              {showReviewerSuggestions && reviewers.length < 2 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {filteredReviewers.length > 0 ? (
                    filteredReviewers.map((member) => (
                      <div key={member.id} className="flex items-center p-3 cursor-pointer hover:bg-gray-100" onClick={() => handleReviewerChange(member.id)}>
                        <User size={16} className="text-gray-500 mr-2" />
                        <span className="text-sm font-medium">{member.name}</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-gray-500 text-sm">No results found.</div>
                  )}
                </div>
              )}
            </div>
            {formErrors.reviewer && <p className="text-red-500 text-xs mt-1">{formErrors.reviewer}</p>}
          </div>

          <TextareaField
            label="Notes"
            value={notes}
            onChange={(val) => {
              setNotes(val);
              setFormErrors((prev) => ({ ...prev, notes: "" }));
            }}
            placeholder="Add any additional notes or details about the document."
            error={formErrors.notes}
          />

          <button type="submit" className="btn-secondary w-full">
            Save Changes
          </button>
        </form>
      </div>

      <div className="lg:col-span-6 bg-white p-6 rounded-3xl">
        <h3 className="text-xl font-semibold mb-2">Change Project</h3>
        <p className="text-sm text-gray-500 mb-5">Select a project to assign this document to.</p>
        <div className="relative mb-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search projects..."
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${formErrors.project ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"}`}
          />
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        {formErrors.project && <p className="text-red-500 text-xs mt-1">{formErrors.project}</p>}
        <div className="space-y-4">
          {paginatedProjects.map((p) => (
            <div
              key={p.projectNo}
              className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
                projectNo === p.projectNo ? "bg-indigo-100 border-indigo-500 border-2" : "bg-gray-50 hover:bg-gray-100 border border-transparent"
              }`}
              onClick={() => {
                setProjectNo(p.projectNo);
                setFormErrors((prev) => ({ ...prev, project: "" }));
              }}
            >
              <span className="font-medium text-sm text-gray-800">{p.name}</span>
              {projectNo === p.projectNo && <CheckCircle2 size={20} className="text-indigo-600" />}
            </div>
          ))}
        </div>
        {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
      </div>
    </div>
  );
}

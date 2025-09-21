"use client";

import { useState, useEffect, useRef } from "react";
import { Search, CheckCircle2, Paperclip, User, X } from "lucide-react";
import { notify } from "@/components/NotifiactionManager";
import InputField from "@/components/InputField";
import TextareaField from "@/components/TextareaField";
import { generateDocumentNo } from "@/utils/documentNo";

const projects = [
  { id: 1, name: "Website Redesign" },
  { id: 2, name: "Mobile App Development" },
  { id: 3, name: "Backend API Migration" },
  { id: 4, name: "Marketing Campaign Launch" },
];

const reviewerOptions = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Charlie Lee" },
  { id: 4, name: "Dana White" },
];

export default function NewTaskPage() {
  const [documentNo, setDocumentNo] = useState("");
  const [taskName, setTaskName] = useState("");
  const [project, setProject] = useState<number | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [reviewers, setReviewers] = useState<number[]>([]);
  const [reviewerSearchQuery, setReviewerSearchQuery] = useState("");
  const [notes, setNotes] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showReviewerSuggestions, setShowReviewerSuggestions] = useState(false);

  const reviewerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDocumentNo(generateDocumentNo(1));
  }, []);

  const filteredProjects = projects.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const filteredReviewers = reviewerOptions.filter((r) => r.name.toLowerCase().includes(reviewerSearchQuery.toLowerCase()) && !reviewers.includes(r.id));

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
    if (!taskName) errors.taskName = "Task name is required.";
    if (reviewers.length === 0) errors.reviewer = "At least 1 reviewer is required.";
    if (project === null) errors.project = "Please select a project.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      notify("error", "Please fill in all required fields.");
      return;
    }

    console.log({
      taskName,
      reviewers,
      project,
      notes,
      uploadedFile,
    });

    notify("success", "Task added successfully!");
    setTaskName("");
    setReviewers([]);
    setProject(null);
    setNotes("");
    setUploadedFile(null);
    setFormErrors({});
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-6 bg-white p-6 rounded-3xl space-y-6">
        <h2 className="text-xl font-semibold mb-1">New Document</h2>
        <p className="text-sm text-gray-500 mb-6">Enter the required information for your new document.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField label="Project Number" value={documentNo} onChange={() => {}} placeholder="" type="text" error={formErrors.documentNo} readonly />

          <InputField label="Title" value={taskName} onChange={setTaskName} placeholder="e.g., Deploy new API endpoint" error={formErrors.taskName} />

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
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100 text-sm text-gray-500
                `}
              />
            </div>
          </div>

          {/* Reviewer Multi-Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reviewer</label>
            <div className={`relative ${formErrors.reviewer ? "border-red-500 rounded-lg" : ""}`} ref={reviewerInputRef}>
              <div className={`flex flex-wrap items-center gap-2 p-2 border ${formErrors.reviewer ? "border-red-500" : "border-gray-300"} rounded-lg bg-white`} onClick={() => reviewerInputRef.current?.focus()}>
                {reviewers.map((id) => {
                  const member = reviewerOptions.find((r) => r.id === id);
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
                    className="flex-grow min-w-[5rem] bg-transparent focus:outline-none"
                  />
                )}
              </div>

              {showReviewerSuggestions && reviewers.length < 2 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {filteredReviewers.length > 0 ? (
                    filteredReviewers.map((member) => (
                      <div key={member.id} className="flex items-center p-3 cursor-pointer hover:bg-gray-100" onClick={() => handleReviewerChange(member.id)}>
                        <User size={16} className="text-gray-500 mr-2" />
                        <span className="font-medium">{member.name}</span>
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
            placeholder="Add any additional notes or details about the task."
            error={formErrors.notes}
          />

          <button type="submit" className="btn-primary w-full">
            Save Document
          </button>
        </form>
      </div>

      {/* Project Selection */}
      <div className="lg:col-span-6 bg-white p-6 rounded-3xl">
        <h3 className="text-xl font-semibold mb-2">Add Task to Project</h3>
        <p className="text-sm text-gray-500 mb-5">Select a project to add this new task to.</p>
        <label className="mb-1">Search</label>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search project..."
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${formErrors.project ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"}`}
          />
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        {formErrors.project && <p className="text-red-500 text-xs mt-1">{formErrors.project}</p>}

        <div className="space-y-4 mt-6">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${project === p.id ? "bg-indigo-100 border-indigo-500 border-2" : "bg-gray-50 hover:bg-gray-100 border border-transparent"}`}
              onClick={() => {
                setProject(p.id);
                setFormErrors((prev) => ({ ...prev, project: "" }));
              }}
            >
              <span className="font-medium text-sm text-gray-800">{p.name}</span>
              {project === p.id && <CheckCircle2 size={20} className="text-indigo-600" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

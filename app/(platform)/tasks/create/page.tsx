"use client";

import { useState, useRef, useEffect } from "react";
import { Search, User, CheckCircle2, X, Flag } from "lucide-react"; // Import 'Flag' icon
import { notify } from "@/components/NotifiactionManager";
import InputField from "@/components/InputField";
import Badge from "@/components/Badge"; // Pastikan Anda mengimpor Badge
import Label from "@/components/Label";

// Mock data for existing projects and team members
const projects = [
  { id: 1, name: "Website Redesign" },
  { id: 2, name: "Mobile App Development" },
  { id: 3, name: "Backend API Migration" },
  { id: 4, name: "Marketing Campaign Launch" },
];

const assignees = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Charlie Brown" },
  { id: 4, name: "Diana Prince" },
  { id: 5, name: "Edward Davis" },
  { id: 6, name: "Fiona Clark" },
];

export default function NewTaskPage() {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [assignee, setAssignee] = useState<number[]>([]);
  const [deadline, setDeadline] = useState("");
  const [project, setProject] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [assigneeSearchQuery, setAssigneeSearchQuery] = useState("");
  const [showAssigneeSuggestions, setShowAssigneeSuggestions] = useState(false);
  const assigneeInputRef = useRef<HTMLDivElement>(null);

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const priorityMap: { [key: number]: string } = {
    0: "Low",
    1: "Medium",
    2: "High",
  };

  const priorityBadgeColors: { [key: string]: string } = {
    Low: "bg-purple-100 text-purple-600 border-purple-500",
    Medium: "bg-yellow-100 text-yellow-600 border-yellow-500",
    High: "bg-red-100 text-red-600 border-red-500",
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setPriority(priorityMap[value]);
  };

  const handleAssigneeChange = (memberId: number) => {
    if (formErrors.assignee) {
      setFormErrors((prev) => ({ ...prev, assignee: "" }));
    }
    if (assignee.includes(memberId)) {
      setAssignee(assignee.filter((id) => id !== memberId));
    } else {
      setAssignee([...assignee, memberId]);
    }
    setAssigneeSearchQuery("");
  };

  const handleRemoveAssignee = (memberId: number) => {
    setAssignee(assignee.filter((id) => id !== memberId));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!taskName) {
      errors.taskName = "Task name is required.";
    }
    if (assignee.length === 0) {
      errors.assignee = "Please assign this task to at least one person.";
    }
    if (!deadline) {
      errors.deadline = "A deadline is required.";
    } else {
      const today = new Date().toISOString().split("T")[0];
      if (deadline < today) {
        errors.deadline = "Deadline cannot be in the past.";
      }
    }
    if (project === null) {
      errors.project = "Please select a project.";
    }
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
      priority,
      assignee,
      deadline,
      project,
      notes,
    });

    notify("success", "Task added successfully!");
    setTaskName("");
    setPriority("Medium");
    setAssignee([]);
    setDeadline("");
    setProject(null);
    setNotes("");
    setFormErrors({});
  };

  const filteredProjects = projects.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const filteredAssignees = assignees.filter((member) => member.name.toLowerCase().includes(assigneeSearchQuery.toLowerCase()) && !assignee.includes(member.id));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (assigneeInputRef.current && !assigneeInputRef.current.contains(event.target as Node)) {
        setShowAssigneeSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left: New Task Form */}
      <div className="lg:col-span-6 bg-white p-6 rounded-3xl space-y-6">
        <h2 className="text-xl font-semibold mb-1">New Task</h2>
        <p className="text-sm text-gray-500 mb-6">Create a new task and assign it to a team member.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField label="Task Name" value={taskName} onChange={setTaskName} placeholder="e.g., Deploy new API endpoint" error={formErrors.taskName} />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="inline-flex items-center space-x-2">
                <span>Priority:</span>
                <Badge colorClass={priorityBadgeColors[priority]} icon={<Flag size={14} />}>
                  {priority}
                </Badge>
              </span>
            </label>
            <div className="relative h-12">
              <input
                type="range"
                min="0"
                max="2"
                step="1"
                value={Object.keys(priorityMap).find((key) => priorityMap[parseInt(key, 10)] === priority) || 1}
                onChange={handlePriorityChange}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-thumb-red"
              />
              <div className="absolute w-full flex justify-between mt-2 px-1">
                <span className="text-xs text-gray-500">Low</span>
                <span className="text-xs text-gray-500">Medium</span>
                <span className="text-xs text-gray-500">High</span>
              </div>
            </div>
          </div>

          {/* Multi-select Assignee field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Assign To</label>
            <div className={`relative ${formErrors.assignee ? "border-red-500 rounded-lg" : ""}`} ref={assigneeInputRef}>
              <div className={`flex flex-wrap items-center gap-2 p-2 border ${formErrors.assignee ? "border-red-500" : "border-gray-300"} rounded-lg bg-white`} onClick={() => assigneeInputRef.current?.focus()}>
                {assignee.map((memberId) => {
                  const member = assignees.find((m) => m.id === memberId);
                  return (
                    <span key={member?.id} className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium text-indigo-800 bg-indigo-100 rounded-full">
                      <User size={12} className="mr-1" />
                      {member?.name}
                      <button type="button" onClick={() => handleRemoveAssignee(memberId)} className="text-indigo-600 hover:text-indigo-800 focus:outline-none">
                        <X size={12} />
                      </button>
                    </span>
                  );
                })}
                <input
                  type="text"
                  value={assigneeSearchQuery}
                  onChange={(e) => setAssigneeSearchQuery(e.target.value)}
                  onFocus={() => setShowAssigneeSuggestions(true)}
                  placeholder={assignee.length === 0 ? "e.g., Alice Johnson" : ""}
                  className="flex-grow min-w-[5rem] bg-transparent focus:outline-none"
                />
              </div>

              {showAssigneeSuggestions && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {filteredAssignees.length > 0 ? (
                    filteredAssignees.map((member) => (
                      <div key={member.id} className="flex items-center p-3 cursor-pointer hover:bg-gray-100" onClick={() => handleAssigneeChange(member.id)}>
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
            {formErrors.assignee && <p className="text-red-500 text-xs mt-1">{formErrors.assignee}</p>}
          </div>

          <InputField label="Task Deadline" value={deadline} onChange={setDeadline} type="date" error={formErrors.deadline} />

          {/* Textarea for Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                setFormErrors((prev) => ({ ...prev, notes: "" }));
              }}
              rows={3}
              placeholder="Add any additional notes or details about the task."
              className={`mt-1 w-full text-sm border px-3 py-2 rounded-lg focus:outline-none focus:border-red-500 ${formErrors.notes ? "border-red-500" : "border-gray-300"}`}
            />
            {formErrors.notes && <p className="text-red-500 text-xs mt-1">{formErrors.notes}</p>}
          </div>

          <button type="submit" className="btn-primary w-full">
            Save Task
          </button>
        </form>
      </div>

      {/* Right: Add to Project Form */}
      <div className="lg:col-span-6 bg-white p-6 rounded-3xl">
        <h3 className="text-xl font-semibold mb-2">Add Task to Project</h3>
        <p className="text-sm text-gray-500 mb-5">Select a project to add this new task to.</p>
        <label className="mb-1">Search</label>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder=""
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

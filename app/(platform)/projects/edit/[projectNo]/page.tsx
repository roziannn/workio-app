"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { CheckCircle2, Flag, Monitor, Smartphone, Wrench, Search } from "lucide-react";
import Badge from "@/components/Badge";
import InputField from "@/components/InputField";
import { notify } from "@/components/NotifiactionManager";
import { formatRupiah } from "@/utils/currency";
import TextareaField from "@/components/TextareaField";

type Category = "Web App" | "Mobile App" | "Internal Tool";
type Priority = "High" | "Medium" | "Low";

const categories = [
  { id: "Web App", name: "Web App", icon: <Monitor size={16} className="text-indigo-500" /> },
  { id: "Mobile App", name: "Mobile App", icon: <Smartphone size={16} className="text-green-500" /> },
  { id: "Internal Tool", name: "Internal Tool", icon: <Wrench size={16} className="text-orange-500" /> },
];

const mockProjects = [
  {
    projectNo: "PRJ-WEB-202509-001",
    name: "Customer Portal Revamp",
    description: "Redesigning and rebuilding the user-facing customer portal with new features.",
    owner: "Alice Johnson",
    category: "Web App",
    startDate: "2024-01-12",
    endDate: "2024-03-12",
    status: "Active",
    client: "Global Solutions",
    budget: 50000,
    progress: 75,
    priority: "High",
  },
  {
    projectNo: "PRJ-MOB-202509-001",
    name: "E-Commerce Mobile Shop",
    description: "Developing a new mobile application for our e-commerce platform.",
    owner: "Bob Smith",
    category: "Mobile App",
    startDate: "2024-02-01",
    endDate: "2024-04-15",
    status: "Inactive",
    client: "Retail Innovations",
    budget: 75000,
    progress: 20,
    priority: "Medium",
  },
];

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectNo = params.projectNo as string;

  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [client, setClient] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [budget, setBudget] = useState<number>(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const priorityStyles: Record<Priority, string> = {
    High: "bg-red-100 text-red-700 border-red-500",
    Medium: "bg-yellow-100 text-yellow-700 border-yellow-500",
    Low: "bg-green-100 text-green-700 border-green-500",
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const project = mockProjects.find((p) => p.projectNo === projectNo);
      if (project) {
        setName(project.name);
        setDescription(project.description);
        setClient(project.client);
        setPriority(project.priority as Priority);
        setBudget(project.budget);
        setStartDate(project.startDate);
        setEndDate(project.endDate);
        setCategory(project.category as Category);
      } else {
        notify("error", "Project not found.");
        router.push("/projects");
      }
      setIsLoading(false);
    }, 500);
  }, [projectNo, router]);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = "Project name is required.";
    if (!description.trim()) errors.description = "Description is required.";
    if (!client.trim()) errors.client = "Client name is required.";
    if (!category) errors.category = "Please select a category.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      notify("error", "Please fill in all required fields.");
      return;
    }
    const updatedProject = {
      projectNo,
      name,
      description,
      client,
      category,
      priority,
      budget,
      startDate,
      endDate,
    };
    console.log("Update Project:", updatedProject);
    notify("success", "Project updated successfully!");
    router.push("/projects");
  };

  const filteredCategories = categories.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-96">
        <div className="flex flex-col items-center space-y-4 backdrop-blur-md animate-fadeIn">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-700 animate-pulse">Loading data...</p>
        </div>
      </div>
    );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-6 bg-white p-6 rounded-3xl space-y-6">
        <h2 className="text-xl font-semibold mb-1">Edit Project</h2>
        <p className="text-sm text-gray-500 mb-6">Update the details for your project.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField label="Project Number" value={projectNo} onChange={() => {}} type="text" readonly />

          <InputField
            label="Project Name"
            value={name}
            onChange={(val) => {
              setName(val);
              setFormErrors((prev) => ({ ...prev, name: "" }));
            }}
            placeholder="e.g., Website Redesign"
            error={formErrors.name}
          />

          <TextareaField
            label="Description"
            value={description}
            onChange={(val) => {
              setDescription(val);
              setFormErrors((prev) => ({ ...prev, description: "" }));
            }}
            placeholder="Add any additional notes or details about the task."
            error={formErrors.notes}
          />

          <InputField
            label="Client"
            value={client}
            onChange={(val) => {
              setClient(val);
              setFormErrors((prev) => ({ ...prev, client: "" }));
            }}
            placeholder="Client name"
            error={formErrors.client}
          />

          <InputField
            label="Budget"
            type="text"
            value={formatRupiah(budget)}
            onChange={(val) => {
              const raw = parseInt(val.replace(/[^0-9]/g, ""), 10) || 0;
              setBudget(raw);
              setFormErrors((prev) => ({ ...prev, budget: "" }));
            }}
            placeholder="Rp 0"
            error={formErrors.budget}
          />

          <div className="grid grid-cols-2 gap-4 mb-2">
            <InputField label="Start Date" type="date" value={startDate} onChange={setStartDate} error={formErrors.startDate} />
            <InputField label="End Date" type="date" value={endDate} onChange={setEndDate} error={formErrors.endDate} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="inline-flex items-center space-x-2">
                <span>Priority:</span>
                <Badge colorClass={priorityStyles[priority]} icon={<Flag size={14} />}>
                  {priority}
                </Badge>
              </span>
            </label>
            <input
              type="range"
              min={0}
              max={2}
              step={1}
              value={priority === "Low" ? 0 : priority === "Medium" ? 1 : 2}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setPriority(val === 0 ? "Low" : val === 1 ? "Medium" : "High");
              }}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-thumb-red"
            />
            <div className="flex justify-between text-xs mt-1 px-1">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>

          <button type="submit" className="btn-primary w-full">
            Save Changes
          </button>
        </form>
      </div>

      <div className="lg:col-span-6 bg-white p-6 rounded-3xl">
        <h3 className="text-xl font-semibold mb-1">Select Category</h3>
        <p className="text-sm text-gray-500 mb-7">Choose the most suitable category for this project.</p>

        <label>Search</label>
        <div className="relative mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search category..."
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${formErrors.category ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"}`}
          />
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {formErrors.category && <p className="text-red-500 text-xs mt-1">{formErrors.category}</p>}

        <div className="space-y-4">
          {filteredCategories.map((c) => (
            <div
              key={c.id}
              className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${category === c.id ? "bg-indigo-100 border-indigo-500 border-2" : "bg-gray-50 hover:bg-gray-100 border border-transparent"}`}
              onClick={() => {
                setCategory(c.id as Category);
                setFormErrors((prev) => ({ ...prev, category: "" }));
              }}
            >
              <span className="flex items-center gap-2 font-medium text-sm text-gray-800">
                {c.icon} {c.name}
              </span>
              {category === c.id && <CheckCircle2 size={20} className="text-indigo-600" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Flag, Monitor, Smartphone, Wrench, Search } from "lucide-react";
import Badge from "@/components/Badge";
import InputField from "@/components/InputField";
import { notify } from "@/components/NotifiactionManager";
import { formatRupiah } from "@/utils/currency";
import { generateProjectNo } from "@/utils/projectNo";
import { mst_categoryProjects, categoryProjects } from "@/data/dummy/mst_categoryProjects";

type Category = (typeof mst_categoryProjects)[number];
type Priority = "High" | "Medium" | "Low";

const iconMap: Record<"Monitor" | "Smartphone" | "Wrench", React.ReactNode> = {
  Monitor: <Monitor size={16} className="text-slate-500" />,
  Smartphone: <Smartphone size={16} className="text-slate-500" />,
  Wrench: <Wrench size={16} className="text-slate-500" />,
};

const categories = categoryProjects.map((cat) => ({
  id: cat.name,
  name: cat.name,
  icon: iconMap[cat.icon],
}));

export default function CreateProjectPage() {
  const router = useRouter();

  const [projectNo, setProjectNo] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [client, setClient] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [budget, setBudget] = useState("");
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
    if (category) {
      const newProjectNo = generateProjectNo(category, 1);
      setProjectNo(newProjectNo);
    }
  }, [category]);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = "Project name is required.";
    if (!description.trim()) errors.description = "Description is required.";
    if (!client.trim()) errors.client = "Client name is required.";
    if (!budget.trim()) errors.budget = "Budget value is required.";
    if (!category) errors.category = "Please select a category.";
    if (!startDate) errors.startDate = "Please select a start date.";
    if (!endDate) errors.endDate = "Please select a end date.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      notify("error", "Please fill in all required fields.");
      return;
    }

    notify("success", "Project created successfully!");
    router.push("/projects");
  };

  const filteredCategories = categories.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left: Create Project Form */}
      <div className="lg:col-span-6 bg-white p-6 rounded-3xl space-y-6">
        <h2 className="text-xl font-semibold mb-1">New Project</h2>
        <p className="text-sm text-gray-500 mb-6">Fill in the details for your new project.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField label="Project Number" value={projectNo} onChange={() => {}} placeholder="" type="text" error={formErrors.projectNo} readonly />

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

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setFormErrors((prev) => ({ ...prev, description: "" }));
              }}
              rows={3}
              placeholder="Short description..."
              className={`mt-1 w-full text-sm border px-3 py-2 rounded-lg focus:outline-none ${formErrors.description ? "border-red-500" : "border-gray-300"}`}
            />
            {formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>}
          </div>

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

          <InputField label="Budget" type="text" value={formatRupiah(budget)} onChange={(val) => setBudget(val.replace(/[^0-9]/g, ""))} placeholder="Rp 0" error={formErrors.budget} />

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

          <button type="submit" className="btn-secondary w-full">
            Save Project
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

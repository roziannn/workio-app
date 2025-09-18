"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Flag, Monitor, Smartphone, Wrench, Search } from "lucide-react";
import Badge from "@/components/Badge";
import InputField from "@/components/InputField";

type Category = "Web App" | "Mobile App" | "Internal Tool";
type Status = "Active" | "Inactive" | "Completed";
type Priority = "High" | "Medium" | "Low";

const categories = [
  { id: "Web App", name: "Web App", icon: <Monitor size={16} className="text-indigo-500" /> },
  { id: "Mobile App", name: "Mobile App", icon: <Smartphone size={16} className="text-green-500" /> },
  { id: "Internal Tool", name: "Internal Tool", icon: <Wrench size={16} className="text-orange-500" /> },
];

export default function CreateProjectPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [client, setClient] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [status, setStatus] = useState<Status>("Active");
  const [category, setCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const priorityStyles: Record<Priority, string> = {
    High: "bg-red-100 text-red-700 border-red-500",
    Medium: "bg-yellow-100 text-yellow-700 border-yellow-500",
    Low: "bg-green-100 text-green-700 border-green-500",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProject = {
      name,
      description,
      client,
      category,
      priority,
      status,
    };

    console.log("Create Project:", newProject);
    router.push("/projects"); // redirect after create
  };

  const filteredCategories = categories.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left: Create Project Form */}
      <div className="lg:col-span-6 bg-white p-6 rounded-3xl shadow space-y-6">
        <h2 className="text-2xl font-semibold mb-2">New Project</h2>
        <p className="text-gray-500 mb-6">Fill in the details for your new project.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField label="Project Name" value={name} onChange={setName} placeholder="e.g., Website Redesign" />
          <InputField label="Description" value={description} onChange={setDescription} placeholder="Short description..." />
          <InputField label="Client" value={client} onChange={setClient} placeholder="Client name" />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)} className="w-full p-2.5 border border-gray-300 rounded-md text-gray-700 text-sm focus:outline-none">
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <div className="mt-1">
              <Badge colorClass={priorityStyles[priority]} icon={<Flag size={12} />}>
                {priority}
              </Badge>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as Status)} className="w-full p-2.5 border border-gray-300 rounded-md text-gray-700 text-sm focus:outline-none">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <button type="submit" className="btn-primary w-full">
            Save Project
          </button>
        </form>
      </div>

      {/* Right: Choose Category */}
      <div className="lg:col-span-6 bg-white p-6 rounded-3xl shadow">
        <h3 className="text-xl font-semibold mb-2">Select Category</h3>
        <p className="text-gray-500 mb-7">Choose the most suitable category for this project.</p>

        <div className="relative mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search category..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300"
          />
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="space-y-4">
          {filteredCategories.map((c) => (
            <div
              key={c.id}
              className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${category === c.id ? "bg-indigo-100 border-indigo-500 border-2" : "bg-gray-50 hover:bg-gray-100 border border-transparent"}`}
              onClick={() => setCategory(c.id as Category)}
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

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Monitor, Smartphone, Wrench, CheckCircle2, XCircle, Flag } from "lucide-react";
import Badge from "@/components/Badge";
import { formatDate } from "@/utils/dateHelper";
import { notify } from "@/components/NotifiactionManager";

type Category = "Web App" | "Mobile App" | "Internal Tool";
type Priority = "High" | "Medium" | "Low";
type Status = "Active" | "Inactive" | "Completed";

interface Project {
  id: number;
  projectNo: string;
  name: string;
  description: string;
  owner: string;
  category: Category;
  startDate: string;
  endDate: string;
  status: Status;
  client: string;
  budget: number;
  progress: number;
  priority: Priority;
}

interface Document {
  id: number;
  name: string;
  type: string;
  status: Status;
  date: string;
}

interface Task {
  id: number;
  title: string;
  status: Status;
  date: string;
}

const mockProjects: Project[] = [
  {
    id: 1,
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
];

const mockTasks: Task[] = [
  { id: 1, title: "Initial planning", status: "Completed", date: "2024-01-12" },
  { id: 2, title: "Design UI mockup", status: "Completed", date: "2024-01-20" },
  { id: 3, title: "Backend API development", status: "Active", date: "2024-02-05" },
  { id: 4, title: "Testing & QA", status: "Inactive", date: "2024-02-25" },
];

const mockDocuments: Document[] = [
  { id: 1, name: "Project Proposal", type: "PDF", status: "Completed", date: "2024-01-10" },
  { id: 2, name: "Design Mockup", type: "PNG", status: "Active", date: "2024-01-15" },
  { id: 3, name: "API Documentation", type: "DOCX", status: "Inactive", date: "2024-02-01" },
];

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectNo = params.projectNo as string;

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const p = mockProjects.find((proj) => proj.projectNo === projectNo);
      if (!p) {
        notify("error", "Project not found.");
        router.push("/projects");
      } else {
        setProject(p);
      }
      setIsLoading(false);
    }, 500);
  }, [projectNo, router]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-96">
        <div className="flex flex-col items-center space-y-4 backdrop-blur-md animate-fadeIn">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-700 animate-pulse">Loading data...</p>
        </div>
      </div>
    );

  if (!project) return null;

  const getCategoryIcon = (category: Category) => {
    switch (category) {
      case "Web App":
        return <Monitor className="h-5 w-5 text-blue-600" />;
      case "Mobile App":
        return <Smartphone className="h-5 w-5 text-yellow-600" />;
      case "Internal Tool":
        return <Wrench className="h-5 w-5 text-purple-600" />;
      default:
        return null;
    }
  };

  const statusStyles: Record<Status, string> = {
    Active: "bg-green-100 text-green-700 border-green-500",
    Inactive: "bg-red-100 text-red-700 border-red-500",
    Completed: "bg-blue-100 text-blue-700 border-blue-500",
  };

  const priorityStyles: Record<Priority, string> = {
    High: "bg-red-100 text-red-700 border-red-500",
    Medium: "bg-yellow-100 text-yellow-700 border-yellow-500",
    Low: "bg-green-100 text-green-700 border-green-500",
  };

  return (
    <div className="min-h-screen bg-white rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="p-4 rounded-full bg-gray-100">{getCategoryIcon(project.category)}</div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">{project.name}</h1>
            <p className="text-sm text-gray-500">{project.projectNo}</p>
          </div>
        </div>

        <button onClick={() => router.push("/projects")} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition">
          Back
        </button>
      </div>

      <div className="w-full mb-8">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-700">{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div className="h-4 bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${project.progress}%` }}></div>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-gray-800 mb-2">Project Info</h2>
      <div className="rounded-xl grid grid-cols-1 md:grid-cols-2 divide-x divide-dashed divide-gray-400 mb-4">
        <div>
          {[
            { label: "Client", value: project.client },
            { label: "Owner", value: project.owner },
            { label: "Category", value: project.category },
            {
              label: "Priority",
              value: (
                <Badge colorClass={priorityStyles[project.priority]} icon={<Flag size={12} />}>
                  {project.priority}
                </Badge>
              ),
            },
          ].map((item, index) => (
            <div key={index} className="flex justify-between items-center p-3">
              <span className="font-medium">{item.label}</span>
              <span className="text-gray-700">{item.value}</span>
            </div>
          ))}
        </div>

        <div>
          {[
            {
              label: "Status",
              value: (
                <Badge colorClass={statusStyles[project.status]} icon={<CheckCircle2 size={14} />}>
                  {project.status}
                </Badge>
              ),
            },
            { label: "Budget", value: project.budget.toLocaleString("id-ID", { style: "currency", currency: "IDR" }) },
            { label: "Start Date", value: formatDate(project.startDate) },
            { label: "End Date", value: formatDate(project.endDate) },
          ].map((item, index) => (
            <div key={index} className="flex justify-between items-center p-3">
              <span className="font-medium">{item.label}</span>
              <div className="flex items-center">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
        <p className="text-gray-700">{project.description}</p>
      </div>

      {/* Task History */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Task History</h2>
        <ul className="space-y-2">
          {mockTasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition">
              <span>{task.title}</span>
              <div className="flex items-center space-x-2">
                {task.status === "Active" && <CheckCircle2 className="text-green-600" />}
                {task.status === "Inactive" && <XCircle className="text-red-600" />}
                {task.status === "Completed" && <Flag className="text-blue-600" />}
                <span className="text-sm text-slate-600">{formatDate(task.date)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Documents Related</h2>
        <ul className="space-y-2">
          {mockDocuments.map((doc) => (
            <li key={doc.id} className="flex justify-between items-center p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition">
              <div className="flex flex-col">
                <span className="mb-1">{doc.name}</span>
                <span className="text-sm font-medium text-slate-500">{doc.type}</span>
              </div>
              <div className="flex items-center space-x-2">
                {doc.status === "Active" && <CheckCircle2 className="text-green-600" />}
                {doc.status === "Inactive" && <XCircle className="text-red-600" />}
                {doc.status === "Completed" && <Flag className="text-blue-600" />}
                <span className="text-sm text-slate-600">{formatDate(doc.date)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

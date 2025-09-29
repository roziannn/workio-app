"use client";

import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from "chart.js";
import { FolderOpen, CheckCircle2, CalendarClock, Clock, Target, Flag } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement);

export default function OverviewPage() {
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt"],
    datasets: [
      {
        label: "Completed Tasks",
        data: [15, 20, 18, 25, 30, 22, 28, 32, 35, 29],
        fill: true,
        borderColor: "#FF0B55",
        backgroundColor: "rgba(255, 11, 85, 0.15)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#FF0B55",
      },
      {
        label: "In Progress Tasks",
        data: [10, 12, 14, 18, 20, 17, 19, 21, 23, 20],
        fill: true,
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.15)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#3B82F6",
      },
    ],
  };

  const projectCategories = {
    labels: ["Web App", "Mobile App", "Internal Tool"],
    datasets: [
      {
        label: "Projects",
        data: [6, 5, 4],
        backgroundColor: ["#3B82F6", "#10B981", "#F59E0B"],
        borderRadius: 6,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
        maxBarThickness: 40,
      },
    ],
  };

  const tasksDueToday = [
    { id: 1, name: "Finalize marketing report", dueTime: "09:30", priority: "High" },
    { id: 2, name: "Review Q3 budget proposal", dueTime: "11:00", priority: "Medium" },
    { id: 3, name: "Prepare client presentation", dueTime: "13:15", priority: "High" },
    { id: 4, name: "Update project timeline", dueTime: "14:00", priority: "Low" },
  ];

  const priorityColors: Record<string, string> = {
    High: "text-red-600 bg-red-100",
    Medium: "text-yellow-600 bg-yellow-100",
    Low: "text-green-600 bg-green-100",
  };

  return (
    <div className="space-y-6 pb-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 bg-white p-4 sm:p-6 rounded-3xl flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <FolderOpen className="text-[#FF0B55] w-5 h-5 sm:w-6 sm:h-6" />
              <h2 className="text-sm sm:text-md font-semibold text-slate-600">Total Projects</h2>
            </div>
          </div>
          <div className="h-[150px] sm:h-[180px]">
            <Bar
              data={projectCategories}
              options={{
                indexAxis: "y",
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: {
                    beginAtZero: true,
                    grid: { display: false },
                    ticks: { font: { size: 12 } },
                  },
                  y: {
                    grid: { display: false },
                    ticks: { font: { size: 12 } },
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="lg:col-span-8 bg-white p-4 sm:p-6 rounded-3xl h-[250px] sm:h-[300px]">
          <h2 className="text-sm sm:text-md font-semibold text-slate-600 mb-4 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF0B55]" />
            <span>Task Productivity (Last 10 Months)</span>
          </h2>
          <Line
            data={lineData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              layout: { padding: { bottom: 52 } },
              plugins: {
                legend: { position: "top", labels: { color: "#555" } },
              },
              scales: {
                x: { grid: { display: false }, ticks: { color: "#555" } },
                y: {
                  beginAtZero: true,
                  grid: { display: false },
                  ticks: { color: "#555" },
                },
              },
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7 bg-white p-4 sm:p-6 rounded-3xl flex flex-col">
          <h2 className="text-sm sm:text-md font-semibold text-slate-600 mb-4 flex items-center space-x-2">
            <CalendarClock className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF0B55]" />
            <span>Tasks Due Today</span>
          </h2>

          <ul className="space-y-2 sm:space-y-3 max-h-64 overflow-y-auto custom-scroll pr-2">
            {tasksDueToday.map((task, index) => (
              <li key={task.id} className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50">
                <span className="w-6 text-sm font-semibold text-gray-500">{index + 1}.</span>
                <span className="flex-1 text-sm text-gray-700 truncate ml-2">{task.name}</span>
                <span className={`w-[100px] flex items-center justify-center px-2 py-1 rounded-lg text-xs font-medium mx-2 ${priorityColors[task.priority]}`}>
                  <Flag className="w-3 h-3 mr-1" />
                  {task.priority}
                </span>
                <div className="flex items-center justify-end font-semibold text-red-600 text-sm w-[70px]">
                  <Clock className="w-4 h-4 text-red-600 mr-1" />
                  <span>{task.dueTime}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-5 bg-white p-4 sm:p-6 rounded-3xl flex flex-col justify-center items-center">
          <h2 className="text-sm sm:text-md font-semibold text-slate-600 mb-2 flex items-center space-x-2">
            <Target className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF0B55]" />
            <span>Upcoming Milestone</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 text-center">Client presentation due next week</p>
        </div>
      </div>
    </div>
  );
}

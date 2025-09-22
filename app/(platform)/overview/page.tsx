"use client";
import { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from "chart.js";
import { FolderOpen, Calendar, CheckCircle2, CalendarClock } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement);

export default function OverviewPage() {
  // Dummy data
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
    datasets: [
      {
        label: "Completed Tasks",
        data: [15, 20, 18, 25, 30, 22],
        fill: true,
        borderColor: "#FF0B55",
        backgroundColor: "rgba(255, 11, 85, 0.15)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#FF0B55",
      },
    ],
  };

  const projectCategories = {
    labels: ["Web App", "Mobile App", "Internal Tool"],
    datasets: [
      {
        label: "Projects",
        data: [6, 5, 4],
        backgroundColor: ["#7050FF", "#7ED957", "#FF8225"],
        borderRadius: 8,
      },
    ],
  };

  const tasksDueToday = [
    { id: 1, name: "Finalize marketing report", status: "In Progress" },
    { id: 2, name: "Review Q3 budget proposal", status: "To Do" },
    { id: 3, name: "Prepare client presentation", status: "Done" },
    { id: 4, name: "Update project timeline", status: "To Do" },
    { id: 5, name: "Check emails", status: "In Progress" },
    { id: 6, name: "Team meeting", status: "To Do" },
    { id: 7, name: "Submit invoice", status: "Done" },
    { id: 8, name: "Design mockups", status: "In Progress" },
    { id: 9, name: "Plan workshop", status: "To Do" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  const totalPages = Math.ceil(tasksDueToday.length / tasksPerPage);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;

  return (
    <div className="space-y-6 pb-6 px-0 lg:mx-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 bg-white p-4 sm:p-6 rounded-3xl flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <FolderOpen className="text-[#FF0B55] w-5 h-5 sm:w-6 sm:h-6" />
              <h2 className="text-sm sm:text-md font-semibold text-slate-600">Total Projects</h2>
            </div>
            <span className="text-2xl sm:text-4xl font-semibold text-gray-400">15</span>
          </div>
          <div className="h-[150px] sm:h-[180px]">
            <Bar
              data={projectCategories}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: { grid: { display: false }, ticks: { font: { size: 12 } } },
                  y: { beginAtZero: true, grid: { display: false }, ticks: { stepSize: 1, font: { size: 12 } } },
                },
              }}
            />
          </div>
        </div>

        <div className="lg:col-span-8 bg-white p-4 sm:p-6 rounded-3xl h-[250px] sm:h-[300px]">
          <h2 className="text-sm sm:text-md font-semibold text-slate-600 mb-4 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF0B55]" />
            <span>Task Productivity (Last 6 Months)</span>
          </h2>
          <Line
            data={lineData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              layout: { padding: { bottom: 52 } },
              plugins: { legend: { position: "top", labels: { color: "#555" } } },
              scales: {
                x: { grid: { display: false }, ticks: { color: "#555" } },
                y: { beginAtZero: true, grid: { display: false }, ticks: { color: "#555" } },
              },
            }}
          />
        </div>
      </div>

      {/* Tasks Milestone */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7 bg-white p-4 sm:p-6 rounded-3xl flex flex-col">
          <h2 className="text-sm sm:text-md font-semibold text-slate-600 mb-4 flex items-center space-x-2">
            <CalendarClock className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF0B55]" />
            <span>Tasks Due Today</span>
          </h2>

          {/* Scrollable list */}
          <ul className="space-y-2 sm:space-y-3 max-h-64 overflow-y-auto custom-scroll pr-2">
            {tasksDueToday.map((task) => (
              <li key={task.id} className="flex flex-wrap justify-between items-center px-3 sm:px-4 py-2 sm:py-3 rounded-full bg-slate-50 hover:bg-slate-100 transition">
                <span className="text-xs sm:text-sm text-gray-700">{task.name}</span>
                <span
                  className={`text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 sm:py-2 rounded-full ${
                    task.status === "Done" ? "bg-[#E8F7F4] text-green-600" : task.status === "In Progress" ? "bg-[#FFF2EB] text-orange-600" : "bg-blue-100 text-blue-500"
                  }`}
                >
                  {task.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Upcoming Milestone */}
        <div className="md:col-span-5 bg-white p-4 sm:p-6 rounded-3xl flex flex-col justify-center items-center">
          <h2 className="text-sm sm:text-md font-semibold text-slate-600 mb-2 flex items-center space-x-2">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF0B55]" />
            <span>Upcoming Milestone</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 text-center">Client presentation due next week</p>
        </div>
      </div>
    </div>
  );
}

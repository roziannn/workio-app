"use client";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function OverviewCharts() {
  const pieData = {
    labels: ["To Do", "In Progress", "Done"],
    datasets: [
      {
        label: "Tasks",
        data: [12, 8, 20],
        backgroundColor: ["#FF0B55", "#FFA500", "#00C851"],
        borderRadius: 6,
      },
    ],
  };

  const barData = {
    labels: ["Alice", "Bob", "Charlie", "David"],
    datasets: [
      {
        label: "Tasks",
        data: [5, 8, 12, 7],
        backgroundColor: "#FF0B55",
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Task Status</h2>
        <Pie data={pieData} />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Tasks per Team Member</h2>
        <Bar data={barData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
      </div>
    </div>
  );
}

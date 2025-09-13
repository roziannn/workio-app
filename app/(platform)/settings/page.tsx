"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Bell } from "lucide-react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const ToggleSwitch = ({ enabled, onChange, color = "bg-green-500" }: { enabled: boolean; onChange: () => void; color?: string }) => (
    <button onClick={onChange} className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none ${enabled ? color : "bg-gray-200"}`}>
      <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${enabled ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-12 bg-white p-4 sm:p-6 rounded-3xl flex flex-col space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-5">Settings</h2>

        {/* Dark Mode Card */}
        <div className="bg-white px-6 py-5 hover:bg-gray-50 transition flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700">{darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5 text-yellow-500" />}</div>
            <div className="flex flex-col">
              <span className="text-gray-800 text-sm font-semibold mb-1">Dark Mode</span>
              <span className="text-gray-500 text-sm">Toggle between light and dark themes for the website interface.</span>
            </div>
          </div>
          <ToggleSwitch enabled={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </div>

        {/* Notifications Card */}
        <div className="bg-white px-6 py-4 hover:bg-gray-50 transition flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700">
              <Bell className="h-5 w-5 text-gray-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-gray-800 text-sm font-semibold mb-1">Enable Notifications</span>
              <span className="text-gray-500 text-sm">Receive alerts for new updates and important announcements.</span>
            </div>
          </div>
          <ToggleSwitch enabled={notifications} onChange={() => setNotifications(!notifications)} color="bg-green-500" />
        </div>
      </div>
    </div>
  );
}

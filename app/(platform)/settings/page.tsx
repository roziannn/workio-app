"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Bell } from "lucide-react";
import ToggleSwitch from "@/components/Toggle";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState<"Active" | "Inactive">("Inactive");
  const [notifications, setNotifications] = useState<"Active" | "Inactive">("Active");

  useEffect(() => {
    if (darkMode === "Active") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-12 bg-white p-4 sm:p-6 rounded-3xl flex flex-col space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-5">Settings</h2>
        <div className="bg-white px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700">{darkMode === "Active" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5 text-yellow-500" />}</div>
            <div className="flex flex-col">
              <span className="text-gray-800 text-sm font-semibold mb-1">Dark Mode</span>
              <span className="text-gray-500 text-sm">Toggle between light and dark themes for the website interface.</span>
            </div>
          </div>
          <ToggleSwitch status={darkMode} onChange={setDarkMode} />
        </div>

        <div className="bg-white px-6 py-4  transition flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700">
              <Bell className="h-5 w-5 text-gray-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-gray-800 text-sm font-semibold mb-1">Enable Notifications</span>
              <span className="text-gray-500 text-sm">Receive alerts for new updates and important announcements.</span>
            </div>
          </div>
          <ToggleSwitch status={notifications} onChange={setNotifications} activeColor="bg-green-500" />
        </div>
      </div>
    </div>
  );
}

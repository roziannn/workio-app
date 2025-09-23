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
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Settings</h2>

        {/* Dark Mode */}
        <div className="bg-white px-4 py-4 flex items-center justify-between w-full gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 flex-shrink-0">{darkMode === "Active" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5 text-yellow-500" />}</div>
            <div className="flex flex-col">
              <span className="text-gray-800 text-sm font-semibold mb-1">Dark Mode</span>
              <span className="text-gray-500 text-xs sm:text-sm w-45 lg:w-full">Toggle between light and dark themes for the website interface.</span>
            </div>
          </div>
          <ToggleSwitch status={darkMode} onChange={setDarkMode} />
        </div>

        {/* Notifications */}
        <div className="bg-white px-4 py-4 flex items-center justify-between w-full gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 flex-shrink-0">
              <Bell className="h-5 w-5 text-gray-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-gray-800 text-sm font-semibold mb-1">Enable Notifications</span>
              <span className="text-gray-500 text-xs sm:text-sm w-45 lg:w-full">Receive alerts for new updates and important announcements.</span>
            </div>
          </div>
          <ToggleSwitch status={notifications} onChange={setNotifications} activeColor="bg-green-500" />
        </div>
      </div>
    </div>
  );
}

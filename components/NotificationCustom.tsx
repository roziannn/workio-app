"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";

type NotificationType = "success" | "error" | "info" | "warning";

interface NotificationItem {
  id: number;
  type: NotificationType;
  message: string;
}

export default function NotificationManager() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      const id = Date.now();
      setNotifications((prev) => [...prev, { id, ...e.detail }]);

      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 3000);
    };

    window.addEventListener("show-notification", handler as EventListener);
    return () => window.removeEventListener("show-notification", handler as EventListener);
  }, []);

  const icons = {
    success: <CheckCircle className="text-green-500" size={20} />,
    error: <XCircle className="text-red-500" size={20} />,
    info: <Info className="text-blue-500" size={20} />,
    warning: <AlertTriangle className="text-yellow-500" size={20} />,
  };

  return (
    <div className="fixed top-5 left-1/2 z-50 flex flex-col gap-3 -translate-x-1/2">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg bg-white/30 backdrop-blur-md border border-white/20"
          >
            {icons[n.type]}
            <p className="text-sm font-medium text-gray-800">{n.message}</p>
            <button onClick={() => setNotifications((prev) => prev.filter((item) => item.id !== n.id))} className="ml-2 text-gray-500 hover:text-gray-700">
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

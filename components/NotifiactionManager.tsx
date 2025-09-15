"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle, Info, AlertTriangle, X, CheckCircle22 } from "lucide-react";

type NotificationType = "success" | "error" | "info" | "warning";

interface NotificationItem {
  id: number;
  type: NotificationType;
  message: string;
}

let notifyFn: (type: NotificationType, message: string) => void;

export function notify(type: NotificationType, message: string) {
  if (notifyFn) {
    notifyFn(type, message);
  } else {
    console.warn("Notification system belum siap");
  }
}

export default function NotificationManager() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    notifyFn = (type, message) => {
      const id = Date.now();
      setNotifications((prev) => [...prev, { id, type, message }]);

      // Auto remove setelah 3 detik
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 3500);
    };
  }, []);

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pointer-events-none">
      <div className="mt-3 space-y-2 max-w-md px-4 pointer-events-auto">
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="flex items-center space-x-2 
             bg-white/30 backdrop-blur-lg border border-white/20
             rounded-xl shadow-xl p-5"
            >
              {getIcon(n.type)}
              <span className="text-sm text-gray-900 font-medium">{n.message}</span>
              <button onClick={() => setNotifications((prev) => prev.filter((x) => x.id !== n.id))}>
                <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

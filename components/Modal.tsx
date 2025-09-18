"use client";

import { ReactNode, useEffect, useState } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  title?: string;
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      // delay hide untuk animasi keluar
      const timeout = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 bg-opacity-50 backdrop-blur-xs flex items-center justify-center z-50 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"} bg-black/10 backdrop-blur-sm`}>
      <div className={`bg-white rounded-3xl p-6 w-full max-w-md relative shadow-lg transform transition-transform duration-200 ${isOpen ? "scale-100" : "scale-90"}`}>
        <div className="flex items-center justify-between mb-6">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X />
          </button>
        </div>

        <div className="flex flex-col gap-1">{children}</div>
      </div>
    </div>
  );
}

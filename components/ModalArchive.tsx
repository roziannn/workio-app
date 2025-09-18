"use client";

import Modal from "./Modal";
import { Archive, Loader2 } from "lucide-react";
import { useState } from "react";

interface ModalArchiveProps {
  isOpen: boolean;
  onClose: () => void;
  onArchive: (id: number) => void;
  itemId: number;
  itemName?: string;
}

export default function ModalArchive({ isOpen, onClose, onArchive, itemId, itemName }: ModalArchiveProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleArchiveClick = async () => {
    setIsLoading(true);

    // Simulate an async operation like an API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulating API call duration
      onArchive(itemId);
      onClose();
    } catch (error) {
      console.error("Failed to archive item", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Archive Item">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center p-5 mb-5 rounded-full bg-slate-100">
          <Archive size={28} className="text-slate-500" />
        </div>

        <p className="text-center text-gray-800 text-lg sm:text-xl font-medium mb-4">
          Are you sure you want to archive
          <span className="font-bold text-yellow-500">{" " + itemName + " " || "this item"}</span>?
        </p>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button onClick={onClose} disabled={isLoading} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed">
          Cancel
        </button>
        <button
          onClick={handleArchiveClick}
          disabled={isLoading}
          className="
            px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition 
            flex items-center justify-center gap-2
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Archiving...
            </>
          ) : (
            "Archive"
          )}
        </button>
      </div>
    </Modal>
  );
}

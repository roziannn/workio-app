"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import TextareaField from "@/components/TextareaField";
import { notify } from "@/components/NotifiactionManager";
import { formatDate } from "@/utils/dateHelper";

interface CommentDrawerProps {
  isOpen: boolean;
  documentNo: string;
  onClose: () => void;
}

interface Comment {
  id: number;
  author: string;
  message: string;
  createdAt: string;
  jobTitle: string;
}

const mockComments: Record<string, Comment[]> = {
  "DOC-2025-001": [
    {
      id: 1,
      author: "Polly",
      message: "After reviewing the project brief, I noticed that the timeline for the authentication module seems too tight. We may need at least one additional sprint.",
      createdAt: new Date().toISOString(),
      jobTitle: "Software Architect",
    },
  ],
  "DOC-2025-002": [
    {
      id: 1,
      author: "Charlie",
      message: "Legal terms look fine, but we should double-check with finance team.",
      createdAt: new Date().toISOString(),
      jobTitle: "Finance Manager",
    },
  ],
};

export default function CommentDrawer({ isOpen, documentNo, onClose }: CommentDrawerProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setComments(mockComments[documentNo] || []);
    }
  }, [isOpen, documentNo]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: comments.length + 1,
      author: "You",
      message: newComment,
      createdAt: new Date().toISOString(),
      jobTitle: "Software Engineer",
    };
    setComments([comment, ...comments]);
    notify("success", "Comment added!");
    setNewComment("");
  };

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setIsMounted(false);
    }
  };

  if (!isMounted && !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className={`absolute inset-0 bg-opacity-50 backdrop-blur-xs transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`} onClick={onClose} />

      {/* Drawer */}
      <div
        className={`absolute right-0 top-0 h-full w-96 bg-white shadow-2xl rounded-l-2xl transform transition-transform duration-500 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-5">
            <h2 className="text-lg font-semibold text-gray-800">Comments</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={20} />
            </button>
          </div>

          {/* List Comments */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {comments.length === 0 ? (
              <p className="text-gray-500 text-sm">No comments yet.</p>
            ) : (
              comments.map((c) => (
                <div key={c.id} className="p-3 rounded-lg bg-gray-50 flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF0B55] to-[#FF8225] flex items-center justify-center text-white font-bold">{c.author.charAt(0)}</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">{c.author}</p>
                    <p className="text-xs text-gray-500 mb-1">{c.jobTitle}</p>
                    <p className="text-sm text-gray-700 mb-1">{c.message}</p>
                    <span className="text-xs text-gray-400">{formatDate(c.createdAt)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="p-5 mb-5">
            <TextareaField label="" value={newComment} onChange={setNewComment} placeholder="Write a comment..." rows={3} />
            <button onClick={handleAddComment} className="btn-secondary">
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

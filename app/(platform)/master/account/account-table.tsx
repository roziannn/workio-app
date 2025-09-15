"use client";

import { Pencil, CheckCircle2, XCircle } from "lucide-react";
import Badge from "@/components/Badge";

export interface UserAccount {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
}

interface AccountTableProps {
  users: UserAccount[];
  statusStyles: Record<UserAccount["status"], string>;
  onEdit: (user: UserAccount) => void;
}

export default function AccountTable({ users, statusStyles, onEdit }: AccountTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="bg-white hover:bg-gray-50 rounded-2xl mb-2">
              <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF0B55] to-[#FF8225] flex items-center justify-center text-white font-bold">{user.name.charAt(0)}</div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <p className="text-sm text-gray-700">{user.email}</p>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <p className="text-sm text-gray-700">{user.role}</p>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-center">
                <Badge colorClass={statusStyles[user.status]} icon={user.status === "Active" ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}>
                  {user.status}
                </Badge>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-right flex justify-end space-x-2">
                <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-gray-700" onClick={() => onEdit(user)}>
                  <Pencil size={16} />
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

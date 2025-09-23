"use client";

import { CheckCircle2, XCircle, EditIcon } from "lucide-react";
import Badge from "@/components/Badge";
import { formatDate } from "@/utils/dateHelper";

export interface Category {
  id: number;
  name: string;
  status: "Active" | "Inactive";
  icon: "Monitor" | "Smartphone" | "Wrench";
  createdAt: string;
}

interface CategoryTableProps {
  categories: Category[];
  statusStyles: Record<Category["status"], string>;
  onEdit: (category: Category) => void;
}

export default function CategoryTable({ categories, statusStyles, onEdit }: CategoryTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
            <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Icon</th>
            <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">CreatedAt</th>
            <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="mb-2 border-b border-slate-200">
              <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-800">{category.name}</td>

              <td className="px-5 py-3 whitespace-nowrap">
                <Badge colorClass={statusStyles[category.status]} icon={category.status === "Active" ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}>
                  {category.status}
                </Badge>
              </td>

              <td className="px-5 py-3 whitespace-nowrap">
                <p className="text-sm text-gray-700">{category.icon}</p>
              </td>
              <td className="px-5 py-3 whitespace-nowrap">
                <p className="text-sm text-gray-700">{formatDate(category.createdAt)}</p>
              </td>

              <td className="px-5 py-3 whitespace-nowrap flex space-x-2">
                <button className="p-2 rounded-lg hover:bg-slate-200 text-gray-700" onClick={() => onEdit(category)}>
                  <EditIcon size={16} />
                </button>
              </td>
            </tr>
          ))}
          {categories.length === 0 && (
            <tr>
              <td colSpan={4} className="px-5 py-3 text-center text-sm text-gray-500">
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

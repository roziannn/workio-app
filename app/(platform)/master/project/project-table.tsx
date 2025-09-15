"use client";

import { Pencil, CheckCircle2, XCircle } from "lucide-react";
import Badge from "@/components/Badge";

export interface Category {
  id: number;
  name: string;
  status: "Active" | "Inactive";
  icon: "Monitor" | "Smartphone" | "Wrench";
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
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Icon</th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="bg-white hover:bg-gray-50 rounded-2xl mb-2">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{category.name}</td>

              <td className="px-6 py-4 whitespace-nowrap text-center">
                <Badge colorClass={statusStyles[category.status]} icon={category.status === "Active" ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}>
                  {category.status}
                </Badge>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-center">
                <p className="text-sm text-gray-700">{category.icon}</p>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-right flex justify-end space-x-2">
                <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-gray-700" onClick={() => onEdit(category)}>
                  <Pencil size={16} />
                </button>
              </td>
            </tr>
          ))}
          {categories.length === 0 && (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

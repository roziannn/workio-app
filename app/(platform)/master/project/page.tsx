"use client";

import { useState } from "react";
import DataListHeader from "@/components/DataListHeader";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal";
import InputField from "@/components/InputField";
import InputLabel from "@/components/Label";
import ToggleSwitch from "@/components/Toggle";
import CategoryTable from "../project/project-table";

interface Category {
  id: number;
  name: string;
  status: "Active" | "Inactive";
  icon: "Monitor" | "Smartphone" | "Wrench";
}

const categories: Category[] = [
  { id: 1, name: "Web App", status: "Active", icon: "Monitor" },
  { id: 2, name: "Mobile App", status: "Active", icon: "Smartphone" },
  { id: 3, name: "Internal Tool", status: "Inactive", icon: "Wrench" },
];

const iconOptions: Category["icon"][] = ["Monitor", "Smartphone", "Wrench"];

export default function ProjectCategoryPage() {
  const [categoryList, setCategoryList] = useState<Category[]>(categories);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [icon, setIcon] = useState<"" | Category["icon"]>("");
  const [errors, setErrors] = useState<{ name?: string; icon?: string }>({});

  const itemsPerPage = 5;
  const filterOptions = ["All", "Active", "Inactive"];
  const filteredCategories = statusFilter === "All" ? categoryList : categoryList.filter((c) => c.status === statusFilter);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirst, indexOfLast);

  const statusStyles: Record<Category["status"], string> = {
    Active: "bg-green-100 text-green-700 border-green-500",
    Inactive: "bg-red-100 text-red-700 border-red-500",
  };

  const resetForm = () => {
    setName("");
    setStatus("Active");
    setIcon("");
    setErrors({});
    setEditingCategoryId(null);
    setModalMode("add");
  };

  const validateForm = () => {
    const newErrors: { name?: string; icon?: string } = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!icon) newErrors.icon = "Icon is required";
    return newErrors;
  };

  const handleSaveCategory = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const validIcon = icon as Category["icon"];

    if (modalMode === "add") {
      const newCategory: Category = {
        id: categoryList.length + 1,
        name,
        status,
        icon: validIcon,
      };
      setCategoryList([newCategory, ...categoryList]);
    } else if (modalMode === "edit" && editingCategoryId !== null) {
      setCategoryList(categoryList.map((c) => (c.id === editingCategoryId ? { ...c, name, status, icon: validIcon } : c)));
    }

    resetForm();
    setShowModal(false);
  };

  const handleEditCategory = (category: Category) => {
    setModalMode("edit");
    setEditingCategoryId(category.id);
    setName(category.name);
    setStatus(category.status);
    setIcon(category.icon);
    setShowModal(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-12 bg-white p-4 sm:p-6 rounded-3xl flex flex-col">
        <DataListHeader
          title="Project Categories"
          total={filteredCategories.length}
          filterOptions={filterOptions}
          selectedFilter={statusFilter}
          onFilterChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
          onAddNew={() => {
            resetForm();
            setModalMode("add");
            setShowModal(true);
          }}
        />

        <CategoryTable categories={currentCategories} statusStyles={statusStyles} onEdit={handleEditCategory} />

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

        {showModal && (
          <Modal
            isOpen={showModal}
            onClose={() => {
              resetForm();
              setShowModal(false);
            }}
            title={modalMode === "add" ? "Add New Category" : "Edit Category"}
          >
            <InputField label="Category Name" value={name} onChange={setName} placeholder="Category Name" error={errors.name} />

            <InputLabel label="Icon">
              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value as Category["icon"])}
                className={`w-full p-2.5 border rounded-md text-gray-700 text-sm bg-white cursor-pointer focus:border-red-500 appearance-none ${errors.icon ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">Select an icon</option>
                {iconOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.icon && <p className="text-red-500 text-xs mt-1">{errors.icon}</p>}
            </InputLabel>

            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-700 text-sm font-medium">Status</span>
              <ToggleSwitch status={status} onChange={setStatus} activeColor="bg-green-500" />
            </div>

            <button onClick={handleSaveCategory} className="btn-secondary">
              {modalMode === "add" ? "Add Category" : "Save Changes"}
            </button>
          </Modal>
        )}
      </div>
    </div>
  );
}

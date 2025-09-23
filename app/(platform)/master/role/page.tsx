"use client";

import { useState } from "react";
import { Pencil, CheckCircle2, XCircle } from "lucide-react";
import DataListHeader from "@/components/DataListHeader";
import Badge from "@/components/Badge";
import Modal from "@/components/Modal";
import InputField from "@/components/InputField";
import ToggleSwitch from "@/components/Toggle";
import Pagination from "@/components/Pagination";
import { notify } from "@/components/NotifiactionManager";

interface Role {
  id: number;
  name: string;
  status: "Active" | "Inactive";
}

const initialRoles: Role[] = [
  { id: 1, name: "Programmer", status: "Active" },
  { id: 2, name: "IT Lead", status: "Active" },
  { id: 3, name: "Developer", status: "Active" },
  { id: 5, name: "Senior Developer", status: "Active" },
  { id: 6, name: "Administrator", status: "Inactive" },
  { id: 7, name: "Architect/Designer", status: "Active" },
];

export default function RolePage() {
  const [roleList, setRoleList] = useState(initialRoles);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingRoleId, setEditingRoleId] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [status, setStatus] = useState<Role["status"]>("Active");
  const [errors, setErrors] = useState<{ name?: string }>({});

  const itemsPerPage = 10;
  const filterOptions = ["All", "Active", "Inactive"];
  const filteredRoles = statusFilter === "All" ? roleList : roleList.filter((r) => r.status === statusFilter);

  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentRoles = filteredRoles.slice(indexOfFirst, indexOfLast);

  const statusStyles: Record<Role["status"], string> = {
    Active: "bg-green-100 text-green-700 border-green-500",
    Inactive: "bg-red-100 text-red-700 border-red-500",
  };

  const resetForm = () => {
    setName("");
    setStatus("Active");
    setErrors({});
    setEditingRoleId(null);
    setModalMode("add");
  };

  const validateForm = () => {
    const newErrors: { name?: string } = {};
    if (!name.trim()) newErrors.name = "Role name is required";
    return newErrors;
  };

  const handleSaveRole = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (modalMode === "add") {
      const newRole: Role = {
        id: roleList.length + 1,
        name,
        status,
      };
      setRoleList([newRole, ...roleList]);
      notify("success", "Role added successfully!");
    } else if (modalMode === "edit" && editingRoleId !== null) {
      setRoleList(roleList.map((r) => (r.id === editingRoleId ? { ...r, name, status } : r)));
      notify("success", "Role updated successfully!");
    }

    resetForm();
    setShowModal(false);
  };

  const handleEditRole = (role: Role) => {
    setModalMode("edit");
    setEditingRoleId(role.id);
    setName(role.name);
    setStatus(role.status);
    setShowModal(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-12 bg-white p-4 sm:p-6 rounded-3xl flex flex-col">
        <DataListHeader
          title="Roles"
          total={filteredRoles.length}
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

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role Name</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRoles.map((role) => (
                <tr key={role.id} className="bg-white hover:bg-gray-50 rounded-2xl mb-2">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{role.name}</td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Badge colorClass={statusStyles[role.status]} icon={role.status === "Active" ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}>
                      {role.status}
                    </Badge>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right flex justify-end space-x-2">
                    <button onClick={() => handleEditRole(role)} className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-gray-700">
                      <Pencil size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {currentRoles.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                    No roles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

        {showModal && (
          <Modal
            isOpen={showModal}
            onClose={() => {
              resetForm();
              setShowModal(false);
            }}
            title={modalMode === "add" ? "Add New Role" : "Edit Role"}
          >
            <InputField label="Role Name" value={name} onChange={setName} placeholder="Role Name" error={errors.name} />

            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-700 text-sm font-medium">Status</span>
              <ToggleSwitch status={status} onChange={setStatus} activeColor="bg-green-500" />
            </div>

            <button onClick={handleSaveRole} className="btn-secondary">
              {modalMode === "add" ? "Add Role" : "Save Changes"}
            </button>
          </Modal>
        )}
      </div>
    </div>
  );
}

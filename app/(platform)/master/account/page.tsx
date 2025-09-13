"use client";

import { useState } from "react";
import DataListHeader from "@/components/DataListHeader";
import Modal from "@/components/Modal";
import InputLabel from "@/components/Label";
import ToggleSwitch from "@/components/Toggle";
import InputField from "@/components/InputField";
import Pagination from "@/components/Pagination";
import AccountTable from "../account/account-table";

interface UserAccount {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
}

export default function AccountsPage() {
  const [users, setUsers] = useState<UserAccount[]>([
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Staff", status: "Inactive" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Editor", status: "Active" },
  ]);

  const statusStyles: Record<UserAccount["status"], string> = {
    Active: "bg-green-100 text-green-700 border-green-500",
    Inactive: "bg-red-100 text-red-700 border-red-500",
  };

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const filterOptions = ["All", "Active", "Inactive"];
  const filteredUsers = statusFilter === "All" ? users : users.filter((u) => u.status === statusFilter);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [errors, setErrors] = useState<{ name?: string; email?: string; role?: string }>({});

  // helper reset form
  const resetForm = () => {
    setName("");
    setEmail("");
    setRole("");
    setStatus("Active");
    setErrors({});
    setEditingUserId(null);
    setModalMode("add");
  };

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; role?: string } = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email";
    if (!role.trim()) newErrors.role = "Role is required";
    return newErrors;
  };

  const handleSaveUser = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (modalMode === "add") {
      const newUser: UserAccount = {
        id: users.length + 1,
        name,
        email,
        role,
        status,
      };
      setUsers([newUser, ...users]);
    } else if (modalMode === "edit" && editingUserId !== null) {
      setUsers(users.map((u) => (u.id === editingUserId ? { ...u, name, email, role, status } : u)));
    }

    resetForm();
    setShowModal(false);
  };

  const handleEditUser = (user: UserAccount) => {
    setModalMode("edit");
    setEditingUserId(user.id);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setStatus(user.status);
    setShowModal(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-12 bg-white p-4 sm:p-6 rounded-3xl flex flex-col">
        <DataListHeader
          title="User Accounts"
          total={filteredUsers.length}
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

        <AccountTable users={currentUsers} statusStyles={statusStyles} onEdit={handleEditUser} />

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

        {showModal && (
          <Modal
            isOpen={showModal}
            onClose={() => {
              resetForm();
              setShowModal(false);
            }}
            title={modalMode === "add" ? "Add New User" : "Edit User"}
          >
            <InputField label="Name" value={name} onChange={setName} placeholder="Name" error={errors.name} />

            <InputField label="Email" value={email} onChange={setEmail} placeholder="Email" type="email" error={errors.email} />

            <InputLabel label="Role">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`w-full p-2.5 border rounded-md text-gray-700 text-sm bg-white appearance-none cursor-pointer transition-colors duration-200 hover:border-red-400 ${
                  errors.role ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-red-500"
                }`}
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="User">User</option>
                <option value="Guest">Guest</option>
              </select>
              {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
            </InputLabel>

            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-700 text-sm font-medium">Status</span>
              <ToggleSwitch status={status} onChange={setStatus} activeColor="bg-green-500" />
            </div>

            <button onClick={handleSaveUser} className="btn-secondary">
              {modalMode === "add" ? "Add User" : "Save Changes"}
            </button>
          </Modal>
        )}
      </div>
    </div>
  );
}

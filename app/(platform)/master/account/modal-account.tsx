"use client";

import Modal from "@/components/Modal";
import InputLabel from "@/components/Label";
import InputField from "@/components/InputField";
import ToggleSwitch from "@/components/Toggle";

interface ModalAccountProps {
  isOpen: boolean;
  mode: "add" | "edit";
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
  errors: { name?: string; email?: string; role?: string };

  onClose: () => void;
  onSave: () => void;

  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setRole: (value: string) => void;
  setStatus: (value: "Active" | "Inactive") => void;
}

export default function ModalAccount({ isOpen, mode, name, email, role, status, errors, onClose, onSave, setName, setEmail, setRole, setStatus }: ModalAccountProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={mode === "add" ? "Add New User" : "Edit User"}>
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

      <button onClick={onSave} className="btn-secondary">
        {mode === "add" ? "Add User" : "Save Changes"}
      </button>
    </Modal>
  );
}

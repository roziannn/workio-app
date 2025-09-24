"use client";

import { useState } from "react";
import { CheckCircle2, Search } from "lucide-react";
import ToggleSwitch from "@/components/Toggle";
import InputField from "@/components/InputField";
import { mst_roles } from "@/data/dummy/mst_roles";
import { mst_units } from "@/data/dummy/mst_units";
import Pagination from "@/components/Pagination";
import { notify } from "@/components/NotifiactionManager";

export default function CreateTeamPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<{ id: number; name: string } | null>(null);
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [searchQuery, setSearchQuery] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    role: "",
    unit: "",
  });

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setSelectedRole("");
    setSelectedUnit(null);
    setStatus("Active");
    setSearchQuery("");
    setErrors({ name: "", phone: "", email: "", role: "", unit: "" });
    setCurrentPage(1);
  };

  const validateForm = () => {
    const newErrors = { name: "", phone: "", email: "", role: "", unit: "" };
    if (!name.trim()) newErrors.name = "Name is required";
    if (!phone.trim()) newErrors.phone = "Phone is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!selectedRole) newErrors.role = "Role is required";
    if (!selectedUnit) newErrors.unit = "Unit is required";
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => !err);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    resetForm();
    notify("success", "Team member added successfully!");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filteredUnits = mst_units.filter((unit) => unit.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalPages = Math.ceil(filteredUnits.length / pageSize);
  const paginatedUnits = filteredUnits.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-6 bg-white p-6 rounded-3xl">
        <h2 className="text-xl font-semibold mb-1">New Team</h2>
        <p className="text-sm text-gray-500 mb-6">Create a new team and assign it to a team member.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Name" value={name} onChange={setName} placeholder="Enter name" error={errors.name} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-0">
            <InputField label="Phone" value={phone} onChange={setPhone} placeholder="Enter phone" type="tel" error={errors.phone} />
            <InputField label="Email" value={email} onChange={setEmail} placeholder="Enter email" type="email" error={errors.email} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <div className="grid grid-cols-2 gap-4">
              {mst_roles.map((role: string) => (
                <div
                  key={role}
                  className={`flex items-center justify-between p-2.5 rounded-md cursor-pointer text-sm text-slate-800 border transition-colors ${
                    selectedRole === role ? "bg-green-100 border-green-500" : "border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedRole(role)}
                >
                  <span>{role}</span>
                  {selectedRole === role && <CheckCircle2 size={20} className="text-green-600" />}
                </div>
              ))}
            </div>
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-700 text-sm font-medium">Status</span>
            <ToggleSwitch status={status} onChange={setStatus} activeColor="bg-green-500" />
          </div>
          <button type="submit" className="btn-secondary w-full my-3">
            Save Changes
          </button>
        </form>
      </div>

      <div className="lg:col-span-6 bg-white p-6 rounded-3xl">
        <h3 className="text-xl font-semibold mb-2">Select Unit</h3>
        <p className="text-sm text-gray-500 mb-5">Search for a unit to assign to this member.</p>
        <label className="mb-1">Search</label>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search units..."
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.unit ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
          />
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        {errors.unit && <p className="text-red-500 text-xs mt-1">{errors.unit}</p>}

        <div className="space-y-4 mt-6">
          {paginatedUnits.map((unit) => (
            <div
              key={unit.id}
              className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
                selectedUnit?.id === unit.id ? "bg-blue-100 border-blue-500 border-2" : "bg-gray-50 hover:bg-gray-100 border border-transparent"
              }`}
              onClick={() => {
                setSelectedUnit(unit);
                setErrors((prev) => ({ ...prev, unit: "" }));
              }}
            >
              <span className="font-medium text-sm text-gray-800">{unit.name}</span>
              {selectedUnit?.id === unit.id && <CheckCircle2 size={20} className="text-blue-600" />}
            </div>
          ))}
        </div>
        {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { CheckCircle2, Search } from "lucide-react";
import ToggleSwitch from "@/components/Toggle";
import InputField from "@/components/InputField";
import { notify } from "@/components/NotifiactionManager";

interface Unit {
  id: number;
  name: string;
}

interface TeamMember {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  unit: string;
  status: "Active" | "Inactive";
}

const mockMembers: TeamMember[] = [
  { id: "1", name: "Alice Johnson", phone: "08123456789", email: "alice@mail.com", role: "Admin", unit: "Frontend Developer", status: "Active" },
  { id: "2", name: "Bob Smith", phone: "08198765432", email: "bob@mail.com", role: "Staff", unit: "Backend Engineer", status: "Inactive" },
];

const unitsData: Unit[] = [
  { id: 1, name: "Frontend Developer" },
  { id: 2, name: "Backend Engineer" },
  { id: 3, name: "UI/UX Designer" },
  { id: 4, name: "DevOps Engineer" },
  { id: 5, name: "Data Scientist" },
  { id: 6, name: "Project Manager" },
];

const rolesData = ["Staff", "Admin", "Manager", "Lead"];

export default function EditTeamPage() {
  const router = useRouter();
  const params = useParams();
  const memberId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [searchQuery, setSearchQuery] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const member = mockMembers.find((m) => m.id === memberId);
      if (member) {
        setName(member.name);
        setPhone(member.phone);
        setEmail(member.email);
        setSelectedRole(member.role);
        setSelectedUnit(unitsData.find((u) => u.name === member.unit) ?? null);
        setStatus(member.status);
      } else {
        notify("error", "Data not found!");
        router.push("/teams");
      }
      setIsLoading(false);
    }, 500);
  }, [memberId, router]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!phone.trim()) newErrors.phone = "Phone is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!selectedRole) newErrors.role = "Role is required.";
    if (!selectedUnit) newErrors.unit = "Unit is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updatedMember: TeamMember = {
      id: memberId,
      name,
      phone,
      email,
      role: selectedRole,
      unit: selectedUnit!.name,
      status,
    };

    console.log("Updated Member:", updatedMember);
    alert("Member updated successfully!");
    router.push("/teams");
  };

  const filteredUnits = unitsData.filter((u) => u.name.toLowerCase().includes(searchQuery.toLowerCase()));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-700">Loading member data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-6 bg-white p-6 rounded-3xl space-y-6">
        <h2 className="text-xl font-semibold mb-1">Edit Team Member</h2>
        <p className="text-sm text-gray-500 mb-6">Update the details for your team member.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Name" value={name} onChange={setName} placeholder="Enter name" error={errors.name} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Phone" value={phone} onChange={setPhone} placeholder="Enter phone" error={errors.phone} />
            <InputField label="Email" value={email} onChange={setEmail} placeholder="Enter email" type="email" error={errors.email} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <div className="space-y-2 mt-1">
              {rolesData.map((role) => (
                <div
                  key={role}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer text-sm border transition-colors ${selectedRole === role ? "bg-green-100 border-green-500" : "border-gray-300 hover:bg-gray-50"}`}
                  onClick={() => setSelectedRole(role)}
                >
                  <span>{role}</span>
                  {selectedRole === role && <CheckCircle2 size={20} className="text-green-600" />}
                </div>
              ))}
            </div>
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
          </div>

          <div className="flex items-center justify-between mt-4 mb-4">
            <span className="text-gray-700 text-sm font-medium">Status</span>
            <ToggleSwitch status={status} onChange={setStatus} activeColor="bg-green-500" />
          </div>

          <button type="submit" className="btn-primary w-full">
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
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search units..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
          />
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="space-y-4 mt-6">
          {filteredUnits.map((unit) => (
            <div
              key={unit.id}
              className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
                selectedUnit?.id === unit.id ? "bg-blue-100 border-blue-500 border-2" : "bg-gray-50 hover:bg-gray-100 border border-transparent"
              }`}
              onClick={() => setSelectedUnit(unit)}
            >
              <span className="font-medium text-sm text-gray-800">{unit.name}</span>
              {selectedUnit?.id === unit.id && <CheckCircle2 size={20} className="text-blue-600" />}
            </div>
          ))}
          {errors.unit && <p className="text-red-500 text-xs mt-1">{errors.unit}</p>}
        </div>
      </div>
    </div>
  );
}

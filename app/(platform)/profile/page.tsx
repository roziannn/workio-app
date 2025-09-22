"use client";

import { useState } from "react";
import InputField from "@/components/InputField";
import { notify } from "@/components/NotifiactionManager";
import { formatDate } from "@/utils/dateHelper";

export default function ProfilePage() {
  const [user] = useState({
    name: "Firda Rosiana",
    email: "firda@example.com",
    createdAt: "2025-10-01",
    jobLevel: "Programmer",
    unit: "Backend Developer",
    phone: "0892372832",
  });

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setError("Password confirmation does not match.");
      notify("error", "Failed to change password!");
      return;
    }

    notify("success", "Success to change password!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-6 bg-white p-6 rounded-3xl">
        <h2 className="text-xl font-semibold mb-2">My Profile</h2>
        <p className="text-sm text-gray-500 mb-6">Changes can only be made by your administrator.</p>
        <div className="space-y-4">
          <InputField label="Full Name" value={user.name} onChange={() => {}} readonly />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-0">
            <InputField label="Email Address" value={user.email} onChange={() => {}} readonly />
            <InputField label="Phone" value={user.phone} onChange={() => {}} readonly />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-0">
            <InputField label="Job Level" value={user.jobLevel} onChange={() => {}} readonly />
            <InputField label="Unit" value={user.unit} onChange={() => {}} readonly />
          </div>
          <InputField label="Join Date" value={formatDate(user.createdAt)} onChange={() => {}} readonly />
        </div>
      </div>

      <div className="md:col-span-6 bg-white p-6 rounded-3xl">
        <h2 className="text-xl font-semibold mb-2">Change Password</h2>
        <p className="text-sm text-gray-500 mb-6">Update your password here.</p>
        <div className="space-y-4">
          <InputField label="Old Password" type="password" value={oldPassword} onChange={setOldPassword} />
          <InputField label="New Password" type="password" value={newPassword} onChange={setNewPassword} />
          <InputField label="Confirm Password" type="password" value={confirmPassword} onChange={setConfirmPassword} error={error} />
        </div>
        <button onClick={handleChangePassword} className="btn-primary w-full">
          Save
        </button>
      </div>
    </div>
  );
}

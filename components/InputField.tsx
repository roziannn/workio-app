import React from "react";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  readonly?: boolean;
}

export default function InputField({ label, value, onChange, placeholder, type = "text", error, readonly = false }: InputFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readonly}
        className={`w-full p-2.5 border rounded-md text-gray-700 placeholder-gray-400 text-sm transition-colors duration-200 focus:outline-none
          ${error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-red-500"}
          bg-white ${readonly ? "cursor-not-allowed" : ""}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

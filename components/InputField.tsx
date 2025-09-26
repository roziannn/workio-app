import React from "react";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  readonly?: boolean;
  className?: string;
}

export default function InputField({ label, value, onChange, placeholder, type = "text", error, readonly = false, className = "" }: InputFieldProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-gray-700 text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readonly}
        className={`w-full px-3 py-2 border rounded-md text-gray-700 placeholder-gray-400 text-sm transition-colors duration-200 focus:outline-none
          ${error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-[#FF0B55]"}
          bg-white ${readonly ? "cursor-not-allowed" : ""}`}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}

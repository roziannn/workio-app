import React from "react";

interface TextareaFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  error?: string;
  readonly?: boolean;
}

export default function TextareaField({ label, value, onChange, placeholder, rows = 3, error, readonly = false }: TextareaFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        readOnly={readonly}
        className={`w-full p-2.5 border rounded-md text-gray-700 placeholder-gray-400 text-sm transition-colors duration-200 focus:outline-none 
          ${error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-red-500"} 
          ${readonly ? "bg-slate-200 cursor-not-allowed" : "bg-white"}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

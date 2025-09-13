import React, { ReactNode } from "react";

interface InputLabelProps {
  label: string;
  children: ReactNode;
}

const InputLabel: React.FC<InputLabelProps> = ({ label, children }) => (
  <div className="mb-2">
    <label className="block text-gray-700 text-sm font-medium mb-1">{label}</label>
    {children}
  </div>
);

export default InputLabel;

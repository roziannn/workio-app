import React from "react";

interface ToggleSwitchProps {
  status: "Active" | "Inactive";
  onChange: (status: "Active" | "Inactive") => void;
  activeColor?: string;
}

const Toggle = ({ enabled, onChange, color = "bg-green-500" }: { enabled: boolean; onChange: () => void; color?: string }) => (
  <button onClick={onChange} className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none ${enabled ? color : "bg-gray-200"}`}>
    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${enabled ? "translate-x-6" : "translate-x-1"}`} />
  </button>
);

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ status, onChange, activeColor = "bg-green-500" }) => {
  const enabled = status === "Active";

  const handleToggle = () => {
    onChange(enabled ? "Inactive" : "Active");
  };

  return <Toggle enabled={enabled} onChange={handleToggle} color={activeColor} />;
};

export default ToggleSwitch;

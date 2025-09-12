import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  colorClass?: string;
  icon?: React.ReactNode;
}

export default function Badge({ children, colorClass, icon }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-semibold ${colorClass}`}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
}

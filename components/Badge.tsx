import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  colorClass?: string;
  icon?: React.ReactNode;
}

export default function Badge({ children, colorClass, icon }: BadgeProps) {
  return (
    <span className={`inline-flex px-2.5 items-center py-1 rounded-xl text-xs font-medium ${colorClass}`}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
}

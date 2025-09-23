"use client";

interface LoadingSpinnerProps {
  message?: string;
  height?: string;
}

export default function LoadingSpinner({ message = "Loading...", height = "h-96" }: LoadingSpinnerProps) {
  return (
    <div className={`flex justify-center items-center ${height}`}>
      <div className="flex flex-col items-center space-y-4 backdrop-blur-md animate-fadeIn">
        <div className="w-12 h-12 border-3 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-medium text-gray-700 animate-pulse">{message}</p>
      </div>
    </div>
  );
}

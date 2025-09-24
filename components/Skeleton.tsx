"use client";

export default function SkeletonEditForm() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-pulse min-h-screen">
      <div className="lg:col-span-6 bg-white p-6 rounded-3xl flex flex-col justify-between h-screen">
        <div className="space-y-5">
          <div className="h-6 w-1/3 bg-gray-200 rounded" />
          <div className="h-4 w-2/3 bg-gray-200 rounded mb-6" />

          <div className="h-10 bg-gray-200 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-10 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
          </div>

          <div className="h-20 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>

        <div className="h-12 bg-gray-200 rounded mt-6" />
      </div>

      <div className="lg:col-span-6 bg-white p-6 rounded-3xl flex flex-col justify-between h-screen">
        <div>
          <div className="h-6 w-1/4 bg-gray-200 rounded" />
          <div className="h-4 w-1/2 bg-gray-200 rounded mt-2" />

          <div className="h-8 bg-gray-200 rounded w-1/3 mt-6" />

          <div className="space-y-3 mt-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded" />
            ))}
          </div>
        </div>

        <div className="h-10 bg-gray-200 rounded mt-6" />
      </div>
    </div>
  );
}

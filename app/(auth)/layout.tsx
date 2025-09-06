export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 px-4">
      <div className="w-full max-w-md p-2 md:p-6 bg-white rounded-2xl">{children}</div>
    </div>
  );
}

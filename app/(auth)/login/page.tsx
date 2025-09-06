"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login with", email, password);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6 p-4">
      <div className="flex justify-center pb-2">
        <Image src="/logo.png" alt="Workio Logo" width={120} height={120} priority />
      </div>

      <div className="pb-4">
        <h1 className="text-xl font-semibold mb-2">Sign in</h1>
        <p className="text-sm text-slate-500">Welcome back! Please sign in to your account.</p>
      </div>

      <div>
        <label>Email</label>
        <input type="email" placeholder="Email" className="input-primary mt-1" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div>
        <label>Password</label>
        <input type="password" placeholder="Password" className="input-primary mt-1" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="flex justify-end mt-2">
          <Link href="/forgot-password" className="text-xs text-[#FF0B55] hover:underline">
            Forgot password?
          </Link>
        </div>
      </div>

      <button type="submit" className="btn-primary">
        Sign In
      </button>
    </form>
  );
}

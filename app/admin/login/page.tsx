"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (data.success) {
        router.push("/admin");
      } else {
        setError(data.message || "Incorrect password");
      }
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center px-6 py-16 text-[#14212B]">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="text-[11px] tracking-[0.25em] text-[#B28B52] mb-4">RSL / PRIVATE AREA</p>
          <h1 className="text-3xl mb-3" style={{ fontFamily: "Georgia, serif" }}>Admin Login</h1>
          <p className="text-sm text-[#66727A]">Manage your RSL storefront securely.</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white border border-[#D7DDE0] p-7 md:p-8 shadow-sm">
          <label htmlFor="admin-password" className="block text-[11px] tracking-[0.15em] text-[#66727A] mb-2">PASSWORD</label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-[#D7DDE0] px-4 py-3 bg-[#F7F5F0] text-[#14212B] placeholder:text-[#66727A]/60 focus:outline-none focus:border-[#B28B52] transition-colors"
          />
          {error ? <p role="alert" className="text-red-600 text-sm mt-3">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-3.5 bg-[#14212B] text-[#F7F5F0] text-[13px] tracking-[0.12em] hover:bg-[#B28B52] transition-colors disabled:opacity-60"
          >
            {loading ? "CHECKING..." : "SIGN IN"}
          </button>
          <Link href="/admin/forgot-password" className="block text-center mt-5 text-sm text-[#66727A] hover:text-[#B28B52] transition-colors">
            Forgot password?
          </Link>
        </form>

        <Link href="/" className="block text-center mt-6 text-sm text-[#66727A] hover:text-[#B28B52] transition-colors">
          ← Return to storefront
        </Link>
      </div>
    </div>
  );
}

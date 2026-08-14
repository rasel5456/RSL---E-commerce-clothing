"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AccountAuthPage() {
  const { signIn, signUp, user } = useAuth();
  const router = useRouter();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    router.push("/account/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = isSignUp ? await signUp(email, password) : await signIn(email, password);

    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      router.push("/account/dashboard");
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-24">
      <h1 className="text-2xl mb-8 text-center" style={{ fontFamily: "var(--font-display)" }}>
        {isSignUp ? "Create Account" : "Sign In"}
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-2 block">EMAIL</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-[#DDD6C8] px-4 py-3 focus:outline-none focus:border-[#9C7A44]"
          />
        </div>

        <div className="mb-6">
          <label className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-2 block">PASSWORD</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full border border-[#DDD6C8] px-4 py-3 focus:outline-none focus:border-[#9C7A44]"
          />
        </div>

        {error ? <p className="text-red-600 mb-4 text-sm">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 text-[13px] tracking-[0.1em] bg-[#14120F] text-[#F7F4EF] hover:bg-[#9C7A44] transition-colors mb-4"
        >
          {loading ? "PLEASE WAIT..." : isSignUp ? "SIGN UP" : "SIGN IN"}
        </button>

        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full text-center text-sm text-[#6E675C] hover:text-[#9C7A44]"
        >
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </button>
      </form>
    </div>
  );
}

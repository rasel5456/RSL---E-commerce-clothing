"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

export default function AccountAuthPage() {
  const { signIn, user } = useAuth();
  const router = useRouter();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    router.push("/account/dashboard");
    return null;
  }

  const handleSignUp = async () => {
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });

    if (signUpError) {
      setError(signUpError.message);
      return false;
    }

    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        full_name: fullName,
        phone: phone,
        address: address,
        city: city,
      });
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isSignUp) {
      const ok = await handleSignUp();
      setLoading(false);
      if (ok) router.push("/account/dashboard");
      return;
    }

    const result = await signIn(email, password);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      router.push("/account/dashboard");
    }
  };

  return (
    <div className="min-h-[85vh] flex bg-[#F7F4EF]" style={{ fontFamily: "var(--font-bangla), var(--font-sans), sans-serif" }}>
      <div className="hidden md:flex md:w-1/2 items-center justify-center relative overflow-hidden" style={{ background: "linear-gradient(160deg, #221F1B, #14120F)" }}>
        <div className="relative z-10 text-center px-10">
          <p className="text-[12px] tracking-[0.25em] text-[#9C7A44] mb-5">RSL &mdash; EST. 2026</p>
          <h2 className="text-4xl mb-4 text-[#F7F4EF]" style={{ fontFamily: "var(--font-display)" }}>
            Define Your Style.
          </h2>
          <p className="text-[#F7F4EF]/60 max-w-xs mx-auto text-sm">
            Sign in to track your orders, save your details and enjoy faster checkout.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <Link href="/" className="flex items-center gap-2 mb-8 justify-center md:justify-start">
            <img src="/header-logo.png" alt="RSL" className="h-7 w-auto" />
            <span className="text-2xl tracking-[0.2em]" style={{ fontFamily: "var(--font-display)" }}>RSL</span>
          </Link>

          <p className="text-[11px] tracking-[0.2em] text-[#9C7A44] mb-3">
            {isSignUp ? "CREATE ACCOUNT" : "WELCOME BACK"}
          </p>
          <h1 className="text-3xl mb-7" style={{ fontFamily: "var(--font-display)" }}>
            {isSignUp ? "Join RSL" : "Sign In"}
          </h1>

          <form onSubmit={handleSubmit}>
            {isSignUp ? (
              <div className="mb-4">
                <label className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-2 block">FULL NAME</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full border border-[#DDD6C8] px-4 py-3 bg-transparent focus:outline-none focus:border-[#9C7A44] transition-colors"
                />
              </div>
            ) : null}

            <div className="mb-4">
              <label className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-2 block">EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-[#DDD6C8] px-4 py-3 bg-transparent focus:outline-none focus:border-[#9C7A44] transition-colors"
              />
            </div>

            {isSignUp ? (
              <>
                <div className="mb-4">
                  <label className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-2 block">PHONE NUMBER</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full border border-[#DDD6C8] px-4 py-3 bg-transparent focus:outline-none focus:border-[#9C7A44] transition-colors"
                  />
                </div>

                <div className="mb-4">
                  <label className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-2 block">ADDRESS</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full border border-[#DDD6C8] px-4 py-3 bg-transparent focus:outline-none focus:border-[#9C7A44] transition-colors"
                  />
                </div>

                <div className="mb-4">
                  <label className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-2 block">CITY</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="w-full border border-[#DDD6C8] px-4 py-3 bg-transparent focus:outline-none focus:border-[#9C7A44] transition-colors"
                  />
                </div>
              </>
            ) : null}

            <div className="mb-7">
              <label className="text-[11px] tracking-[0.15em] text-[#6E675C] mb-2 block">PASSWORD</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full border border-[#DDD6C8] px-4 py-3 pr-11 bg-transparent focus:outline-none focus:border-[#9C7A44] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E675C] hover:text-[#9C7A44] transition-colors"
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle><path d="M4 4l16 16"></path></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  )}
                </button>
              </div>
            </div>

            {error ? (
              <p className="text-red-600 mb-5 text-sm border border-red-200 bg-red-50 px-4 py-3">{error}</p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-[13px] tracking-[0.15em] bg-[#14120F] text-[#F7F4EF] hover:bg-[#9C7A44] transition-colors disabled:opacity-60 mb-6"
            >
              {loading ? "PLEASE WAIT..." : isSignUp ? "SIGN UP" : "SIGN IN"}
            </button>

            <button
              type="button"
              onClick={() => { setIsSignUp(!isSignUp); setError(""); }}
              className="w-full text-center text-sm text-[#6E675C] hover:text-[#9C7A44] transition-colors"
            >
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <span className="underline">{isSignUp ? "Sign In" : "Sign Up"}</span>
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-[#DDD6C8] text-center">
            <Link href="/" className="text-[12px] tracking-[0.08em] text-[#6E675C] hover:text-[#9C7A44] transition-colors">
              &larr; Back to Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

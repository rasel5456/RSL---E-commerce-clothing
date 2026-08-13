"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function AccountIcon() {
  const { user } = useAuth();

  return (
    <Link href={user ? "/account/dashboard" : "/account"} aria-label="Account" className="hidden sm:block hover:text-[#9C7A44] transition-colors">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"></path></svg>
    </Link>
  );
}

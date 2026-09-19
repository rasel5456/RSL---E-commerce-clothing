"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() === "") return;
    router.push("/search?q=" + encodeURIComponent(query.trim()));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center border-b border-[#D7DDE0] focus-within:border-[#B28B52] transition-colors">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#66727A]"><circle cx="11" cy="11" r="7"></circle><path d="m21 21-4.3-4.3"></path></svg>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search products..."
        className="bg-transparent text-[13px] px-2 py-1.5 w-32 md:w-44 focus:outline-none placeholder:text-[#66727A]/60"
      />
    </form>
  );
}

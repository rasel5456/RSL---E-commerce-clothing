"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = function (e) {
    e.preventDefault();
    if (query.trim() === "") return;
    router.push("/search?q=" + encodeURIComponent(query.trim()));
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center border-b border-[#DDD6C8] focus-within:border-[#9C7A44] transition-colors">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#6E675C]"><circle cx="11" cy="11" r="7"></circle><path d="m21 21-4.3-4.3"></path></svg>
      <input
        type="text"
        value={query}
        onChange={function (e) { setQuery(e.target.value); }}
        placeholder="Search products..."
        className="bg-transparent text-[13px] px-2 py-1.5 w-32 md:w-44 focus:outline-none placeholder:text-[#6E675C]/60"
      />
    </form>
  );
}

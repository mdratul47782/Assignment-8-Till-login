"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function NavSearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      router.push(`/SearchResult?query=${encodeURIComponent(debouncedSearchTerm)}`);
    }
  }, [debouncedSearchTerm, router]); // Only navigate when there is a valid search term

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Search movies..."
        className="bg-zinc-800 text-white px-4 py-2 rounded focus:outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default NavSearchBar;

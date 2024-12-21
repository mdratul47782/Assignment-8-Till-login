"use client";
import { useUser } from "@/app/context/UserContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import NavSearchBar from "./NavSearchBar";
import { useState, useEffect } from "react";

function NavBar() {
  const { user } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  const handleProtectedRoute = (route) => {
    if (user && user.id) {
      router.push(route);
    } else {
      router.push("/login");
    }
  };

  const handleLoginClick = () => {
    setIsVisible(false);
    router.push("/login");
  };

  useEffect(() => {
    setIsVisible(pathname !== "/login");
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-b from-black to-transparent shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        {/* Logo and Navigation Links */}
        <div className="flex items-center">
          <Link href="/" className="text-red-600 text-4xl font-bold">
            MOVIE DB
          </Link>
          <div className="ml-8 space-x-4 flex">
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <button
              onClick={() => handleProtectedRoute(`/CompareMovies/${user?.id}`)}
              className="text-white hover:text-gray-300"
            >
              Compare Movies
            </button>
            <button
              onClick={() => handleProtectedRoute(`/WatchList/${user?.id}`)}
              className="text-white hover:text-gray-300"
            >
              Watch Later
            </button>
            <button
              onClick={handleLoginClick}
              className="flex items-center space-x-2 text-white px-5 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 shadow-lg transition duration-300 transform hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21h9a2.25 2.25 0 002.25-2.25V15M21 12h-6m0 0l2.25-2.25M15 12l2.25 2.25"
                />
              </svg>
              <span className="text-sm font-medium">Login</span>
            </button>
          </div>
        </div>

        {/* Search Bar and User Name */}
        <div className="flex items-center space-x-4">
          <NavSearchBar />
          <div className="flex items-center space-x-2 text-white px-5 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 shadow-lg transition duration-300 transform hover:scale-105">
            <span className="text-sm font-medium">
              {user ? `${user.name || "User"}` : "Guest"}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

"use client";
import { useUser } from "@/app/context/UserContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavSearchBar from "./NavSearchBar";

function NavBar() {
  const { user, setUser } = useUser(); // Ensure `setUser` is available in your context
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

  const handleLoginLogoutClick = () => {
    if (user) {
      // Clear user data
      setUser(null); // Ensure `setUser` is provided in your context
      router.push("/login"); // Navigate to login page
    } else {
      router.push("/login");
    }
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
          <Link
            href={`/${user?.id ? user.id : "guest"}`}
            className="text-red-600 text-4xl font-bold"
          >
            MOVIE DB
          </Link>
          <div className="ml-8 space-x-4 flex">
            <Link
              href={`/${user?.id ? user.id : "guest"}`}
              className="text-white hover:text-gray-300"
            >
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
              onClick={handleLoginLogoutClick}
              className={`flex items-center space-x-2 text-white px-5 py-2 rounded-lg ${
                user
                  ? "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                  : "bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800"
              } shadow-lg transition duration-300 transform hover:scale-105`}
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
                  d={
                    user
                      ? "M17 16l4-4m0 0l-4-4m4 4H7m6-4v8" // Logout icon
                      : "M7 8l-4 4m0 0l4 4m-4-4h14m-6-4v8" // Login icon
                  }
                />
              </svg>
              <span className="text-sm font-medium">
                {user ? "Logout" : "Login"}
              </span>
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

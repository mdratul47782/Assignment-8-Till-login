"use client";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function LoginForm({ users }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(""); // State to manage error message
  const router = useRouter();
  const { user, setUser } = useUser(); // Access user and setUser from context

  const handleSubmit = (event) => {
    event.preventDefault();

    // Find the user matching the email and password
    const matchedUser = users.find(
      (user) => user.email === email && user.pass === pass
    );

    if (matchedUser) {
      // Set the user context
      setUser({ name: matchedUser.name, email: matchedUser.email, id: matchedUser._id });
    } else {
      setError("Invalid email or password"); // Set error message
    }
  };

  // Redirect when the user context is updated
  useEffect(() => {
    if (user?.id) {
      router.push(`/${user.id}`);
    }
  }, [user, router]);

  return (
    <form id="loginForm" onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email or phone number"
        className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
        required
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        name="pass"
      />
      <button
        type="submit"
        className="w-full bg-moviedb-red text-white py-3 rounded hover:bg-red-700 transition duration-300"
      >
        Sign In
      </button>

      {/* Conditionally display the error message */}
      {error && (
        <p className="text-red-500 text-sm mt-2">
          {error}
        </p>
      )}
    </form>
  );
}

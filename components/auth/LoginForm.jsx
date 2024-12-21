"use client";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm({ users }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(""); // State to manage error message
  const router = useRouter();
  const { setUser } = useUser(); // Context থেকে setUser আনুন

  const handleSubmit = (event) => {
    event.preventDefault();

    // Find the user matching the email and password
    const user = users.find(
      (user) => user.email === email && user.pass === pass
    );

    if (user) {
      // Context-এ ব্যবহারকারীর তথ্য সেট করুন
      setUser({ name: user.name, email: user.email, id: user._id });
      // Redirect to the home page
      router.push("/");
    } else {
      setError("Invalid email or password"); // Set error message
    }
  };

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

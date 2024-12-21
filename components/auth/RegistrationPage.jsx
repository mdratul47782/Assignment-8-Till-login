
import connectMongo from "@/dbConnect/connectMongo";
import User from "@/models/User";
import React from "react";
import { redirect } from "next/navigation";
function RegistrationPage() {
  const addUser = async (formData) => {
    "use server";

    const name = formData.get("name");
    const email = formData.get("email");
    const pass = formData.get("pass");

    console.log("Captured Data:", { name, email, pass }); // Debug here

    const userData = { name, email, pass };

    await connectMongo();
    console.log("Saving User Data:", { name, email, pass });

    await new User({ name, email, pass }).save();
    redirect("/login");
  };

  return (
    <form action={addUser} id="signupForm" className="space-y-4">
      <input
        type="text"
        placeholder="name"
        name="name"
        className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
        required
      />

      <input
        type="email"
        placeholder="Email Address"
        name="email"
        className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
        required
      />
      <input
        type="password" // `pass`-এর জন্য type="password" ব্যবহার করুন
        placeholder="Create Password"
        name="pass"
        className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
        required
      />

      <button
        type="submit"
        className="w-full bg-moviedb-red text-white py-3 rounded hover:bg-red-700 transition duration-300"
      >
        Sign Up
      </button>
    </form>
  );
}

export default RegistrationPage;

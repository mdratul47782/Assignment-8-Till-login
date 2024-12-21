// Utility function to get user data
"use client";
export async function getUser() {
    const { User } = await import("@/app/context/UserContext"); // Dynamically import UserContext
    const { user } = User(); // Access user from context
    return user; // Return user object
  }
  
"use client";
import { UserProvider } from "../app/context/UserContext";

export default function UserProviderClient({ children }) {
  return <UserProvider>{children}</UserProvider>;
}

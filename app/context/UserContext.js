"use client"
import { createContext, useContext, useState } from "react";

// User Context তৈরি
const UserContext = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook ব্যবহার
export const useUser = () => useContext(UserContext);

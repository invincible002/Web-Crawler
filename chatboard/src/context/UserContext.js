import { createContext, useContext, useEffect, useState } from "react";
import React from "react";

const userDetailContext = createContext();

export function UserContext({ children }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    website: "",
  });
  return (
    <userDetailContext.Provider value={{ user, setUser }}>
      {children}
    </userDetailContext.Provider>
  );
}
export function useUserAuth() {
  return useContext(userDetailContext);
}

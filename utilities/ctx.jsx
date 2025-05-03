import React, { useContext, createContext, useState, useEffect } from "react";
import { useStorageState } from "../hooks/useStorageState";
import axios from "axios";
import { Platform } from "react-native";

const AuthContext = createContext({
  signIn: (value) => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  user: null,
  technician: null,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [user, setUser] = useState(null);
  const [technician, setTechnician] = useState(null);

  const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
  const fetchTechnician = async () => {
    try {
      const response = await axios(`${API_BASE_URL}/technician`, {
        method: "GET",
      });
      const data = response.data;
      const getTechnician = data.find(
        (item) => item.user_id === user?.user?.user_id
      );
      setTechnician(getTechnician);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user !== null) {
      if (typeof user === "object" && user !== null && "token" in user) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
        fetchTechnician();
      }
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        signIn: (value) => {
          // Perform sign-in logic here
          setSession(value);
          setUser(value);
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
        user,
        technician,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

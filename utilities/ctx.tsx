import React, {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { useStorageState } from "../hooks/useStorageState";
import axios from "axios";
import { Platform } from "react-native";

const AuthContext = createContext<{
  signIn: (value: string | null) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  user: string | object | null;
  technician: string | object | null;
}>({
  signIn: () => null,
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

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [user, setUser] = useState<string | object | null>(null);
  const [technician, setTechnician] = useState<string | object | null>(null);

  const LOCALHOST =
    Platform.OS === "ios"
      ? "http://127.0.0.1:8000"
      : "http://192.168.29.74:8000";
  const API_BASE_URL = LOCALHOST + "/api/v1";
  const fetchTechnician = async () => {
    try {
      const response = await axios(`${API_BASE_URL}/technician`, {
        method: "GET",
      });
      const data = response.data;
      const getTechnician = data.find(
        (item: any) => item.user_id === user?.user?.user_id
      );
      setTechnician(getTechnician);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user !== null) {
      if (typeof user === "object" && user !== null && "token" in user) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${
          (user as any).token
        }`;
        fetchTechnician();
      }
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        signIn: (value: string | null) => {
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

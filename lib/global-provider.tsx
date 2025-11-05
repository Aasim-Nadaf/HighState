import React, { createContext, ReactNode, useContext } from "react";

import { getUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite";

interface User {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  password?: string;
  hash?: string;
  hashOptions?: object;
  registration: string;
  status: boolean;
  email: string;
  phone: string;
  emailVerification: boolean;
  phoneVerification: boolean;
  prefs: object;
  avatar: string;
  accessedAt: string;
}

interface GlobalContextType {
  isLogged: boolean;
  user: User | null;
  loading: boolean;
  refetch: (newParams: Record<string, string | number>) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite({
    fn: getUser,
  });

  const isLogged = !!user;
  console.log(JSON.stringify(user, null, 2));

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        user: user ?? null,
        loading,
        refetch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobalContext must be used within a GlobalProvider");

  return context;
};

export default GlobalProvider;

import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../types";
import { mockUsers } from "../data/mockUsers";

interface UserContextType {
  currentUser: User | null;
  updateUser: (updates: Partial<User>) => void;
  deleteAccount: () => void;
  updatePassword: (currentPassword: string, newPassword: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const userId = localStorage.getItem("userId");
    return mockUsers.find((u) => u.id === userId) || null;
  });

  const updateUser = (updates: Partial<User>) => {
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    // TODO: Implement API call to update user
  };

  const deleteAccount = () => {
    // TODO: Implement API call to delete account
    setCurrentUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    window.location.href = "/login";
  };

  const updatePassword = (
    currentPassword: string,
    newPassword: string
  ): boolean => {
    if (!currentUser) return false;

    // Check if current password matches
    if (currentPassword === currentUser.password) {
      // TODO: Implement API call to update password
      setCurrentUser({ ...currentUser, password: newPassword });
      return true;
    }
    return false;
  };

  return (
    <UserContext.Provider
      value={{ currentUser, updateUser, deleteAccount, updatePassword }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

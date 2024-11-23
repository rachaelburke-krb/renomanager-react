import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../types";
import { mockUsers } from "../data/mockUsers";

interface UserContextType {
  currentUser: User | null;
  updateUser: (user: User) => void;
  updateProfileImage: (imageUrl: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      return JSON.parse(savedUser);
    }
    return mockUsers[0]; // Default to first mock user
  });

  const updateUser = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const updateProfileImage = (imageUrl: string) => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        profileImage: imageUrl,
      };
      setCurrentUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      localStorage.setItem("profileImage", imageUrl); // Keep for backward compatibility
    }
  };

  return (
    <UserContext.Provider
      value={{ currentUser, updateUser, updateProfileImage }}
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

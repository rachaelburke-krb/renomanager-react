import { User } from "../types";

export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    name: "Admin User",
    password: "admin123", // In a real app, this would be hashed
    role: "admin",
  },
  {
    id: "2",
    email: "user@example.com",
    name: "Demo User",
    password: "user123", // In a real app, this would be hashed
    role: "user",
  },
];

export const findUser = (email: string, password: string): User | undefined => {
  return mockUsers.find(
    (user) => user.email === email && user.password === password
  );
};

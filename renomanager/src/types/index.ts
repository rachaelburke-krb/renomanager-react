export interface ProjectPhoto {
  id: string;
  url: string;
  caption?: string;
  uploadedAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  sharedWith: string[];
  status: "planning" | "in-progress" | "completed";
  phases: Phase[];
  photos: ProjectPhoto[];
}

export interface Phase {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: "planning" | "in-progress" | "completed";
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "planning" | "in-progress" | "completed";
  assignedTo?: string; // User ID
  invoices: Invoice[];
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  supplier: {
    name: string;
    email: string;
    phone?: string;
  };
  amount: number;
  dueDate: Date;
  status: "draft" | "sent" | "paid" | "overdue";
  attachmentUrl?: string;
}

export interface InvoiceSummary {
  total: number;
  paid: number;
  unpaid: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: "admin" | "user";
  language?: string;
  timezone?: string;
  emailNotifications?: boolean;
  twoFactor?: boolean;
  phone?: string;
}

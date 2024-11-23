import React, { createContext, useContext, useState, ReactNode } from "react";
import { Supplier } from "../types";
import { mockSuppliers } from "../data/mockSuppliers";

interface SupplierContextType {
  suppliers: Supplier[];
  addSupplier: (supplier: Supplier) => void;
  getSupplier: (id: string) => Supplier | undefined;
}

const SupplierContext = createContext<SupplierContextType | undefined>(
  undefined
);

export const SupplierProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(() => {
    const savedSuppliers = localStorage.getItem("suppliers");
    if (savedSuppliers) {
      return JSON.parse(savedSuppliers);
    }
    return mockSuppliers;
  });

  const saveSuppliers = (updatedSuppliers: Supplier[]) => {
    setSuppliers(updatedSuppliers);
    localStorage.setItem("suppliers", JSON.stringify(updatedSuppliers));
    mockSuppliers.length = 0;
    updatedSuppliers.forEach((supplier) => {
      mockSuppliers.push({
        id: supplier.id,
        name: supplier.name,
        email: supplier.email,
        phone: supplier.phone,
        category: supplier.category,
      });
    });
  };

  const addSupplier = (supplier: Supplier) => {
    const existingSupplier = suppliers.find((s) => s.name === supplier.name);
    if (existingSupplier) {
      return existingSupplier;
    }

    const newSupplier = {
      ...supplier,
      id: supplier.id || Date.now().toString(),
    };

    const updatedSuppliers = [...suppliers, newSupplier];
    saveSuppliers(updatedSuppliers);
    return newSupplier;
  };

  const getSupplier = (id: string) => {
    return suppliers.find((s) => s.id === id);
  };

  return (
    <SupplierContext.Provider value={{ suppliers, addSupplier, getSupplier }}>
      {children}
    </SupplierContext.Provider>
  );
};

export const useSuppliers = () => {
  const context = useContext(SupplierContext);
  if (context === undefined) {
    throw new Error("useSuppliers must be used within a SupplierProvider");
  }
  return context;
};

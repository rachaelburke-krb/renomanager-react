import React, { createContext, useContext, useState, ReactNode } from "react";
import { Project } from "../types";
import { mockProjects } from "../data/mockProjects";

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Project) => void;
  getProject: (id: string) => Project | undefined;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);

  const addProject = (project: Project) => {
    setProjects((prev) => [project, ...prev]);
  };

  const getProject = (id: string) => {
    return projects.find((p) => p.id === id);
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, getProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
};

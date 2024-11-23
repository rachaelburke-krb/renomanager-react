import React, { createContext, useContext, useState, ReactNode } from "react";
import { Project } from "../types";
import { mockProjects } from "../data/mockProjects";
import { mockUsers } from "../data/mockUsers";

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Project) => void;
  getProject: (id: string) => Project | undefined;
  deleteProject: (id: string) => void;
  updateProject: (project: Project) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem("projects");
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects);
      return parsedProjects.map((project: any) => ({
        ...project,
        startDate: new Date(project.startDate),
        endDate: new Date(project.endDate),
        owner: project.owner || mockUsers[0],
        phases: project.phases.map((phase: any) => ({
          ...phase,
          startDate: new Date(phase.startDate),
          endDate: new Date(phase.endDate),
        })),
      }));
    }
    return mockProjects;
  });

  const saveProjects = (updatedProjects: Project[]) => {
    const projectsWithOwners = updatedProjects.map((project) => ({
      ...project,
      owner: project.owner || mockUsers[0],
    }));

    setProjects(projectsWithOwners);
    localStorage.setItem("projects", JSON.stringify(projectsWithOwners));

    mockProjects.length = 0;
    mockProjects.push(...projectsWithOwners);
  };

  const addProject = (project: Project) => {
    const updatedProjects = [project, ...projects];
    saveProjects(updatedProjects);
  };

  const getProject = (id: string) => {
    return projects.find((p) => p.id === id);
  };

  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter((p) => p.id !== id);
    saveProjects(updatedProjects);
  };

  const updateProject = (updatedProject: Project) => {
    const updatedProjects = projects.map((p) =>
      p.id === updatedProject.id ? updatedProject : p
    );
    saveProjects(updatedProjects);
  };

  return (
    <ProjectContext.Provider
      value={{ projects, addProject, getProject, deleteProject, updateProject }}
    >
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

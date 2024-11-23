import { Project } from "../types";
import { mockProjects } from "../data/mockProjects";

// Simple store to manage projects
class ProjectStore {
  private projects: Project[];

  constructor() {
    this.projects = [...mockProjects];
  }

  getAllProjects(): Project[] {
    return this.projects;
  }

  addProject(project: Project): void {
    this.projects.unshift(project);
  }

  getProject(id: string): Project | undefined {
    return this.projects.find((p) => p.id === id);
  }
}

export const projectStore = new ProjectStore();

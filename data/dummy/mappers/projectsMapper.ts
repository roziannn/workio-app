import { projectsData, Project } from "../projects";

// LOV project active
export const getActiveProjectLOV = () => projectsData.filter((p) => p.status === "Active").map((p) => ({ id: p.id, name: p.name }));

// buat detail
export const getProjectById = (id: number): Project | undefined => projectsData.find((p) => p.id === id);

// buat list/table
export const getAllProjects = (): Project[] => projectsData;

import { projectsData, Project } from "../projects";

// LOV project active
export const getActiveProjectLOV = () => projectsData.filter((p) => p.status === "Active").map((p) => ({ id: p.id, name: p.name }));

// detail by projectNo
export const getProjectByProjectNo = (projectNo: string): Project | undefined => projectsData.find((p) => p.projectNo === projectNo);

// buat list/table
export const getAllProjects = (): Project[] => projectsData;

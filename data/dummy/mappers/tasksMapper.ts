import { tasksData, Task } from "../tasks";

export const getInProgressTaskLOV = () => tasksData.filter((t) => t.status === "In Progress").map((t) => ({ id: t.id, title: t.title }));

export const getTaskById = (id: number): Task | undefined => tasksData.find((t) => t.id === id);

export const getAllTasks = (): Task[] => tasksData;

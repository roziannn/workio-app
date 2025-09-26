import { usersData, UserData } from "@/data/dummy/user";

export interface UserLOV {
  id: number;
  name: string;
}

export function getUserById(id: number): UserData | null {
  return usersData.find((user) => user.id === id) || null;
}

export function getAllUsers(): UserData[] {
  return usersData;
}

export function getAllUserLOV(): UserLOV[] {
  return usersData.map((user) => ({
    id: user.id,
    name: user.name,
  }));
}

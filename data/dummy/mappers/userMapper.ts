import { usersData, UserData } from "@/data/dummy/user";

export function getUserById(id: number): UserData | null {
  return usersData.find((user) => user.id === id) || null;
}

// Ambil semua users (bisa dipakai di index)
export function getAllUsers(): UserData[] {
  return usersData;
}

import api from "./api";
import type { User } from "../types/user";

export const getUsers = async () => {
  const res = await api.get<User[]>("/users");
  return res.data;
};

export const createUser = async (user: Omit<User, "id">) => {
  const res = await api.post<User>("/users", user);
  return res.data;
};

export const updateUser = async (id: number, user: User) => {
  const res = await api.put<User>(`/users/${id}`, user);
  return res.data;
};

export const deleteUser = async (id: number) => {
  await api.delete(`/users/${id}`);
};

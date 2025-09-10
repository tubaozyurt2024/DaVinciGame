import api from "./api";
import type { Post } from "../types/post";

export const getPosts = async () => {
  const res = await api.get<Post[]>("/posts");
  return res.data;
};

export const createPost = async (post: Omit<Post, "id">) => {
  const res = await api.post<Post>("/posts", post);
  return res.data;
};

export const updatePost = async (id: number, post: Post) => {
  const res = await api.put<Post>(`/posts/${id}`, post);
  return res.data;
};

export const deletePost = async (id: number) => {
  await api.delete(`/posts/${id}`);
};

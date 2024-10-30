// services/api.ts
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const api = axios.create({
  baseURL: API_URL,
});

// Tipe untuk objek Post
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Fungsi API dengan tipe data yang disesuaikan
export const getPosts = () => api.get<Post[]>('/posts');
export const getPost = (id: number) => api.get<Post>(`/posts/${id}`);
export const createPost = (data: Omit<Post, 'id'>) => api.post<Post>('/posts', data);
export const updatePost = (id: number, data: Omit<Post, 'id'>) => api.put<Post>(`/posts/${id}`, data);
export const deletePost = (id: number) => api.delete(`/posts/${id}`);

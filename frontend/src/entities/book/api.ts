import { apiClient } from '../../shared/api/client';
import type { Book } from './types';

export const fetchBooks = async (): Promise<Book[]> => {
  const response = await apiClient.get('/books/');
  return response.data;
};

export const fetchBookById = async (id: number): Promise<Book> => {
  const response = await apiClient.get(`/books/${id}`);
  return response.data;
};

export interface CreateBookDto {
  title: string;
  author: string;
  description?: string;
  status?: string;
  pickup_location?: string;
  owner_id: number;
}

export const createBook = async (data: CreateBookDto): Promise<Book> => {
  const response = await apiClient.post('/books/', data);
  return response.data;
};
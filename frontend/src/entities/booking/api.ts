import { apiClient } from '../../shared/api/client';
import type { Booking } from './types';

export const fetchUserBookings = async (userId: number): Promise<Booking[]> => {
  const response = await apiClient.get(`/bookings/user/${userId}`);
  return response.data;
};

export interface CreateBookingDto {
  book_id: number;
  user_id: number;
  start_date: string;
  end_date: string;
  status?: string;
}

export const createBooking = async (data: CreateBookingDto): Promise<Booking> => {
  const response = await apiClient.post('/bookings/', data);
  return response.data;
};
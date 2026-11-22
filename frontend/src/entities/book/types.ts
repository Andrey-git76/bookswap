export type BookStatus = 'available' | 'booked' | 'unavailable';

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  coverUrl?: string;
  status: BookStatus;
  ownerId: number;
  ownerName: string;
  pickupLocation: string;
}
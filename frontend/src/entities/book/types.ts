export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  coverUrl?: string;
  status: 'available' | 'booked' | 'unavailable';
  ownerId: number;
  ownerName: string;
  pickupLocation: string;
}

export type BookStatus = Book['status'];
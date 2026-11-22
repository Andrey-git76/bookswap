export type BookingStatus = 'active' | 'returned' | 'overdue';

export interface Booking {
  id: number;
  bookId: number;
  bookTitle: string;
  userId: number;
  startDate: string;
  endDate: string;
  status: BookingStatus;
}
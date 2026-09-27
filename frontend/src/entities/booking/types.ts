export interface Booking {
  id: number;
  bookId: number;
  bookTitle: string;
  userId: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'returned' | 'overdue';
}
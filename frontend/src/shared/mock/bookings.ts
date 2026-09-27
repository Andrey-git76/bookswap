import type { Booking } from '../../entities/booking/types';

export const mockBookings: Booking[] = [
  {
    id: 1,
    bookId: 2,
    bookTitle: 'Преступление и наказание',
    userId: 1,
    startDate: '2026-09-01',
    endDate: '2026-09-15',
    status: 'active',
  },
  {
    id: 2,
    bookId: 5,
    bookTitle: 'Гарри Поттер и философский камень',
    userId: 1,
    startDate: '2026-08-01',
    endDate: '2026-08-15',
    status: 'returned',
  },
];
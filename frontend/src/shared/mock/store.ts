import type { Book } from '../../entities/book/types';
import type { Booking } from '../../entities/booking/types';
import { mockBooks } from './books';
import { mockBookings } from './bookings';

let booksState: Book[] = [...mockBooks];
let bookingsState: Booking[] = [...mockBookings];

const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

export const demoStore = {
  async getBooks(): Promise<Book[]> {
    await delay();
    return [...booksState];
  },

  async getBookById(id: number): Promise<Book | undefined> {
    await delay(250);
    return booksState.find((book) => book.id === id);
  },

  async addBook(input: {
    title: string;
    author: string;
    description: string;
    pickupLocation: string;
  }): Promise<Book> {
    await delay(350);
    const nextId = booksState.length > 0 ? Math.max(...booksState.map((b) => b.id)) + 1 : 1;
    const created: Book = {
      id: nextId,
      title: input.title,
      author: input.author,
      description: input.description,
      status: 'available',
      ownerId: 1,
      ownerName: 'Иван Иванов',
      pickupLocation: input.pickupLocation,
    };
    booksState = [created, ...booksState];
    return created;
  },

  async getUserBookings(userId: number): Promise<Booking[]> {
    await delay();
    return bookingsState.filter((booking) => booking.userId === userId);
  },

  async createBooking(input: {
    bookId: number;
    userId: number;
    startDate: string;
    endDate: string;
  }): Promise<Booking> {
    await delay(350);
    const book = booksState.find((b) => b.id === input.bookId);
    if (!book) {
      throw new Error('Книга не найдена');
    }
    if (book.status !== 'available') {
      throw new Error('Эта книга уже забронирована или недоступна');
    }

    const nextId = bookingsState.length > 0 ? Math.max(...bookingsState.map((b) => b.id)) + 1 : 1;
    const created: Booking = {
      id: nextId,
      bookId: book.id,
      bookTitle: book.title,
      userId: input.userId,
      startDate: input.startDate,
      endDate: input.endDate,
      status: 'active',
    };

    bookingsState = [created, ...bookingsState];
    booksState = booksState.map((b) => (b.id === book.id ? { ...b, status: 'booked' } : b));
    return created;
  },

  async cancelBooking(bookingId: number): Promise<void> {
    await delay(250);
    const target = bookingsState.find((b) => b.id === bookingId);
    if (!target) return;

    bookingsState = bookingsState.map((b) =>
      b.id === bookingId ? { ...b, status: 'returned' } : b
    );
    booksState = booksState.map((book) =>
      book.id === target.bookId ? { ...book, status: 'available' } : book
    );
  },
};
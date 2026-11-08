import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { HomePage } from '../pages/HomePage';
import { CatalogPage } from '../pages/CatalogPage';
import { BookPage } from '../pages/BookPage';
import { MyBookingsPage } from '../pages/MyBookingsPage';
import { ProfilePage } from '../pages/ProfilePage';
import { LoginPage } from '../pages/LoginPage';
import { AddBookPage } from '../pages/AddBookPage'; 

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'catalog', element: <CatalogPage /> },
      { path: 'books/new', element: <AddBookPage /> }, 
      { path: 'books/:id', element: <BookPage /> },
      { path: 'my-bookings', element: <MyBookingsPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'login', element: <LoginPage /> },
    ],
  },
]);
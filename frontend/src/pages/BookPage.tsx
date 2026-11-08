import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Chip, Box, Alert, CircularProgress } from '@mui/material';
import { fetchBookById } from '../entities/book/api';
import { createBooking } from '../entities/booking/api';
import type { Book } from '../entities/book/types';
import { useEffect } from 'react';

export const BookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchBookById(Number(id));
        setBook(data);
      } catch (err) {
        setError('Книга не найдена');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleBook = async () => {
    if (!book) return;
    try {
      setBookingLoading(true);
      setError(null);
      setSuccessMsg(null);
      
      // Создаем бронь на 14 дней (условно). ID пользователя 1 (так как авторизации еще нет)
      const today = new Date();
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 14);

      await createBooking({
        book_id: book.id,
        user_id: 1, 
        start_date: today.toISOString().split('T')[0],
        end_date: nextWeek.toISOString().split('T')[0],
        status: 'active'
      });
      
      setSuccessMsg('Книга успешно забронирована!');
    } catch (err) {
      setError('Ошибка при бронировании. Возможно, книга уже занята.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;
  if (error && !book) return <Container sx={{ py: 4 }}><Alert severity="error">{error}</Alert></Container>;
  if (!book) return null;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button onClick={() => navigate('/catalog')}>← Назад в каталог</Button>
      
      <Typography variant="h4" sx={{ mt: 2 }} gutterBottom>{book.title}</Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>{book.author}</Typography>
      <Chip label={book.status} sx={{ mb: 2 }} />
      <Typography paragraph>{book.description}</Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Место выдачи: {book.pickup_location || 'Не указано'}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}

      <Button
        variant="contained"
        disabled={book.status !== 'available' || bookingLoading}
        onClick={handleBook}
        startIcon={bookingLoading ? <CircularProgress size={20} color="inherit" /> : null}
      >
        Забронировать на 14 дней
      </Button>
    </Container>
  );
};
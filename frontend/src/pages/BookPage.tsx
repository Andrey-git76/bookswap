import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Chip, Box, Alert, CircularProgress, Paper, Fade } from '@mui/material';
import type { Book, BookStatus } from '../entities/book/types';
import { ReserveBookForm, type ReserveBookValues } from '../features/reserve-book/ReserveBookForm';
import { demoStore } from '../shared/mock/store';

const statusLabels: Record<BookStatus, string> = {
  available: 'Доступна',
  booked: 'Забронирована',
  unavailable: 'Недоступна',
};

const statusColors: Record<BookStatus, 'success' | 'warning' | 'default'> = {
  available: 'success',
  booked: 'warning',
  unavailable: 'default',
};

export const BookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    demoStore
      .getBookById(Number(id))
      .then((found) => {
        if (!active) return;
        if (!found) {
          setError('Книга не найдена');
          setBook(null);
        } else {
          setError(null);
          setBook(found);
        }
      })
      .catch(() => {
        if (!active) return;
        setError('Ошибка загрузки информации о книге');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    void demoStore
      .getBookById(Number(id))
      .then((found) => {
        if (!found) {
          setError('Книга не найдена');
          setBook(null);
        } else {
          setBook(found);
        }
      })
      .catch(() => {
        setError('Ошибка загрузки информации о книге');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleReserve = async (values: ReserveBookValues) => {
    if (!book) return;
    setBookingSubmitting(true);
    try {
      await demoStore.createBooking({
        bookId: book.id,
        userId: 1,
        startDate: values.startDate,
        endDate: values.endDate,
      });
      setBook((prev) => (prev ? { ...prev, status: 'booked' } : null));
    } finally {
      setBookingSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !book) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Button onClick={() => navigate('/catalog')} sx={{ mb: 2 }}>
          ← Назад в каталог
        </Button>
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={handleRetry}>
              Повторить
            </Button>
          }
        >
          {error || 'Книга не найдена'}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button onClick={() => navigate('/catalog')} sx={{ mb: 2 }}>
        ← Назад в каталог
      </Button>

      <Fade in timeout={400}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            {book.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {book.author}
          </Typography>
          <Chip
            label={statusLabels[book.status]}
            color={statusColors[book.status]}
            sx={{ mb: 2 }}
          />
          <Typography sx={{ mb: 2 }}>
            {book.description || 'Описание отсутствует'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Место выдачи: {book.pickupLocation || 'Не указано'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Владелец: {book.ownerName}
          </Typography>

          <ReserveBookForm
            disabled={book.status !== 'available'}
            submitting={bookingSubmitting}
            onReserve={handleReserve}
          />
        </Paper>
      </Fade>
    </Container>
  );
};
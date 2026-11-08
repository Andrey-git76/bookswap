import { useState, useEffect } from 'react';
import { Container, Typography, Grid, CircularProgress, Alert, Box } from '@mui/material';
import { BookingCard } from '../entities/booking/BookingCard';
import { fetchUserBookings } from '../entities/booking/api';
import type { Booking } from '../entities/booking/types';

export const MyBookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        // Берем брони для пользователя с ID = 1
        const data = await fetchUserBookings(1);
        setBookings(data);
      } catch (err) {
        setError('Не удалось загрузить брони');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;
  if (error) return <Container sx={{ py: 4 }}><Alert severity="error">{error}</Alert></Container>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Мои брони
      </Typography>
      
      {bookings.length === 0 ? (
        <Alert severity="info">У вас пока нет активных броней</Alert>
      ) : (
        <Grid container spacing={2}>
          {bookings.map((b) => (
            <Grid item xs={12} md={6} key={b.id}>
              <BookingCard booking={b} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
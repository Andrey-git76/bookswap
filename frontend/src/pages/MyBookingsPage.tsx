import { useState, useEffect } from 'react';
import { Container, Typography, Grid, CircularProgress, Alert, Box, Button, Fade } from '@mui/material';
import { BookingCard } from '../entities/booking/BookingCard';
import type { Booking } from '../entities/booking/types';
import { demoStore } from '../shared/mock/store';

export const MyBookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    demoStore
      .getUserBookings(1)
      .then((data) => {
        if (!active) return;
        setError(null);
        setBookings(data);
      })
      .catch(() => {
        if (!active) return;
        setError('Не удалось загрузить список броней');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const refreshBookings = async () => {
    try {
      setError(null);
      const data = await demoStore.getUserBookings(1);
      setBookings(data);
    } catch {
      setError('Не удалось загрузить список броней');
    }
  };

  const handleRetry = () => {
    setLoading(true);
    void refreshBookings().finally(() => setLoading(false));
  };

  const handleCancelBooking = async (bookingId: number) => {
    await demoStore.cancelBooking(bookingId);
    await refreshBookings();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={handleRetry}>
              Повторить
            </Button>
          }
        >
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Мои брони
      </Typography>

      {bookings.length === 0 ? (
        <Alert severity="info">У вас пока нет броней</Alert>
      ) : (
        <Grid container spacing={2}>
          {bookings.map((booking, index) => (
            <Grid key={booking.id} size={{ xs: 12, md: 6 }}>
              <Fade in timeout={350 + index * 80}>
                <div>
                  <BookingCard booking={booking} onCancel={handleCancelBooking} />
                </div>
              </Fade>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
import { Container, Typography, Grid } from '@mui/material';
import { BookingCard } from '../entities/booking/BookingCard';
import { mockBookings } from '../shared/mock/bookings';

export const MyBookingsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Мои брони
      </Typography>
      <Grid container spacing={2}>
        {mockBookings.map((b) => (
          <Grid item xs={12} md={6} key={b.id}>
            <BookingCard booking={b} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
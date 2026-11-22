import { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, CircularProgress, Box, Alert, Fade } from '@mui/material';
import { demoStore } from '../shared/mock/store';

export const ProfilePage = () => {
  const [booksCount, setBooksCount] = useState(0);
  const [activeBookingsCount, setActiveBookingsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfileStats = async () => {
      try {
        setLoading(true);
        const [books, bookings] = await Promise.all([
          demoStore.getBooks(),
          demoStore.getUserBookings(1),
        ]);
        setBooksCount(books.filter((b) => b.ownerId === 1).length);
        setActiveBookingsCount(bookings.filter((b) => b.status === 'active').length);
      } catch {
        setError('Не удалось загрузить данные профиля');
      } finally {
        setLoading(false);
      }
    };
    void loadProfileStats();
  }, []);

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
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Профиль
      </Typography>
      <Fade in timeout={400}>
        <Card>
          <CardContent>
            <Typography variant="h6">Иван Иванов</Typography>
            <Typography color="text.secondary">ivan@example.com</Typography>
            <Typography sx={{ mt: 2 }}>Книг в обмене: {booksCount}</Typography>
            <Typography>Активных броней: {activeBookingsCount}</Typography>
          </CardContent>
        </Card>
      </Fade>
    </Container>
  );
};
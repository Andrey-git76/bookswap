import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Chip } from '@mui/material';
import { mockBooks } from '../shared/mock/books';

export const BookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = mockBooks.find((b) => b.id === Number(id));

  if (!book) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Книга не найдена</Typography>
        <Button onClick={() => navigate('/catalog')}>В каталог</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button onClick={() => navigate('/catalog')}>← Назад</Button>
      <Typography variant="h4" sx={{ mt: 2 }} gutterBottom>
        {book.title}
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {book.author}
      </Typography>
      <Chip label={book.status} sx={{ mb: 2 }} />
      <Typography paragraph>{book.description}</Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Место выдачи: {book.pickupLocation}
      </Typography>
      <Button
        variant="contained"
        disabled={book.status !== 'available'}
        onClick={() => alert('Бронирование (демо)')}
      >
        Забронировать
      </Button>
    </Container>
  );
};
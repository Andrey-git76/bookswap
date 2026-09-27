import { Card, CardContent, Typography, Chip, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Book } from './types';

interface Props {
  book: Book;
}

const statusLabels: Record<Book['status'], string> = {
  available: 'Доступна',
  booked: 'Забронирована',
  unavailable: 'Недоступна',
};

const statusColors: Record<Book['status'], 'success' | 'warning' | 'default'> = {
  available: 'success',
  booked: 'warning',
  unavailable: 'default',
};

export const BookCard = ({ book }: Props) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {book.author}
        </Typography>
        <Chip
          label={statusLabels[book.status]}
          color={statusColors[book.status]}
          size="small"
          sx={{ mb: 2 }}
        />
        <Typography variant="body2" sx={{ mb: 2 }}>
          {book.description}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Место выдачи: {book.pickupLocation}
        </Typography>
      </CardContent>
      <Button
        variant="contained"
        onClick={() => navigate(`/books/${book.id}`)}
        sx={{ m: 2 }}
      >
        Подробнее
      </Button>
    </Card>
  );
};
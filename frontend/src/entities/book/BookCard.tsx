import { Card, CardContent, Typography, Chip, Button, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Book, BookStatus } from './types';

interface BookCardProps {
  book: Book;
}

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

export const BookCard = ({ book }: BookCardProps) => {
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
          sx={{ mb: 1.5 }}
        />
        <Typography variant="body2" sx={{ mb: 1.5 }}>
          {book.description || 'Описание не добавлено'}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
          Место выдачи: {book.pickupLocation || 'Не указано'}
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate(`/books/${book.id}`)}
        >
          Подробнее
        </Button>
      </CardActions>
    </Card>
  );
};
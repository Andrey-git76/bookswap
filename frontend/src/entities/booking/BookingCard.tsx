import { Card, CardContent, Typography, Chip, Box, Button } from '@mui/material';
import type { Booking, BookingStatus } from './types';

interface BookingCardProps {
  booking: Booking;
  onCancel?: (bookingId: number) => void;
}

const statusLabels: Record<BookingStatus, string> = {
  active: 'Активна',
  returned: 'Возвращена',
  overdue: 'Просрочена',
};

const statusColors: Record<BookingStatus, 'primary' | 'default' | 'error'> = {
  active: 'primary',
  returned: 'default',
  overdue: 'error',
};

export const BookingCard = ({ booking, onCancel }: BookingCardProps) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1, mb: 1 }}>
          <Typography variant="h6">
            {booking.bookTitle}
          </Typography>
          <Chip
            label={statusLabels[booking.status]}
            color={statusColors[booking.status]}
            size="small"
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          С {booking.startDate} по {booking.endDate}
        </Typography>
        {booking.status === 'active' && onCancel && (
          <Button
            size="small"
            variant="outlined"
            color="warning"
            onClick={() => onCancel(booking.id)}
          >
            Отменить бронь
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
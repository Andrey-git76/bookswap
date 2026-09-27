import { Card, CardContent, Typography, Chip } from '@mui/material';
import type { Booking } from './types';

interface Props {
  booking: Booking;
}

const statusLabels: Record<Booking['status'], string> = {
  active: 'Активна',
  returned: 'Возвращена',
  overdue: 'Просрочена',
};

const statusColors: Record<Booking['status'], 'primary' | 'success' | 'error'> = {
  active: 'primary',
  returned: 'success',
  overdue: 'error',
};

export const BookingCard = ({ booking }: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{booking.bookTitle}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          С {booking.startDate} по {booking.endDate}
        </Typography>
        <Chip
          label={statusLabels[booking.status]}
          color={statusColors[booking.status]}
          size="small"
        />
      </CardContent>
    </Card>
  );
};
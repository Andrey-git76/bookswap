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

export const BookingCard = ({ booking }: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          Книга (ID: {booking.book_id})
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          С {booking.start_date} по {booking.end_date}
        </Typography>
        <Chip
          label={statusLabels[booking.status] || booking.status}
          color={booking.status === 'active' ? 'primary' : 'default'}
          size="small"
        />
      </CardContent>
    </Card>
  );
};
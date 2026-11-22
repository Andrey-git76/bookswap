import { useState } from 'react';
import { Box, TextField, Button, Alert, CircularProgress, Collapse } from '@mui/material';

export interface ReserveBookValues {
  startDate: string;
  endDate: string;
}

interface ReserveBookFormProps {
  disabled?: boolean;
  submitting?: boolean;
  onReserve: (values: ReserveBookValues) => Promise<void> | void;
}

const formatIsoDate = (date: Date): string => date.toISOString().split('T')[0];

export const ReserveBookForm = ({
  disabled = false,
  submitting = false,
  onReserve,
}: ReserveBookFormProps) => {
  const today = new Date();
  const defaultEnd = new Date(today);
  defaultEnd.setDate(today.getDate() + 14);

  const [startDate, setStartDate] = useState(formatIsoDate(today));
  const [endDate, setEndDate] = useState(formatIsoDate(defaultEnd));
  const [dateError, setDateError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!startDate || !endDate) {
      setDateError('Укажите дату начала и дату возврата');
      return;
    }

    if (endDate < startDate) {
      setDateError('Дата возврата не может быть раньше даты начала');
      return;
    }

    setDateError(null);

    try {
      await onReserve({ startDate, endDate });
      setFeedback({
        type: 'success',
        text: 'Книга успешно забронирована! Запись добавлена в «Мои брони».',
      });
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'Ошибка при оформлении брони',
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 2 }}>
        <TextField
          label="Дата начала"
          type="date"
          slotProps={{ inputLabel: { shrink: true } }}
          value={startDate}
          disabled={disabled || submitting}
          onChange={(e) => {
            setStartDate(e.target.value);
            setDateError(null);
          }}
        />
        <TextField
          label="Дата возврата"
          type="date"
          slotProps={{ inputLabel: { shrink: true } }}
          value={endDate}
          disabled={disabled || submitting}
          error={Boolean(dateError)}
          helperText={dateError || 'Рекомендуемый срок — до 14 дней'}
          onChange={(e) => {
            setEndDate(e.target.value);
            setDateError(null);
          }}
        />
      </Box>

      <Collapse in={Boolean(feedback)}>
        {feedback && (
          <Alert severity={feedback.type} sx={{ mb: 2 }}>
            {feedback.text}
          </Alert>
        )}
      </Collapse>

      <Button
        type="submit"
        variant="contained"
        disabled={disabled || submitting}
        startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : null}
      >
        {disabled
          ? 'Книга недоступна для брони'
          : submitting
            ? 'Бронирование...'
            : 'Забронировать книгу'}
      </Button>
    </Box>
  );
};
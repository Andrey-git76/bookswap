import { Box, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import type { BookStatus } from '../../entities/book/types';

export type StatusFilterValue = 'all' | BookStatus;

interface BookSearchFilterProps {
  search: string;
  statusFilter: StatusFilterValue;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: StatusFilterValue) => void;
}

export const BookSearchFilter = ({
  search,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
}: BookSearchFilterProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        mb: 3,
      }}
    >
      <TextField
        fullWidth
        label="Поиск по названию или автору"
        placeholder="Например: Булгаков или 1984"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <ToggleButtonGroup
        exclusive
        value={statusFilter}
        onChange={(_, nextValue: StatusFilterValue | null) => {
          if (nextValue) {
            onStatusFilterChange(nextValue);
          }
        }}
        sx={{ flexShrink: 0 }}
      >
        <ToggleButton value="all">Все</ToggleButton>
        <ToggleButton value="available">Доступны</ToggleButton>
        <ToggleButton value="booked">Заняты</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};
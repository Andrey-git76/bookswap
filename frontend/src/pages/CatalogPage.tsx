import { useState, useEffect } from 'react';
import { Container, Typography, Grid, CircularProgress, Alert, Box, Button, Fade } from '@mui/material';
import { Link } from 'react-router-dom';
import { BookCard } from '../entities/book/BookCard';
import type { Book } from '../entities/book/types';
import { BookSearchFilter, type StatusFilterValue } from '../features/book-search/BookSearchFilter';
import { demoStore } from '../shared/mock/store';

export const CatalogPage = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilterValue>('all');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    demoStore
      .getBooks()
      .then((data) => {
        if (!active) return;
        setError(null);
        setBooks(data);
      })
      .catch(() => {
        if (!active) return;
        setError('Не удалось загрузить список книг.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    void demoStore
      .getBooks()
      .then((data) => {
        setBooks(data);
      })
      .catch(() => {
        setError('Не удалось загрузить список книг.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const filtered = books.filter((b) => {
    const q = search.trim().toLowerCase();
    const matchesText =
      !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesText && matchesStatus;
  });

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
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={handleRetry}>
              Повторить
            </Button>
          }
        >
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 3 }}>
        <Typography variant="h4">Каталог книг</Typography>
        <Button variant="contained" component={Link} to="/books/new">
          Добавить книгу
        </Button>
      </Box>

      <BookSearchFilter
        search={search}
        statusFilter={statusFilter}
        onSearchChange={setSearch}
        onStatusFilterChange={setStatusFilter}
      />

      {filtered.length === 0 ? (
        <Alert severity="info">Книги по вашему запросу не найдены</Alert>
      ) : (
        <Grid container spacing={3}>
          {filtered.map((book, index) => (
            <Grid key={book.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Fade in timeout={350 + index * 80}>
                <div>
                  <BookCard book={book} />
                </div>
              </Fade>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
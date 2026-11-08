import { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, CircularProgress, Alert, Box, Button, Fade } from '@mui/material';
import { Link } from 'react-router-dom';
import { BookCard } from '../entities/book/BookCard';
import { fetchBooks } from '../entities/book/api';
import type { Book } from '../entities/book/types';

export const CatalogPage = () => {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks();
        setBooks(data);
      } catch (err) {
        setError('Не удалось загрузить список книг. Проверьте подключение к серверу.');
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, []);

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Каталог книг
        </Typography>
        <Button variant="contained" component={Link} to="/books/new">
          Добавить книгу
        </Button>
      </Box>
      
      <TextField
        fullWidth
        label="Поиск по названию или автору"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      {filtered.length === 0 ? (
        <Alert severity="info">Книги не найдены</Alert>
      ) : (
        <Grid container spacing={3}>
          {filtered.map((book, index) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              {/* Добавили Fade для плавного появления карточек */}
              <Fade in timeout={500 + index * 100}>
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
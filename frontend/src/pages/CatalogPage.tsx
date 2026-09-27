import { useState } from 'react';
import { Container, Typography, Grid, TextField } from '@mui/material';
import { BookCard } from '../entities/book/BookCard';
import { mockBooks } from '../shared/mock/books';

export const CatalogPage = () => {
  const [search, setSearch] = useState('');

  const filtered = mockBooks.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Каталог книг
      </Typography>
      <TextField
        fullWidth
        label="Поиск по названию или автору"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />
      <Grid container spacing={3}>
        {filtered.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
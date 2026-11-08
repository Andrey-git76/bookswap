import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Alert, CircularProgress } from '@mui/material';
import { createBook } from '../entities/book/api';

export const AddBookPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    pickup_location: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Простейшая клиентская валидация
    if (!formData.title.trim() || !formData.author.trim()) {
      setError('Название и автор обязательны для заполнения');
      return;
    }

    try {
      setLoading(true);
      // ВНИМАНИЕ: owner_id = 1 (заглушка, так как авторизации еще нет)
      await createBook({
        ...formData,
        owner_id: 1, 
        status: 'available',
      });
      navigate('/catalog'); // Возвращаемся в каталог после успеха
    } catch (err) {
      setError('Ошибка при создании книги. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Добавить книгу
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Название"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <TextField
          label="Автор"
          required
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        />
        <TextField
          label="Описание"
          multiline
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <TextField
          label="Место выдачи"
          value={formData.pickup_location}
          onChange={(e) => setFormData({ ...formData, pickup_location: e.target.value })}
        />
        <Button 
          type="submit" 
          variant="contained" 
          size="large" 
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          Сохранить
        </Button>
      </Box>
    </Container>
  );
};
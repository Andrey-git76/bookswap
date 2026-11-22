import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Paper, Fade } from '@mui/material';
import { AddBookForm, type AddBookFormValues } from '../features/add-book/AddBookForm';
import { demoStore } from '../shared/mock/store';

export const AddBookPage = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleCreateBook = async (values: AddBookFormValues) => {
    setSubmitting(true);
    try {
      await demoStore.addBook(values);
      navigate('/catalog');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Button onClick={() => navigate('/catalog')} sx={{ mb: 2 }}>
        ← Назад в каталог
      </Button>
      <Fade in timeout={400}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Добавить книгу
          </Typography>
          <AddBookForm submitting={submitting} onSubmit={handleCreateBook} />
        </Paper>
      </Fade>
    </Container>
  );
};
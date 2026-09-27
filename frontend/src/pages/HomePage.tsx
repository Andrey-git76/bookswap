import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center" sx={{ py: 6 }}>
        <Typography variant="h3" gutterBottom>
          BookSwap
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Обмен книгами между людьми
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Находите книги, бронируйте и обменивайтесь с другими читателями.
        </Typography>
        <Button variant="contained" size="large" onClick={() => navigate('/catalog')}>
          Перейти в каталог
        </Button>
      </Box>
    </Container>
  );
};
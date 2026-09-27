import { Container, Typography, Card, CardContent } from '@mui/material';

export const ProfilePage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Профиль
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h6">Иван Иванов</Typography>
          <Typography color="text.secondary">ivan@example.com</Typography>
          <Typography sx={{ mt: 2 }}>Книг в обмене: 3</Typography>
          <Typography>Активных броней: 1</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};
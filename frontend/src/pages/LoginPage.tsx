import { Container, Typography, Card, CardContent, Fade } from '@mui/material';
import { LoginForm } from '../features/auth-demo/LoginForm';

export const LoginPage = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Fade in timeout={400}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Вход
            </Typography>
            <LoginForm />
          </CardContent>
        </Card>
      </Fade>
    </Container>
  );
};
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          BookSwap
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={RouterLink} to="/catalog">
            Каталог
          </Button>
          <Button color="inherit" component={RouterLink} to="/my-bookings">
            Мои брони
          </Button>
          <Button color="inherit" component={RouterLink} to="/profile">
            Профиль
          </Button>
          <Button color="inherit" component={RouterLink} to="/login">
            Войти
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
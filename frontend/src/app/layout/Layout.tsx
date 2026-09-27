import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { Header } from './Header';

export const Layout = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Header />
      <Outlet />
    </Box>
  );
};
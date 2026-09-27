import { Button as MuiButton, type ButtonProps } from '@mui/material';

export const Button = (props: ButtonProps) => {
  return <MuiButton variant="contained" {...props} />;
};
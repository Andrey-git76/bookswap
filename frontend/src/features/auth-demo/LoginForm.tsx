import { useState } from 'react';
import { Box, TextField, Button, Alert, Collapse } from '@mui/material';

interface LoginFormProps {
  onSuccess?: (email: string) => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    if (!email.trim()) {
      setEmailError('Введите email');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError('Некорректный формат email');
      valid = false;
    } else {
      setEmailError(null);
    }

    if (!password) {
      setPasswordError('Введите пароль');
      valid = false;
    } else if (password.length < 4) {
      setPasswordError('Пароль должен содержать не менее 4 символов');
      valid = false;
    } else {
      setPasswordError(null);
    }

    if (!valid) return;

    const cleanEmail = email.trim();
    setSubmittedEmail(cleanEmail);
    onSuccess?.(cleanEmail);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Email"
        type="email"
        value={email}
        error={Boolean(emailError)}
        helperText={emailError || 'Например: ivan@example.com'}
        onChange={(e) => {
          setEmail(e.target.value);
          if (emailError) setEmailError(null);
        }}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Пароль"
        type="password"
        value={password}
        error={Boolean(passwordError)}
        helperText={passwordError || 'Минимум 4 символа'}
        onChange={(e) => {
          setPassword(e.target.value);
          if (passwordError) setPasswordError(null);
        }}
        sx={{ mb: 3 }}
      />
      <Button type="submit" variant="contained" fullWidth>
        Войти
      </Button>

      <Collapse in={Boolean(submittedEmail)}>
        {submittedEmail && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Вход выполнен (демо-режим для ЛР №3): {submittedEmail}
          </Alert>
        )}
      </Collapse>
    </Box>
  );
};
import { useState } from 'react';
import { Box, TextField, Button, Alert, CircularProgress, Collapse } from '@mui/material';

export interface AddBookFormValues {
  title: string;
  author: string;
  description: string;
  pickupLocation: string;
}

interface AddBookFormProps {
  submitting?: boolean;
  onSubmit: (values: AddBookFormValues) => Promise<void> | void;
}

interface FormErrors {
  title?: string;
  author?: string;
  pickupLocation?: string;
}

export const AddBookForm = ({ submitting = false, onSubmit }: AddBookFormProps) => {
  const [values, setValues] = useState<AddBookFormValues>({
    title: '',
    author: '',
    description: '',
    pickupLocation: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!values.title.trim()) {
      nextErrors.title = 'Введите название книги';
    } else if (values.title.trim().length < 2) {
      nextErrors.title = 'Название должно содержать минимум 2 символа';
    }

    if (!values.author.trim()) {
      nextErrors.author = 'Укажите автора книги';
    } else if (values.author.trim().length < 2) {
      nextErrors.author = 'Имя автора должно содержать минимум 2 символа';
    }

    if (values.pickupLocation.trim() && values.pickupLocation.trim().length < 4) {
      nextErrors.pickupLocation = 'Укажите место выдачи подробнее (минимум 4 символа)';
    }

    return nextErrors;
  };

  const handleFieldChange = (field: keyof AddBookFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (field in errors) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setSubmitError(null);
      await onSubmit({
        title: values.title.trim(),
        author: values.author.trim(),
        description: values.description.trim(),
        pickupLocation: values.pickupLocation.trim(),
      });
    } catch {
      setSubmitError('Не удалось сохранить книгу. Попробуйте ещё раз.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Collapse in={Boolean(submitError)}>
        {submitError && <Alert severity="error">{submitError}</Alert>}
      </Collapse>

      <TextField
        label="Название"
        required
        fullWidth
        value={values.title}
        error={Boolean(errors.title)}
        helperText={errors.title || 'Обязательное поле'}
        onChange={(e) => handleFieldChange('title', e.target.value)}
      />

      <TextField
        label="Автор"
        required
        fullWidth
        value={values.author}
        error={Boolean(errors.author)}
        helperText={errors.author || 'Обязательное поле'}
        onChange={(e) => handleFieldChange('author', e.target.value)}
      />

      <TextField
        label="Описание"
        multiline
        rows={3}
        fullWidth
        value={values.description}
        onChange={(e) => handleFieldChange('description', e.target.value)}
      />

      <TextField
        label="Место выдачи"
        fullWidth
        placeholder="Например: Москва, ул. Ленина, 10"
        value={values.pickupLocation}
        error={Boolean(errors.pickupLocation)}
        helperText={errors.pickupLocation || 'Необязательное поле'}
        onChange={(e) => handleFieldChange('pickupLocation', e.target.value)}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={submitting}
        startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : null}
      >
        {submitting ? 'Сохранение...' : 'Сохранить'}
      </Button>
    </Box>
  );
};
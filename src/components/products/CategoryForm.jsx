import React, { useState } from 'react'; 
import { 
  TextField, 
  Button, 
  CircularProgress, 
  Alert, 
  Box 
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('El nombre es requerido')
    .max(50, 'Máximo 50 caracteres'),
});

const CategoryForm = ({ initialValues = { name: '' }, onSubmit, isEdit = false }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null); 

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSubmit(values);
        navigate('/categories');
      } catch (err) {
        setError(err.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <TextField
        fullWidth
        name="name"
        label="Nombre de categoría"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        margin="normal"
      />
      
      <Box sx={{ mt: 3 }}>
        <Button 
          type="submit" 
          variant="contained" 
          disabled={formik.isSubmitting}
          sx={{ mr: 2 }}
        >
          {formik.isSubmitting ? (
            <CircularProgress size={24} />
          ) : isEdit ? 'Actualizar' : 'Crear'}
        </Button>
        <Button 
          variant="outlined" 
          onClick={() => navigate('/categories')}
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  );
};

export default CategoryForm;
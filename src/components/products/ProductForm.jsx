import React, { useEffect, useState } from 'react';
import { 
  TextField, 
  Button, 
  CircularProgress, 
  Alert, 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem 
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../../services/categoryService';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('El nombre es requerido')
    .max(100, 'Máximo 100 caracteres'),
  description: Yup.string()
    .required('La descripción es requerida')
    .max(200, 'Máximo 200 caracteres'),
  price: Yup.number()
    .required('El precio es requerido')
    .positive('El precio debe ser positivo'),
  category_id: Yup.number()
    .required('La categoría es requerida')
    .positive('Seleccione una categoría'),
});

const ProductForm = ({ initialValues = null, onSubmit, isEdit = false }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Carga las categorías y establece valores iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData] = await Promise.all([
          getCategories()
        ]);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: initialValues || {
      name: '',
      description: '',
      price: '',
      category_id: ''
    },
    validationSchema,
    enableReinitialize: true, // Permite reinicializar con nuevos valores
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSubmit(values);
        navigate('/products');
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (loadingCategories) return <CircularProgress />;

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
        label="Nombre del producto"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        margin="normal"
      />
      
      <TextField
        fullWidth
        name="description"
        label="Descripción"
        multiline
        rows={4}
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
        margin="normal"
      />
      
      <TextField
        fullWidth
        name="price"
        label="Precio"
        type="number"
        value={formik.values.price}
        onChange={formik.handleChange}
        error={formik.touched.price && Boolean(formik.errors.price)}
        helperText={formik.touched.price && formik.errors.price}
        margin="normal"
        inputProps={{ step: "0.01" }}
      />
      
      <FormControl 
        fullWidth 
        margin="normal" 
        error={formik.touched.category_id && Boolean(formik.errors.category_id)}
      >
        <InputLabel>Categoría</InputLabel>
        <Select
          name="category_id"
          value={formik.values.category_id}
          onChange={formik.handleChange}
          label="Categoría"
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        {formik.touched.category_id && formik.errors.category_id && (
          <Box sx={{ color: 'error.main', fontSize: '0.75rem', mt: 1 }}>
            {formik.errors.category_id}
          </Box>
        )}
      </FormControl>
      
      <Box sx={{ mt: 2 }}>
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
          onClick={() => navigate('/products')}
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  );
};

export default ProductForm;
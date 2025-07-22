import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography,
  CircularProgress,
  Alert 
} from '@mui/material';
import CategoryForm from '../components/products/CategoryForm';
import { useParams } from 'react-router-dom';
import { createCategory, updateCategory, getCategoryById } from '../services/categoryService';

const CategoryFormPage = ({ isEdit = false }) => {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({ name: '' });
  const [loading, setLoading] = useState(isEdit); 
  const [error, setError] = useState(null);
  
  const handleSubmit = isEdit 
    ? (data) => updateCategory(id, data)
    : createCategory;

  useEffect(() => {
    if (isEdit && id) {
      const fetchCategory = async () => {
        try {
          const category = await getCategoryById(id);
          setInitialValues({ name: category.name });
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      
      fetchCategory();
    }
  }, [isEdit, id]);

  if (loading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {isEdit ? 'Editar Categoría' : 'Crear Nueva Categoría'}
      </Typography>
      <CategoryForm 
        initialValues={initialValues}
        onSubmit={handleSubmit} 
        isEdit={isEdit}
      />
    </Box>
  );
};

export default CategoryFormPage;
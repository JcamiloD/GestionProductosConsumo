import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import ProductForm from '../components/products/ProductForm';
import { useParams } from 'react-router-dom';
import { createProduct, updateProduct, getProductById } from '../services/productService';

const ProductFormPage = ({ isEdit = false }) => {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(isEdit); // Solo carga en modo edición
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit && id) {
      const fetchProduct = async () => {
        try {
          const product = await getProductById(id);
          setInitialValues({
            name: product.name,
            description: product.description,
            price: product.price,
            category_id: product.category_id
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, isEdit]);

  const handleSubmit = isEdit 
    ? (data) => updateProduct(id, data)
    : createProduct;

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {isEdit ? 'Editar Producto' : 'Crear Nuevo Producto'}
      </Typography>
      <ProductForm 
        initialValues={initialValues}
        onSubmit={handleSubmit} 
        isEdit={isEdit}
      />
    </Box>
  );
};

export default ProductFormPage;
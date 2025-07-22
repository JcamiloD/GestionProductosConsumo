import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ProductList from '../components/products/ProductList';

const ProductsPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Lista de Productos</Typography>
        <Button 
          component={Link} 
          to="/products/new" 
          variant="contained" 
          color="primary"
        >
          Crear Nuevo Producto
        </Button>
      </Box>
      <ProductList />
    </Box>
  );
};

export default ProductsPage;
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import CategoryList from '../components/products/CategoryList';

const CategoriesPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Categorías</Typography>
        <Button 
          component={Link} 
          to="/categories/new" 
          variant="contained" 
          color="primary"
        >
          Nueva Categoría
        </Button>
      </Box>
      <CategoryList />
    </Box>
  );
};

export default CategoriesPage;
import React from 'react';
import { Box } from '@mui/material';
import ProductDetail from '../components/products/ProductDetail';

const ProductDetailPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <ProductDetail />
    </Box>
  );
};

export default ProductDetailPage;
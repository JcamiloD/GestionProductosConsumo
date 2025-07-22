import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '70vh',
      textAlign: 'center'
    }}>
      <Typography variant="h2" gutterBottom>
        Bienvenido al Sistema de Gestión
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        Administra tus productos y categorías fácilmente
      </Typography>
      <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        <Button 
          component={Link} 
          to="/products" 
          variant="contained" 
          size="large"
        >
          Ver Productos
        </Button>
        <Button 
          component={Link} 
          to="/categories" 
          variant="outlined" 
          size="large"
        >
          Ver Categorías
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
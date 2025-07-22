import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFoundPage = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '60vh',
      textAlign: 'center'
    }}>
      <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
      <Typography variant="h3" gutterBottom>
        404 - Página no encontrada
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        La página que estás buscando no existe o ha sido movida.
      </Typography>
      <Button 
        component={Link} 
        to="/" 
        variant="contained" 
        sx={{ mt: 3 }}
      >
        Volver al inicio
      </Button>
    </Box>
  );
};

export default NotFoundPage;
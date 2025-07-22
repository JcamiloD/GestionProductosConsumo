import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  CircularProgress, 
  Alert, 
  Card, 
  CardContent,
  Chip,
  Divider,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getProductById, deleteProduct } from '../../services/productService';
import { Edit, Delete, ArrowBack } from '@mui/icons-material';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);
      await deleteProduct(id);
      navigate('/products');
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
      handleCloseDeleteDialog();
    }
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Alert severity="error" sx={{ m: 2 }}>
      {error}
    </Alert>
  );

  if (!product) return (
    <Alert severity="warning" sx={{ m: 2 }}>
      Producto no encontrado
    </Alert>
  );

  return (
    <>
      <Card sx={{ maxWidth: 800, mx: 'auto', mt: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Chip 
              label={product.category_name} 
              color="primary" 
              variant="outlined" 
            />
            <Chip 
              label={`$${product.price.toFixed(2)}`} 
              color="secondary" 
            />
          </Stack>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            mt: 4,
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Button 
              startIcon={<ArrowBack />} 
              component={Link} 
              to="/products" 
              variant="outlined"
            >
              Volver
            </Button>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                startIcon={<Edit />} 
                component={Link} 
                to={`/products/${product.id}/edit`} 
                variant="contained"
                color="primary"
              >
                Editar
              </Button>
              
              <Button 
                startIcon={<Delete />} 
                variant="contained" 
                color="error"
                onClick={handleOpenDeleteDialog}
                disabled={deleting}
              >
                Eliminar
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmar Eliminación
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro que deseas eliminar el producto "{product.name}"? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseDeleteDialog}
            disabled={deleting}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            color="error"
            autoFocus
            disabled={deleting}
          >
            {deleting ? <CircularProgress size={24} /> : 'Confirmar'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductDetail;
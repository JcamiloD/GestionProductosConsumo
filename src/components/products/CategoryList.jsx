import React, { useEffect, useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  CircularProgress, 
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar
} from '@mui/material';
import { Link } from 'react-router-dom';
import { getCategories, deleteCategory } from '../../services/categoryService';
import { Edit, Delete } from '@mui/icons-material';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDeleteDialog = (id) => {
    setCategoryToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      await deleteCategory(categoryToDelete);
      fetchCategories();
      handleCloseDeleteDialog();
    } catch (err) {
      if (err.response && err.response.data.message === "Cannot delete category with associated products") {
        setSnackbarMessage("No se puede eliminar la categoría porque tiene productos asociados");
        setSnackbarOpen(true);
      } else {
        setError(err.message || "Ocurrió un error al eliminar la categoría");
      }
    } finally {
      setDeleting(false);
      handleCloseDeleteDialog();
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <Button 
                    component={Link} 
                    to={`/categories/${category.id}/edit`} 
                    startIcon={<Edit />}
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    Editar
                  </Button>
                  <Button
                    startIcon={<Delete />}
                    size="small"
                    color="error"
                    onClick={() => handleOpenDeleteDialog(category.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmar Eliminación
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro que deseas eliminar esta categoría? Esta acción no se puede deshacer.
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
            {deleting ? <CircularProgress size={24} /> : 'Eliminar'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CategoryList;
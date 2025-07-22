import { Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import ProductsPage from './pages/ProductsPage';
import ProductFormPage from './pages/ProductFormPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryFormPage from './pages/CategoryFormPage';
import ProductDetailPage from './pages/ProductDetailPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Box component="main" sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
        <Routes>
          {/* Ruta raíz */}
          <Route path="/" element={<HomePage />} />
          
          {/* Rutas de productos */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/new" element={<ProductFormPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/products/:id/edit" element={<ProductFormPage isEdit />} />
          
          {/* Rutas de categorías */}
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/new" element={<CategoryFormPage />} />
          <Route path="/categories/:id/edit" element={<CategoryFormPage isEdit />} />
          
          {/* Ruta para páginas no encontradas */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
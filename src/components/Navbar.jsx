import React from 'react';
import { 
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import StorefrontIcon from '@mui/icons-material/Storefront';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: 'background.paper' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box component={Link} to="/" sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <StorefrontIcon color="primary" sx={{ fontSize: 40, mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ 
            color: 'text.primary',
            fontWeight: 'bold',
            display: { xs: 'none', sm: 'block' }
          }}>
            Mi Tienda
          </Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <Button
            component={Link}
            to="/products"
            startIcon={<StorefrontIcon />}
            color={isActive('/products') ? 'primary' : 'inherit'}
            sx={{
              fontWeight: isActive('/products') ? 'bold' : 'normal',
              color: isActive('/products') ? 'primary.main' : 'text.primary'
            }}
          >
            Productos
          </Button>
          
          <Button
            component={Link}
            to="/categories"
            startIcon={<CategoryIcon />}
            color={isActive('/categories') ? 'primary' : 'inherit'}
            sx={{
              fontWeight: isActive('/categories') ? 'bold' : 'normal',
              color: isActive('/categories') ? 'primary.main' : 'text.primary'
            }}
          >
            Categorías
          </Button>
        </Box>

        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{ color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem 
              component={Link} 
              to="/products" 
              onClick={handleMenuClose}
              selected={isActive('/products')}
            >
              <StorefrontIcon sx={{ mr: 1 }} /> Productos
            </MenuItem>
            <MenuItem 
              component={Link} 
              to="/categories" 
              onClick={handleMenuClose}
              selected={isActive('/categories')}
            >
              <CategoryIcon sx={{ mr: 1 }} /> Categorías
            </MenuItem>
          </Menu>
        </Box>

        <Box>
          <IconButton component={Link} to="/cart" sx={{ color: 'text.primary' }}>
            <ShoppingCartIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
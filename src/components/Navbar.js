import React, { useState, useCallback, useMemo } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery, useTheme } from '@mui/material';
import { GRADIENT_BACKGROUND_NAVBAR } from '../constants/styles';

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState(null);

  const token = useMemo(() => localStorage.getItem('token'), []);

  const handleMenuOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/login');
    handleMenuClose();
  }, [navigate, handleMenuClose]);

  const renderDesktopLinks = useMemo(() => {
    return token ? (
      <>
        <Button color="inherit" component={Link} to="/tasks">
          Tasks
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </>
    ) : null;
  }, [token, handleLogout]);

  const renderMobileMenu = useMemo(() => {
    return (
      <>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {token && (
            <>
              <MenuItem component={Link} to="/tasks" onClick={handleMenuClose}>
                Tasks
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </>
          )}
        </Menu>
      </>
    );
  }, [anchorEl, handleMenuClose, handleMenuOpen, handleLogout, token]);

  return (
    <AppBar position="static" sx={{ background: GRADIENT_BACKGROUND_NAVBAR }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>

        {isMobile ? renderMobileMenu : renderDesktopLinks}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Switch, Box, Button } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
const Navbar = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: isDarkMode ? '#333' : '#1976d2' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
            Helpini
          </Typography>
        </Box>
        {}
        <IconButton onClick={toggleDarkMode} color="inherit">
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;

import React from 'react';
import { List, ListItem, ListItemText, Divider, Typography, Box } from '@mui/material';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import CleanHandsIcon from '@mui/icons-material/CleanHands';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import CarpenterIcon from '@mui/icons-material/Carpenter';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const icons = {
  Plomberie: <PlumbingIcon />,
  Nettoyage: <CleanHandsIcon />,
  Électrique: <ElectricalServicesIcon />,
  Menuiserie: <CarpenterIcon />,
};

const Sidebar = ({ categories, onCategoryClick, selectedCategory, onAddServiceClick, isDarkMode }) => {
  const handleLogout = () => {
    // Perform logout logic here
    window.sessionStorage.removeItem('access_token');
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <Box
      sx={{
        width: 250,
        padding: 2,
        backgroundColor: isDarkMode ? '#333' : '#f4f4f4',
        color: isDarkMode ? '#fff' : '#000',
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Categories
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem
            button
            key={category}
            onClick={() => onCategoryClick(category)}
            selected={selectedCategory === category}
            sx={{
              mb: 1,
              borderRadius: 1,
              backgroundColor: isDarkMode
                ? (selectedCategory === category ? '#555' : 'transparent')
                : (selectedCategory === category ? '#e0e0e0' : 'transparent'),
              color: isDarkMode ? '#fff' : '#000',
              '&.Mui-selected': {
                backgroundColor: isDarkMode ? '#555' : '#e0e0e0',
              },
            }}
          >
            {icons[category]}
            <ListItemText primary={category} sx={{ marginLeft: 2, color: isDarkMode ? '#fff' : '#000' }} />
          </ListItem>
        ))}
      </List>
      
      <Divider sx={{ my: 2, borderColor: isDarkMode ? '#444' : '#ccc' }} />

      {/* Add New Service Button */}
      <List>
        <ListItem button onClick={onAddServiceClick}>
          <AddCircleIcon />
          <ListItemText primary="Add New Service" sx={{ marginLeft: 2, color: isDarkMode ? '#fff' : '#000' }} />
        </ListItem>
      </List>

      <Divider sx={{ my: 2, borderColor: isDarkMode ? '#444' : '#ccc' }} />

      {/* Logout Button */}
      <List>
        <ListItem button onClick={handleLogout}>
          <ExitToAppIcon />
          <ListItemText primary="Logout" sx={{ marginLeft: 2, color: isDarkMode ? '#fff' : '#000' }} />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;

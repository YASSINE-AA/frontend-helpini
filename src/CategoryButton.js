import React from 'react';
import { Button } from '@mui/material';

const CategoryButton = ({ category, onClick, icon }) => {
  return (
    <Button
      variant="contained"
      startIcon={icon}
      onClick={onClick}
      sx={{ textTransform: 'none', margin: '0 8px' }}
    >
      {category}
    </Button>
  );
};

export default CategoryButton;

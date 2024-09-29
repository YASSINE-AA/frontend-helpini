// src/ServiceCard.js
import React from 'react';
import { Card, CardContent, Typography, Button, CardMedia } from '@mui/material';

const ServiceCard = ({ service, onClick }) => {
  return (
    <Card

    >
      <CardMedia
        component="img"
        height="140"
        image={service.image}
        alt={service.title}
      />
      <CardContent>
        <Typography variant="h6">{service.title}</Typography>
        <Typography variant="body2">{service.description}</Typography>
        <Button onClick={() => onClick(service)}>Learn More</Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;

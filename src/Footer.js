import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: 'primary.dark', color: 'white' }}>
      <Container>
        <Grid container spacing={4}>
          {/* À propos de nous */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              À propos de nous
            </Typography>
            <Typography variant="body2">
              ijeni est votre plateforme de choix pour trouver les meilleurs professionnels à travers la Tunisie. Que vous ayez besoin de plomberie, de travaux électriques ou de services de nettoyage, nous vous mettons en relation avec les meilleurs experts locaux.
            </Typography>
          </Grid>

          {/* Liens rapides */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Liens rapides
            </Typography>
            <Link href="#" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>
              Accueil
            </Link>
            <Link href="#" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>
              Services
            </Link>
            <Link href="#" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>
              Contactez-nous
            </Link>
            <Link href="#" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>
              FAQ
            </Link>
          </Grid>

          {/* Suivez-nous */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Suivez-nous
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton color="inherit" href="#" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" href="#" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" href="#" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" href="#" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} ijeni. Tous droits réservés.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

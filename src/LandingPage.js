import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Button, Typography, Box, Paper, Avatar, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const LandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar toggleDarkMode={() => setIsDarkMode(!isDarkMode)} isDarkMode={isDarkMode} />
      {}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        textAlign: 'center',
        padding: '0 20px',
      }}>
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2, fontSize: { xs: '2.5rem', sm: '3.5rem' } }}>
          Votre plateforme unique pour les services à domicile
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, fontSize: { xs: '1.25rem', sm: '1.75rem' } }}>
          Connectez-vous avec des professionnels de confiance à travers la Tunisie.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
          }}
          onClick={() => navigate('/login')}
        >
          Commencer
        </Button>
      </Box>
      {}
      <Container sx={{ marginTop: 8, marginBottom: 8 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 6 }}>
          Pourquoi nous choisir
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', borderRadius: 2, display: 'flex', alignItems: 'center', flexDirection: 'column', height: '250px' }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, marginBottom: 2 }}>
                <DoneAllIcon />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Professionnels vérifiés
              </Typography>
              <Typography variant="body2">
                Nos prestataires de services passent par un processus de vérification rigoureux pour garantir la qualité et la fiabilité.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', borderRadius: 2, display: 'flex', alignItems: 'center', flexDirection: 'column', height: '250px' }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, marginBottom: 2 }}>
                <PriceCheckIcon />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Prix abordables
              </Typography>
              <Typography variant="body2">
                Nous offrons des prix compétitifs pour tous les services sans compromettre la qualité.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', borderRadius: 2, display: 'flex', alignItems: 'center', flexDirection: 'column', height: '250px' }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, marginBottom: 2 }}>
                <SupportAgentIcon />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Support 24/7
              </Typography>
              <Typography variant="body2">
                Notre équipe est disponible 24h/24 et 7j/7 pour vous aider avec tout problème ou préoccupation.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      {}
      <Box sx={{ backgroundColor: 'background.default', padding: 8 }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 6 }}>
            Ce que disent nos clients
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', borderRadius: 2, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2 }}>
                  "L'électricien que j'ai réservé via cette plateforme était professionnel et a résolu mon problème en un rien de temps. Je recommande vivement !"
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', textAlign: 'right' }}>
                  - Sarah K.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
                <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2 }}>
                  "J'avais besoin de services de plomberie urgents, et Helpini a été un sauveur. Super service et très abordable."
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', textAlign: 'right' }}>
                  - Ahmed B.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
                <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2 }}>
                  "Plateforme incroyable avec des professionnels fiables. Le processus de réservation était fluide et efficace."
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', textAlign: 'right' }}>
                  - Fatima T.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40vh',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("service.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        textAlign: 'center',
        padding: '0 20px',
        marginTop: 4,
        borderRadius: 2,
        boxShadow: 3,
      }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Prêt à réserver un service ?
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Rejoignez des milliers de clients satisfaits aujourd'hui !
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
          }}
          onClick={() => navigate('/login')}
        >
          Commencer
        </Button>
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

export default LandingPage;

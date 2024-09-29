import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Checkbox, Typography, Link, Box, Paper, ThemeProvider, createTheme } from '@mui/material';
import Navbar from './Navbar';

const RegisterPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div style={{ background: theme.palette.background.paper }}>
        <Navbar toggleDarkMode={() => setIsDarkMode(!isDarkMode)} isDarkMode={isDarkMode} />
        <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Paper elevation={3} sx={{ display: 'flex', width: '100%', overflow: 'hidden', borderRadius: 5 }}>
            <Grid container sx={{ flex: 1 }}>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: 4,
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Typography variant="h5" component="h1" gutterBottom>
                  Inscription
                </Typography>
                <TextField
                  label="Nom"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Mot de passe"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Confirmer le mot de passe"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                  <Checkbox color="primary" />
                  <Typography variant="body2">
                    J'accepte les <Link href="#">Conditions générales</Link>
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ marginTop: 3 }}
                >
                  S'inscrire
                </Button>
                <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
                  Vous avez déjà un compte ? <Link href="login">Connectez-vous</Link>
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  backgroundColor: theme.palette.background.default,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 4,
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <img
                    src="inscription.png"
                    alt="Inscription"
                    style={{ width: '70%', maxWidth: 300 }}
                  />
                  <Typography variant="h6" component="h2" sx={{ marginTop: 2 }}>
                    Rejoignez-nous aujourd'hui !
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                    Inscrivez-vous maintenant pour commencer à explorer nos services de premier ordre.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default RegisterPage;

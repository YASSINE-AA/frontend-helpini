import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Link,
  Box,
  Paper,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
      console.log('Connexion réussie:', response.data);
      sessionStorage.setItem('access_token', response.data.access_token);
      sessionStorage.setItem('user_role', response.data.role); 
      navigate('/dashboard');
    } catch (err) {
      console.error('Erreur de connexion:', err.response?.data || err.message);
      setError('Email ou mot de passe invalide.');
    }
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div style={{ background: theme.palette.background.paper }}>
        <Navbar toggleDarkMode={() => setIsDarkMode(!isDarkMode)} isDarkMode={isDarkMode} />
        <Container
          maxWidth="lg"
          sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
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
                  Connexion
                </Typography>
                {error && (
                  <Typography color="error" variant="body2" align="center" sx={{ marginBottom: 2 }}>
                    {error}
                  </Typography>
                )}
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Mot de passe"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ marginTop: 3 }}
                  onClick={handleLogin}
                >
                  Connexion
                </Button>
                <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
                  Vous n'avez pas de compte ? <Link href="register">Inscrivez-vous</Link>
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
                    src="produit.png"
                    alt="Progrès du projet"
                    style={{ width: '100%', maxWidth: 300 }}
                  />
                  <Typography variant="h6" component="h2" sx={{ marginTop: 2 }}>
                    Fournissez des services de premier ordre !
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt
                    consectetur, ipsum lorem.
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

export default LoginPage;

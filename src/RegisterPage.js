import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Checkbox, Typography, Link, Box, Paper, ThemeProvider, createTheme, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert } from '@mui/material';
import Navbar from './Navbar';
import axios from 'axios'; // Import axios for HTTP requests

const RegisterPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fname, setFname] = useState(''); // First name
  const [lname, setLname] = useState(''); // Last name
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); // Phone number
  const [gender, setGender] = useState(''); // Gender
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setToastMessage("Passwords do not match!");
      setToastSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const newUser = {
      fname,
      lname,
      email,
      phone,
      gender,
      password,
    };

    try {
      const response = await axios.post('http://localhost:3000/users/register', newUser);
      if (response.status === 201) {
        setToastMessage("User registered successfully!");
        setToastSeverity("success");
        setOpenSnackbar(true);
        // Reset form fields
        setFname('');
        setLname('');
        setEmail('');
        setPhone('');
        setGender('');
        setPassword('');
        setConfirmPassword('');
        setAcceptedTerms(false);
      }
    } catch (error) {
      setToastMessage("Registration failed: " + (error.response?.data || error.message));
      setToastSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

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
                  label="Prénom"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />
                <TextField
                  label="Nom"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Téléphone"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Genre</InputLabel>
                  <Select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    label="Genre"
                  >
                    <MenuItem value="male">Homme</MenuItem>
                    <MenuItem value="female">Femme</MenuItem>
                    <MenuItem value="other">Autre</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Mot de passe"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  label="Confirmer le mot de passe"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                  <Checkbox color="primary" checked={acceptedTerms} onChange={() => setAcceptedTerms(!acceptedTerms)} />
                  <Typography variant="body2">
                    J'accepte les <Link href="#">Conditions générales</Link>
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ marginTop: 3 }}
                  onClick={handleSubmit} // Call handleSubmit on button click
                  disabled={!acceptedTerms} // Disable if terms not accepted
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

        {/* Snackbar for success/error messages */}
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={toastSeverity} sx={{ width: '100%' }}>
            {toastMessage}
          </Alert>
        </Snackbar>
      </div>
    </ThemeProvider>
  );
};

export default RegisterPage;

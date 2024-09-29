import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Modal,
  Typography,
  Box,
  Button,
  Paper,
  ThemeProvider,
  createTheme,
  CssBaseline,
  TextField,
  Snackbar,
  Alert,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Rating,
} from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const categories = ['Plomberie', 'Nettoyage', 'Électrique', 'Menuiserie'];

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [reservationDetails, setReservationDetails] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    category: '',
    contact: '',
  });
  const [ratings, setRatings] = useState({}); // Store ratings for each post

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; // Adjust this value as needed
  const navigate = useNavigate();

  // Check session for token
  useEffect(() => {
    if (!window.sessionStorage.getItem('access_token')) {
      navigate('/login');
    }
  }, [navigate]);

  // Fetch posts and ratings
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/posts');
        const postsData = response.data;

        // Fetch ratings for each post
        const ratingsData = await Promise.all(
          postsData.map(async (post) => {
            const ratingResponse = await axios.get(`http://localhost:3000/posts/${post._id}/rating`);
            return { id: post._id, averageRating: ratingResponse.data };
          })
        );

        setPosts(postsData);
        const initialRatings = ratingsData.reduce((acc, rating) => {
          acc[rating.id] = rating.averageRating;
          return acc;
        }, {});
        setRatings(initialRatings);
      } catch (error) {
        console.error('Erreur lors de la récupération des posts:', error);
      }
    };
    fetchPosts();
  }, []);

  // Handle rating change
  const handleRatingChange = async (postId, newValue) => {
    try {
      await axios.put(`http://localhost:3000/posts/${postId}/rate`, { rating: newValue });
      setRatings({ ...ratings, [postId]: newValue });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du rating:', error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleClosePostModal = () => {
    setSelectedPost(null);
  };

  const handleReserveService = () => {
    setIsReserveModalOpen(true);
  };

  const handlePaymentSubmit = () => {
    console.log('Traitement du paiement pour:', reservationDetails);
    setIsPaymentSuccess(true);
    setOpenSnackbar(true);
    setReservationDetails({ name: '', email: '', cardNumber: '', expiryDate: '', cvv: '' });
    setIsReserveModalOpen(false);
  };

  const handleDeletePost = async (postId) => {
    const token = window.sessionStorage.getItem('access_token');
    try {
      const response = await axios.delete(`http://localhost:3000/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setPosts(posts.filter((post) => post._id !== postId));
        console.log('Post supprimé avec succès');
      } else {
        console.error('Échec de la suppression du post');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleNewServiceChange = (e) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };

  const handleAddServiceSubmit = async () => {
    const token = window.sessionStorage.getItem('access_token');
    try {
      const response = await axios.post('http://localhost:3000/posts', newService, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        setPosts([...posts, response.data]);
        setIsAddModalOpen(false);
        setNewService({ title: '', description: '', category: '', contact: '' });
        console.log('Nouveau service ajouté avec succès');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du service:', error);
    }
  };

  // Filter and sort posts
  const filteredPosts = posts
    .filter((post) => (selectedCategory ? post.category === selectedCategory : true))
    .filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const sortedPosts = filteredPosts.sort((a, b) => {
    if (sortOption === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOption === 'popularity') {
      return b.popularity - a.popularity;
    }
    return 0;
  });

  // Pagination Logic
  const totalPosts = sortedPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const currentPosts = sortedPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: isDarkMode ? 'dark' : 'light',
        },
      })}
    >
      <CssBaseline />
      <Navbar toggleDarkMode={() => setIsDarkMode(!isDarkMode)} isDarkMode={isDarkMode} />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Sidebar
          categories={categories}
          onCategoryClick={handleCategoryClick}
          selectedCategory={selectedCategory}
          onAddServiceClick={() => setIsAddModalOpen(true)}
          isDarkMode={isDarkMode}
        />
        <Box sx={{ flexGrow: 1, padding: 4 }}>
          <Container>

            {/* Search Bar and Sorting Options */}
            <Grid container spacing={2} sx={{ mb: 2, alignItems: 'center' }}>
              <Grid item xs={8}>
                <TextField
                  placeholder="Rechercher des posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ color: 'gray', mr: 1 }} />,
                    style: { padding: '10px 14px', height: '56px' },
                  }}
                  fullWidth
                  sx={{
                    borderRadius: '8px',
                    backgroundColor: isDarkMode ? '#333' : '#f1f1f1',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: isDarkMode ? '#555' : '#ccc',
                      },
                      '&:hover fieldset': {
                        borderColor: isDarkMode ? '#888' : '#888',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />
              </Grid>

              {/* Sorting Options */}
              <Grid item xs={4}>
                <FormControl fullWidth sx={{ height: '56px' }}>
                  <InputLabel>Tri par</InputLabel>
                  <Select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    sx={{ height: '56px' }}
                  >
                    <MenuItem value="default">Par défaut</MenuItem>
                    <MenuItem value="date">Date</MenuItem>
                    <MenuItem value="popularity">Popularité</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Typography variant="h4" sx={{ mb: 4 }}>
              Liste des services
            </Typography>

            <Grid container spacing={4}>
              {currentPosts.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post._id}>
                  <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {post.description.length > 80
                        ? `${post.description.substring(0, 80)}...`
                        : post.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Catégorie: {post.category}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Note moyenne: {ratings[post._id] !== undefined ? ratings[post._id].toFixed(1) : 'N/A'}
                    </Typography>
                    <Rating
                      name={`post-rating-${post._id}`}
                      value={ratings[post._id] || 0}
                      onChange={(event, newValue) => handleRatingChange(post._id, newValue)}
                      sx={{ marginTop: 2 }}
                    />
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                      <IconButton color="info" onClick={() => handlePostClick(post)}>
                        <InfoIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeletePost(post._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(e, value) => setCurrentPage(value)}
                color="primary"
              />
            </Box>
          </Container>
        </Box>
      </Box>

      <Modal open={!!selectedPost} onClose={handleClosePostModal}>
        <Box sx={{ backgroundColor: 'white', padding: 4, margin: '10% auto', maxWidth: 500 }}>
          <Typography variant="h6">{selectedPost?.title}</Typography>
          <Typography variant="body1" gutterBottom>
            {selectedPost?.description}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Contact: {selectedPost?.contact}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Note moyenne: {ratings[selectedPost?._id] !== undefined ? ratings[selectedPost._id].toFixed(1) : 'N/A'}
          </Typography>
          <Rating
            name={`post-rating-modal-${selectedPost?._id}`}
            value={ratings[selectedPost?._id] || 0}
            onChange={(event, newValue) => handleRatingChange(selectedPost?._id, newValue)}
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" onClick={handleReserveService}>
              Réserver
            </Button>
            <Button variant="contained" color="primary" onClick={handleClosePostModal}>
              Fermer
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={isReserveModalOpen} onClose={() => setIsReserveModalOpen(false)}>
        <Box sx={{ backgroundColor: 'white', padding: 4, margin: '10% auto', maxWidth: 500 }}>
          <Typography variant="h6">Réserver un service</Typography>
          <TextField
            label="Nom"
            fullWidth
            value={reservationDetails.name}
            onChange={(e) => setReservationDetails({ ...reservationDetails, name: e.target.value })}
            sx={{ my: 2 }}
          />
          <TextField
            label="Email"
            fullWidth
            value={reservationDetails.email}
            onChange={(e) =>
              setReservationDetails({ ...reservationDetails, email: e.target.value })
            }
            sx={{ my: 2 }}
          />
          <TextField
            label="Numéro de carte"
            fullWidth
            value={reservationDetails.cardNumber}
            onChange={(e) =>
              setReservationDetails({ ...reservationDetails, cardNumber: e.target.value })
            }
            sx={{ my: 2 }}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Date d'expiration"
              value={reservationDetails.expiryDate}
              onChange={(e) =>
                setReservationDetails({ ...reservationDetails, expiryDate: e.target.value })
              }
              sx={{ flex: 1 }}
            />
            <TextField
              label="CVV"
              value={reservationDetails.cvv}
              onChange={(e) => setReservationDetails({ ...reservationDetails, cvv: e.target.value })}
              sx={{ flex: 1 }}
            />
          </Box>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handlePaymentSubmit}>
              Payer
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <Box sx={{ backgroundColor: 'white', padding: 4, margin: '10% auto', maxWidth: 500 }}>
          <Typography variant="h6">Ajouter un service</Typography>
          <TextField
            label="Titre"
            fullWidth
            name="title"
            value={newService.title}
            onChange={handleNewServiceChange}
            sx={{ my: 2 }}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            name="description"
            value={newService.description}
            onChange={handleNewServiceChange}
            sx={{ my: 2 }}
          />
          <TextField
            label="Contact"
            fullWidth
            name="contact"
            value={newService.contact}
            onChange={handleNewServiceChange}
            sx={{ my: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Catégorie</InputLabel>
            <Select
              name="category"
              value={newService.category}
              onChange={handleNewServiceChange}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleAddServiceSubmit}>
              Ajouter
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Paiement effectué avec succès !
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default Dashboard;

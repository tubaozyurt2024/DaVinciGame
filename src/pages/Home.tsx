import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box, Stack } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box textAlign="center">
        <Typography variant="h2" component="h1" gutterBottom>
          Home Page
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Welcome to the app!
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" component={Link} to="/users">
            Users
          </Button>
          <Button variant="contained" color="secondary" component={Link} to="/posts">
            Posts
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Home;

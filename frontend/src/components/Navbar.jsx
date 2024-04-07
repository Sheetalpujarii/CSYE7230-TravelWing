import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, useTheme, ThemeProvider, createTheme, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useUserAuth } from '../context/UserAuthContext'; // Adjust the path as necessary

const Navbar = () => {
  const { user, logOut } = useUserAuth();

  const [darkMode, setDarkMode] = useState(false);
  const staticLinks = [
    { path: "/", name: "TravelWing" },
    { path: "/about", name: "About" },
    { path: "/itinerary", name: "Itinerary" },
    { path: "/login", name: "Login" },
    { path: "/signup", name: "Signup" },
    // { path: "/saved", name: "Saved" }

  ];

  const dynamlcLinks = [
    { path: "/", name: "TravelWing" },
    { path: "/about", name: "About" },
    { path: "/itinerary", name: "Itinerary" },
    // { path: "/login", name: "Login" },
    // { path: "/signup", name: "Signup" },
    { path: "/saved", name: "Saved" }

  ];

  const location = useLocation();
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleLogout = async () => {
    try {
      await logOut();
      console.log("Logged out successfully");
      // redirect to the home page
      navigate("/about");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          {!user && staticLinks.map((link) => (
            <Button key={link.path} color="inherit" component={Link} to={link.path} sx={{ margin: '0 10px' }}>
              <Typography variant="button" style={{ color: location.pathname === link.path ? theme.palette.secondary.main : 'inherit' }}>
                {link.name}
              </Typography>
            </Button>
          ))}

        {user && dynamlcLinks.map((link) => (
            <Button key={link.path} color="inherit" component={Link} to={link.path} sx={{ margin: '0 10px' }}>
              <Typography variant="button" style={{ color: location.pathname === link.path ? theme.palette.secondary.main : 'inherit' }}>
                {link.name}
              </Typography>
            </Button>
          ))}

{user && (
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              )}
          <Box flexGrow={1} />
          <IconButton onClick={toggleDarkMode} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
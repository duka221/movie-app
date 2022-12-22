import React from "react";
import { Box } from "@mui/material";
import { DrawerHeader } from "./Funcs/StyledItems";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Drawer } from "./Funcs/StyledItems";
import { AppBar } from "./Funcs/StyledItems";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import HomeIcon from "@mui/icons-material/Home";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
export const Header = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const Items = [
    {
      label: "Home",
      path: "/",
      icon: <HomeIcon />,
    },
    {
      label: "Favorites",
      path: "/favorites",
      icon: <FavoriteIcon />,
    },
    {
      label: "Liked",
      path: "/liked",
      icon: <ThumbUpIcon />,
    },
    {
      label: "Watchlist",
      path: "/watchlist",
      icon: <VisibilityIcon />,
    },
  ];
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#121212" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{color:"#E2B616"}}>
            Movies
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: "#121212",
            color: "grey",
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {Items.map((text, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{
                display: "block",
                background:
                  window.location.pathname === text.path ? "#E2B616" : "transparent",
              }}
            >
              <ListItemButton
                  onClick={() => navigate(text.path)}

                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color:"white"
                  }}
                >
                  {text.icon}
                </ListItemIcon>
                <ListItemText
                  primary={text.label}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor:"black", minHeight:'100vh' }}>
        <DrawerHeader />
        <ThemeProvider theme={darkTheme}>
        {children}
        </ThemeProvider>
      </Box>
    </Box>
  );
};

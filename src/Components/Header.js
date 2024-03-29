// IMPORTING APIS
import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
  Button,
  useScrollTrigger,
  Slide,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@material-ui/core";

import { useTheme, makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

// IMPORTING ICONS
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";
import SettingsIcon from "@material-ui/icons/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import EventIcon from "@mui/icons-material/Event";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  hover: {
    "&:hover": {
      color: "white",
    },
  },
}));

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction={"down"} in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = (props) => {
  const history = useHistory();

  const classes = useStyles();
  const [anchor, setAnchor] = React.useState(null);
  const open = Boolean(anchor);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  function Deconectare() {
    setAnchor(null);
    window.localStorage.clear();
  }

  const handleMenu = (event) => {
    setAnchor(event.currentTarget);
  };
  const themecolor = createTheme({
    typography: {
      h1: {
        fontSize: "3rem",
      },
    },

    palette: {
      primary: {
        main: "#2C5E1A",
      },
      secondary: {
        main: "#2C5E1A",
      },
    },
  });
  return (
    <div className={classes.root}>
      <ThemeProvider theme={themecolor}>
        <HideOnScroll {...props}>
          <AppBar>
            <Toolbar>
              <Typography
                variant="h5"
                component="p"
                color="white"
                className={classes.title}
              >
                Dream Events
              </Typography>
              {isMobile ? (
                <>
                  <IconButton
                    className={classes.menuButton}
                    edge="start"
                    aria-label="menu"
                    onClick={handleMenu}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchor}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    KeepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={open}
                  >
                    <MenuItem
                      onClick={() => setAnchor(null)}
                      component={Link}
                      to="/homepage"
                    >
                      <ListItemIcon>
                        <HomeIcon />
                      </ListItemIcon>
                      <Typography variant="h6">Pagina principală</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setAnchor(null);
                        history.push("/registerevent");
                        history.go(0);
                      }}
                      component={Link}
                    >
                      <ListItemIcon>
                        <AddIcon />
                      </ListItemIcon>
                      <Typography variant="h6"> Eveniment nou </Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setAnchor(null);
                        history.push("/myeventpage");
                        history.go(0);
                      }}
                      component={Link}
                    >
                      <ListItemIcon>
                        <EventIcon />
                      </ListItemIcon>
                      <Typography variant="h6">Evenimentele mele</Typography>
                    </MenuItem>

                    <MenuItem
                      onClick={() => setAnchor(null)}
                      component={Link}
                      to="/settingspage"
                    >
                      <ListItemIcon>
                        <SettingsIcon />
                      </ListItemIcon>
                      <Typography variant="h6"> Setări</Typography>
                    </MenuItem>

                    <MenuItem
                      onClick={() => Deconectare()}
                      component={Link}
                      to="/sign-in"
                    >
                      <ListItemIcon>
                        <LogoutIcon />
                      </ListItemIcon>
                      <Typography variant="h6">Deconectare</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <div style={{ marginRight: "2rem" }}>
                  <Button
                    variant="text"
                    component={Link}
                    to="/homepage"
                    style={{ color: "white" }}
                  >
                    <HomeIcon />
                    Pagina principală
                  </Button>
                  <Button
                    variant="text"
                    component={Link}
                    onClick={() => {
                      setAnchor(null);
                      history.push("/registerevent");
                      history.go(0);
                    }}
                    style={{ color: "white" }}
                  >
                    <AddIcon />
                    Eveniment nou
                  </Button>
                  <Button
                    variant="text"
                    component={Link}
                    onClick={() => {
                      history.push("/myeventpage");
                      history.go(0);
                    }}
                    style={{ color: "white" }}
                  >
                    <EventIcon />
                    Evenimentele mele
                  </Button>

                  <Button
                    variant="text"
                    component={Link}
                    to="/settingspage"
                    style={{ color: "white" }}
                  >
                    <SettingsIcon />
                    Setări
                  </Button>

                  <Button
                    variant="text"
                    component={Link}
                    to="/sign-in"
                    style={{ color: "white" }}
                    onClick={() => window.localStorage.clear()}
                  >
                    <LogoutIcon />
                    Deconectare
                  </Button>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </HideOnScroll>
      </ThemeProvider>
    </div>
  );
};

export default Header;

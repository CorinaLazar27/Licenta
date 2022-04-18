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
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Paper, Container } from "@material-ui/core";
import { green, orange } from "@material-ui/core/colors";

// IMPORTING ICONS
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import EventIcon from "@mui/icons-material/Event";
import { useHistory } from "react-router-dom";
// LOCAL-STYLING

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.error.light,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
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

const FirstHeader = (props) => {
  const history = useHistory();

  const classes = useStyles();
  const [anchor, setAnchor] = React.useState(null);

  const theme = useTheme();

  const themecolor = createMuiTheme({
    typography: {
      h1: {
        fontSize: "3rem",
      },
    },
    palette: {
      type: "dark",
      primary: {
        main: "#9575cd",
      },
      secondary: {
        main: orange[400],
      },
    },
  });
  return (
    <ThemeProvider theme={themecolor}>
      <AppBar>
        <Toolbar>
          <Typography
            variant="h5"
            component="p"
            color="textSecondary"
            className={classes.title}
          >
            EP
          </Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default FirstHeader;

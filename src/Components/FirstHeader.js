// IMPORTING APIS
import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { ThemeProvider, createTheme } from "@material-ui/core/styles";

import { orange } from "@material-ui/core/colors";

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

const FirstHeader = (props) => {
  const classes = useStyles();

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
            color="black"
            className={classes.title}
          >
            Dream Events
          </Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default FirstHeader;

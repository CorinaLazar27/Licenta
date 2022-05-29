import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { Container, Box, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@material-ui/icons/Add";
import EventIcon from "@mui/icons-material/Event";
import background from "../Image/homePage.png";

function HomePage() {
  const history = useHistory();
  const email = window.localStorage.getItem("email");
  const nume = window.localStorage.getItem("nume");

  const [data, setData] = useState("");
  function GetElements(event) {
    axios({
      method: "GET",
      url: "https://server-licenta.azurewebsites.net/elements",
    })
      .then((response) => {
        //console.log(response.data.results);
        setData(response.data.results);
        console.log(response);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });

    event.preventDefault();
  }

  window.onload = GetElements;
  const breakpoints = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  };
  const getSize = (width) => {
    if (width < breakpoints.sm) {
      return "18px";
    } else if (width < breakpoints.md) {
      return "20px";
    } else if (width < breakpoints.lg) {
      return "35px";
    } else if (width < breakpoints.xl) {
      return "35px";
    } else return "35px";
  };
  const [size, setSize] = useState(getSize(window.innerWidth));
  const updateDimensions = () => {
    setSize(getSize(window.innerWidth));
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundImage: `url("${background}")`,

        // backgroundSize: "cover",
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header />
      {/* <Footer /> */}
      <Box
        sx={{
          background: "rgb(255, 255, 255,1)",
          boxShadow: "2px 4px 6px rgba(0, 0, 0, 1)",
          padding: "4rem",
          textAlign: "center",
        }}
      >
        <Grid container rowSpacing={"3vh"}>
          <Grid item xs={12}>
            <Typography style={{ fontSize: size }}>Salut, {nume}!</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              style={{
                color: "white",
                backgroundColor: "#2C5E1A",
                borderColor: "white",
              }}
              startIcon={<AddIcon />}
              sx={{ fontSize: size - 15 }}
              variant="outlined"
              onClick={() => {
                history.push("/registerevent");
                history.go(0);
              }}
            >
              Creează
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              style={{
                color: "white",
                backgroundColor: "#2C5E1A",
                borderColor: "white",
              }}
              startIcon={<EventIcon />}
              variant="outlined"
              sx={{ fontSize: size - 15 }}
              onClick={() => {
                history.push("/myeventpage");
                history.go(0);
              }}
            >
              Vezi evenimente
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
export default HomePage;

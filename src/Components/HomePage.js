import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { Container, Box, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@material-ui/icons/Add";
import EventIcon from "@mui/icons-material/Event";
import login9 from "../Image/login9.jpg";
function HomePage() {
  const history = useHistory();
  const email = window.localStorage.getItem("email");
  const nume = window.localStorage.getItem("nume");

  var note = document.getElementById("note");

  const [data, setData] = useState("");
  function GetElements(event) {
    axios({
      method: "GET",
      url: "/elements",
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

  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: "#f3e5f5",
        backgroundImage: `url("${login9}")`,
        backgroundSize: "cover",
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header />
      <Footer />
      <Box
        sx={{
          background: "rgb(255, 255, 255)",
          boxShadow: "2px 4px 6px rgba(0, 0, 0, 1)",
          padding: "4rem",
          textAlign: "center",
        }}
      >
        <Grid container rowSpacing={"3vh"}>
          <Grid item xs={12}>
            <Typography variant="h4">Salut, {nume}!</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              startIcon={<AddIcon />}
              variant="outlined"
              onClick={() => history.push("/registerevent")}
            >
              Creează
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              startIcon={<EventIcon />}
              variant="outlined"
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

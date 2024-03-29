import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { useHistory } from "react-router-dom";

import "react-dropdown/style.css";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import Header from "./Header";
import { Grid, Typography, Button, Box } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import OverlayLoader from "./OverlayLoader";

import Rating from "@mui/material/Rating";
function OpiniiPage() {
  const history = useHistory();
  const [data, setData] = useState([{}]);
  const [loader, setLoader] = useState(true);

  async function GetOpinii() {
    await axios({
      method: "POST",
      url: "https://server-licenta.azurewebsites.net/getOpinii",
      data: {
        judet: window.localStorage.getItem("judet"),
      },
    })
      .then((response) => {
        setData(response.data.results);
        console.log(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      })
      .finally(() => setLoader(false));
  }
  useEffect(() => {
    GetOpinii();
  }, []);

  const breakpoints = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  };
  const getColumns = (width) => {
    if (width < breakpoints.sm) {
      return 12;
    } else if (width < breakpoints.md) {
      return 12;
    } else if (width < breakpoints.lg) {
      return 6;
    } else if (width < breakpoints.xl) {
      return 6;
    } else {
      return 6;
    }
  };
  const [columns, setColumns] = useState(getColumns(window.innerWidth));

  const updateDimensions = () => {
    setColumns(getColumns(window.innerWidth));
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  return (
    <div className="Container">
      <Header />

      {loader && <OverlayLoader />}
      {!loader && (
        <Box
          sx={{
            background: "rgb(255, 255, 255,1)",
            boxShadow: "2px 4px 6px rgba(0, 0, 0, 1)",
            padding: "4rem",
            textAlign: "center",
            minHeight: "70vh",
            marginTop: 10,
            marginBottom: "5vh",
            maxWidth: "95vw",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <Button
              style={{
                color: "white",
                backgroundColor: "#2C5E1A",
                marginBottom: "1vh",
              }}
              startIcon={<ArrowBackIcon />}
              variant="contained"
              onClick={() => {
                history.push("/recommandpage");
                history.go(0);
              }}
            >
              Înapoi
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "75vw",
            }}
          >
            <List sx={{ bgcolor: "background.paper" }}>
              {(data.length == 0 || data.length == 1) && (
                <>
                  <Typography>
                    Nu există recenzii în județul dumneavoastră!
                  </Typography>
                </>
              )}

              {data.map((opinie, index) => {
                if (index != 0)
                  return (
                    <>
                      <ListItem
                        alignItems="flex-start"
                        sx={{ minWidth: "90vw" }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            alt={opinie.Nume}
                            src="/static/images/avatar/1.jpg"
                          />
                        </ListItemAvatar>
                        <ListItemText
                          key={index}
                          primary={
                            opinie.Nume +
                            ", " +
                            opinie.TipEveniment +
                            " " +
                            opinie.RowKey
                          }
                          secondary={
                            <Grid container>
                              <Grid
                                item
                                xs={6}
                                sx={{
                                  marginTop: "1vh",
                                }}
                              >
                                <Typography variant="h6">
                                  {opinie.Restaurant}
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={columns}
                                sx={{
                                  marginTop: "1vh",
                                }}
                              >
                                <Rating
                                  value={opinie.RatingRestaurant}
                                  readOnly
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <Typography variant="subtitle">
                                  {opinie.OpiniiRestaurant}
                                </Typography>
                              </Grid>

                              <Grid
                                item
                                xs={columns}
                                sx={{
                                  marginTop: "1vh",
                                }}
                              >
                                <Typography variant="h6">
                                  Fotograful {opinie.Fotograf}
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={columns}
                                sx={{
                                  marginTop: "1vh",
                                }}
                              >
                                <Rating
                                  value={opinie.RatingFotograf}
                                  readOnly
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <Typography variant="subtitle">
                                  {opinie.OpiniiFotograf}
                                </Typography>
                              </Grid>

                              <Grid
                                item
                                xs={columns}
                                sx={{
                                  marginTop: "1vh",
                                }}
                              >
                                <Typography variant="h6">
                                  Muzică: {opinie.Muzica}
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={columns}
                                sx={{
                                  marginTop: "1vh",
                                }}
                              >
                                <Rating value={opinie.RatingMuzica} readOnly />
                              </Grid>
                              <Grid item xs={12}>
                                <Typography variant="subtitle">
                                  {opinie.OpiniiMuzica}
                                </Typography>
                              </Grid>
                            </Grid>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </>
                  );
              })}
            </List>
          </Grid>
        </Box>
      )}
    </div>
  );
}
export default OpiniiPage;

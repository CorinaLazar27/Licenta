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
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Tab } from "material-ui";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import OverlayLoader from "./OverlayLoader";
import background from "../Image/homePage.png";
import Rating from "@mui/material/Rating";
function OpiniiPage() {
  const history = useHistory();
  const [data, setData] = useState([{}]);
  const [loader, setLoader] = useState(true);

  async function GetOpinii() {
    await axios({
      method: "POST",
      url: "/getOpinii",
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
          }}
        >
          <List sx={{ maxWidth: "80vw", bgcolor: "background.paper" }}>
            {data.map((opinie, index) => {
              if (index != 0)
                return (
                  <>
                    <ListItem alignItems="flex-start">
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
                              xs={6}
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
                              xs={6}
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
                              xs={6}
                              sx={{
                                marginTop: "1vh",
                              }}
                            >
                              <Rating value={opinie.RatingFotograf} readOnly />
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="subtitle">
                                {opinie.OpiniiFotograf}
                              </Typography>
                            </Grid>

                            <Grid
                              item
                              xs={6}
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
                              xs={6}
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
        </Box>
      )}
    </div>
  );
}
export default OpiniiPage;

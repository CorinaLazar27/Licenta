import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Image/logo.png";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Dropdown from "react-dropdown";

import "react-dropdown/style.css";
import axios from "axios";

import Header from "./Header";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import OverlayLoader from "./OverlayLoader";
import background from "../Image/homePage.png";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function RecommendPage() {
  const history = useHistory();
  const [recommandOption, setRecommandOption] = useState("");
  const [locationsRecomanded, setLocationsRecomanded] = useState([]);
  const [noRecomandations, setNoRecomandations] = useState(false);

  const handleChange = (event) => {
    setRecommandOption(event.target.value);
  };
  const email = window.localStorage.getItem("email");
  const event = window.localStorage.getItem("eveniment");
  const date = window.localStorage.getItem("dataeveniment");
  const judet = window.localStorage.getItem("judet");
  const [loader, setLoader] = useState(false);
  function GetRecommandations(type) {
    setLoader(true);
    setNoRecomandations(false);
    axios({
      method: "POST",
      url: "/getRecomandations",
      data: {
        email: email,
        event: event,
        judet: judet,
        date: date,
        type: type,
      },
    })
      .then((response) => {
        setLoader(false);
        console.log(response.data);

        if (Object.values(response.data).length != 0)
          setLocationsRecomanded(Object.values(response.data));
        else {
          setNoRecomandations(true);
          console.log("NU SUNT LOCATII");
          setLocationsRecomanded([]);
        }
        // if (
        //   response.data[0] === "" &&
        //   response.data[1] === "" &&
        //   response.data[2] === ""
        // )
        //   setNoRecomandations(true);
        // if (
        //   locationsRecomanded[0] === "" &&
        //   locationsRecomanded[1] === "" &&
        //   locationsRecomanded[2] === ""
        // )
        //   setNoRecomandations(true);
        console.log("locationRecomanded", locationsRecomanded);
      })
      .catch((error) => {
        if (error.response) {
          setLoader(false);
          setNoRecomandations(true);
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  return (
    <div className="Container">
      {loader && <OverlayLoader />}
      <Header />
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "1vh",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "left",
            marginLeft: "9vw",
            marginBottom: "2vh",
          }}
        >
          <Button
            sx={{
              fontSize: "1vw",
              backgroundColor: "purple",
            }}
            startIcon={<ArrowBackIcon />}
            variant="contained"
            onClick={() => {
              history.push("/myeventpage");
              history.go(0);
            }}
          >
            Înapoi
          </Button>
        </Grid>
        <Box
          sx={{
            background: "rgb(255, 255, 255,1)",
            boxShadow: "2px 4px 6px rgba(0, 0, 0, 1)",
            padding: "4rem",
            textAlign: "center",
            minHeight: "60vh",
            minWidth: "80vw",
          }}
        >
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Vezi recomandări despre..
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={recommandOption}
                label="Vezi recomandări despre"
                onChange={handleChange}
              >
                <MenuItem value={"Restaurant"}>Restaurante</MenuItem>
                <MenuItem value={"Muzica"}>Muzică</MenuItem>
                <MenuItem value={"Fotograf"}>Fotografi</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "1vh" }}>
            <Button
              variant="outline"
              onClick={() => {
                GetRecommandations(recommandOption);
              }}
            >
              Vezi
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              marginTop: "3vh",
            }}
          >
            {noRecomandations && (
              <h6>Nu există recomandări pentru evenimentul dumneavoastră..</h6>
            )}
            {locationsRecomanded.map((location) => {
              if (location !== "")
                return (
                  <Card
                    style={{
                      backgroundColor: "#F5F4F2",
                      color: "black",
                      minHeight: "10vh",
                      minWidth: "10vw",
                      marginRight: "2vw",
                    }}
                  >
                    <CardContent>
                      <Typography
                        sx={{
                          color: "black",
                        }}
                      >
                        {location}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        județul {judet}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {/* <LoadingButton
                        loading={loading}
                        onClick={() => {
                          window.localStorage.setItem("locatie", location);
                          UpdateForm();
                        }}
                        style={{
                          color: "white",
                          backgroundColor: "purple",
                          height: "5vh",
                          width: "5vw",
                        }}
                      >
                        Alege
                      </LoadingButton> */}
                    </CardActions>
                  </Card>
                );
            })}
          </Grid>
        </Box>
      </Grid>
    </div>
  );
}
export default RecommendPage;

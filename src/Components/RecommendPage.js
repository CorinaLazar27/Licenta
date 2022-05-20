import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Dropdown from "react-dropdown";
import SearchIcon from "@mui/icons-material/Search";
import "react-dropdown/style.css";
import axios from "axios";

import Header from "./Header";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
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
  const [loading, setLoading] = useState(false);

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
  const [openSuccesLocation, setOpenSuccesLocation] = useState(false);
  const [openErrorLocation, setOpenErrorLocation] = useState(false);
  function UpdateForm() {
    setLoading(true);
    axios({
      method: "POST",
      url: "/updateform",
      data: {
        email: email,
        event: event,
        date: window.localStorage.getItem("dataeveniment"),
        nrguests: window.localStorage.getItem("invitati"),
        location: window.localStorage.getItem("locatie"),
        judet: window.localStorage.getItem("judet"),
        budget: window.localStorage.getItem("buget"),
        liveband: window.localStorage.getItem("liveband"),
        photographer: window.localStorage.getItem("fotograf"),
        opinie: window.localStorage.getItem("opinie"),
      },
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setOpenSuccesLocation(true);
        setTimeout(() => {
          history.push("/myeventpage");
          history.go(0);
        }, 2000);
        if (res == "Done") {
          console.log("dONE");
        }
      })
      .catch((error) => {
        if (error.response) {
          // setOpenErrorLocation(true);
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      })
      .finally(() => setLoading(false));
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccesLocation(false);
    setOpenErrorLocation(false);
  };
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
            style={{
              color: "white",
              backgroundColor: "#9575cd",
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
              style={{
                color: "white",
                backgroundColor: "#9575cd",
              }}
              variant="contained"
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
              minHeight: "30vh",
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
                      marginTop: "1vh",
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
                      <Button
                        startIcon={<SearchIcon />}
                        style={{
                          color: "white",
                          backgroundColor: "#9575cd",
                          height: "6vh",
                          width: "6vw",
                        }}
                        onClick={() => {
                          if (recommandOption === "Restaurant") {
                            const google = "https://www.google.com/search?q=";
                            const url =
                              google +
                              location +
                              " judetul " +
                              judet +
                              " contact";
                            const win = window.open(url, "_blank");
                            win.focus();
                          } else if (recommandOption === "Muzica") {
                            const google = "https://www.google.com/search?q=";
                            const url = google + location + " contact";
                            const win = window.open(url, "_blank");
                            win.focus();
                          } else if (recommandOption === "Fotograf") {
                            const google = "https://www.google.com/search?q=";
                            const url =
                              google + "Fotograf " + location + " contact";
                            const win = window.open(url, "_blank");
                            win.focus();
                          }
                        }}
                      >
                        Vezi detalii
                      </Button>
                      <LoadingButton
                        loading={loading}
                        onClick={() => {
                          if (recommandOption === "Restaurant")
                            window.localStorage.setItem("locatie", location);
                          else if (recommandOption === "Muzica")
                            window.localStorage.setItem("liveband", location);
                          else if (recommandOption === "Fotograf")
                            window.localStorage.setItem("fotograf", location);
                          UpdateForm();
                        }}
                        style={{
                          color: "white",
                          backgroundColor: "#9575cd",
                          height: "6vh",
                          width: "6vw",
                        }}
                      >
                        Alege
                      </LoadingButton>
                    </CardActions>
                  </Card>
                );
            })}
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              float: "right",
              marginBottom: 0,
              marginTop: "1vh",
            }}
          >
            <Button
              style={{
                color: "white",
                backgroundColor: "#9575cd",
              }}
              startIcon={<ThumbsUpDownIcon />}
              variant="contained"
              onClick={() => {
                history.push("/opiniipage");
                history.go(0);
              }}
            >
              Vezi opinii utilizatori
            </Button>
          </Grid>
        </Box>
      </Grid>
    </div>
  );
}
export default RecommendPage;

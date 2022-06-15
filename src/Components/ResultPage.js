import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import OverlayLoader from "./OverlayLoader";
import axios from "axios";
import { Grid, Input, InputLabel, Typography, Button } from "@mui/material";

import Paper from "@material-ui/core/Paper";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
} from "@devexpress/dx-react-chart-material-ui";
import { Box } from "@mui/system";

function ResultPage() {
  const history = useHistory();
  const email = window.localStorage.getItem("email");
  const date = window.localStorage.getItem("dataeveniment");
  const event = window.localStorage.getItem("eveniment");
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [load, setLoad] = useState(true);

  const dataAperitive = [
    { argument: "Traditional", value: data.Rating_aperitiv_traditional },
    { argument: "Vegetarian", value: data.Rating_aperitiv_vegetarian },
    { argument: "Fructe de mare", value: data.Rating_aperitiv_fructe_de_mare },
  ];

  const dataType2 = [
    { argument: "Carne pui", value: data.Rating_tip2_carne_pui },
    { argument: "Carne porc", value: data.Rating_tip2_carne_porc },
    { argument: "Carne vita", value: data.Rating_tip2_carne_vita },
    { argument: "Sarmale", value: data.Rating_tip2_sarmale },
  ];

  const dataType1 = [
    { argument: "Ciorba acra", value: data.Rating_tip1_ciorba_acra },
    { argument: "Ciorba cartofi", value: data.Rating_tip1_ciorba_cartofi },
    { argument: "Ciorba perisoare", value: data.Rating_tip1_ciorba_perisoare },
    { argument: "Supa taietei", value: data.Rating_tip1_supa_taietei },
  ];

  const dataMusic = [
    { argument: "Comerciala", value: data.Rating_muzica_comerciala },
    { argument: "Disco", value: data.Rating_muzica_disco },
    { argument: "De petrecere", value: data.Rating_muzica_petrecere },
    { argument: "Pop", value: data.Rating_muzica_pop },
    { argument: "Rock", value: data.Rating_muzica_rock },
  ];
  window.onload = function exampleFunction() {
    GetMyResults();
  };
  function GetMyResults() {
    axios({
      method: "POST",
      url: "https://server-licenta.azurewebsites.net/highestRating",
      data: {
        email: email,
        event: event,
        date: date,
      },
    })
      .then((response) => {
        setLoader(false);
        setLoad(false);
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setLoader(false);
          setLoad(false);
          setError(true);
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

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
      <Grid
        container
        sx={{
          marginTop: "10vh",
          marginBottom: "5vh",
          maxWidth: "85vw",
          display: "flex",
          minHeigth: "100vh",
          justifyContent: "center",
          alignSelf: "center",
          backgroundColor: "white",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "left",
            marginBottom: "5vh",
            margin: "1vh",
          }}
        >
          {!load && (
            <Button
              style={{
                color: "white",
                backgroundColor: "#2C5E1A",
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
          )}
        </Grid>
        <Grid item xs={12}>
          {!load && (
            <Box
              sx={{
                borderRadius: "4px",
                textAlign: "center",

                background: "white",
              }}
            >
              {!load && (
                <Grid
                  container
                  spacing={5}
                  sx={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  {error && !load && (
                    <Grid
                      item
                      xs={12}
                      sx={{
                        minHeight: "35vh",
                      }}
                    >
                      <Typography style={{ fontSize: "2vh" }}>
                        {" "}
                        Încă nu sunt răspunsuri la chestionar!
                      </Typography>
                    </Grid>
                  )}
                  {!error && !load && (
                    <Grid item xs={12}>
                      <InputLabel>Număr răspunsuri chestionar</InputLabel>
                      <Input
                        style={{ textAlign: "right" }}
                        textAlign="center"
                        value={data.Answers}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  )}
                  {!error && !load && (
                    <Grid item xs={columns}>
                      <InputLabel>Cel mai votat aperitiv</InputLabel>
                      <Input
                        value={data.Highest_Rate_Aperitiv}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  )}
                  {!error && !load && (
                    <Grid item xs={columns}>
                      <InputLabel>Cel mai votat fel 1</InputLabel>
                      <Input
                        value={data.Highest_Rate_Type1}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  )}
                  {!error && !load && (
                    <Grid item xs={columns}>
                      <InputLabel>Cel mai votat fel 2</InputLabel>
                      <Input
                        label="Cel mai votat fel 2"
                        value={data.Highest_Rate_Type2}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  )}
                  {!error && !load && (
                    <Grid item xs={columns}>
                      <InputLabel>Cel mai votat tip de muzica</InputLabel>
                      <Input
                        value={data.Highest_Rate_Music}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  )}
                  {!error && !load && (
                    <Grid
                      item
                      xs={columns - 1}
                      sx={{
                        margin: "1vh",
                      }}
                    >
                      <label>Rating aperitive</label>
                      <Paper
                        sx={{
                          marginLeft: "1vh",
                        }}
                      >
                        <Chart
                          data={dataAperitive}
                          sx={{ backgroundColor: "#e9e9e9" }}
                        >
                          <ArgumentAxis />
                          <ValueAxis max={3} />

                          <BarSeries
                            //barWidth={0.2}
                            valueField="value"
                            argumentField="argument"
                            color="purple"
                          />
                        </Chart>
                      </Paper>
                    </Grid>
                  )}
                  {!error && !load && (
                    <Grid
                      item
                      xs={columns - 1}
                      sx={{
                        margin: "1vh",
                      }}
                    >
                      <label>Rating fel 1</label>
                      <Paper>
                        <Chart
                          data={dataType1}
                          sx={{ backgroundColor: "#e9e9e9" }}
                        >
                          <ArgumentAxis />
                          <ValueAxis max={5} />

                          <BarSeries
                            valueField="value"
                            argumentField="argument"
                            color="green"
                          />
                        </Chart>
                      </Paper>
                    </Grid>
                  )}
                  {!error && !load && (
                    <Grid
                      item
                      xs={columns - 1}
                      sx={{
                        margin: "1vh",
                      }}
                    >
                      <label>Rating fel 2</label>
                      <Paper>
                        <Chart
                          data={dataType2}
                          sx={{ backgroundColor: "#e9e9e9" }}
                        >
                          <ArgumentAxis />
                          <ValueAxis max={5} />

                          <BarSeries
                            valueField="value"
                            argumentField="argument"
                          />
                        </Chart>
                      </Paper>
                    </Grid>
                  )}
                  {!error && !load && (
                    <Grid
                      item
                      xs={columns - 1}
                      sx={{
                        margin: "1vh",
                      }}
                    >
                      <label>Rating muzica</label>
                      <Paper>
                        <Chart
                          data={dataMusic}
                          sx={{ backgroundColor: "#e9e9e9" }}
                        >
                          <ArgumentAxis />
                          <ValueAxis max={5} />

                          <BarSeries
                            valueField="value"
                            argumentField="argument"
                            color="pink"
                          />
                        </Chart>
                      </Paper>
                    </Grid>
                  )}
                </Grid>
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
export default ResultPage;

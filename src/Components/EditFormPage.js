import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { useHistory } from "react-router-dom";

import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Header from "./Header";

import { Box, Button, Grid } from "@mui/material";
import OverlayLoader from "./OverlayLoader";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function EditFormPage() {
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const event = window.localStorage.getItem("eveniment");
  const email = window.localStorage.getItem("email");
  const location = window.localStorage.getItem("locatie");
  const judet = window.localStorage.getItem("judet");
  const date = window.localStorage.getItem("dataeveniment");

  const photographer = window.localStorage.getItem("fotograf");

  const budget = window.localStorage.getItem("buget");
  const guests = window.localStorage.getItem("invitati");
  const liveband = window.localStorage.getItem("liveband");

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [openError, setOpenError] = useState(false);
  const [openSucces, setOpenSucces] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
    setOpenSucces(false);
  };

  function UnblockInputs() {
    if (
      document.getElementById("editButton").textContent === "Salvează schimbări"
    ) {
      document.getElementById("location").readOnly = true;
      document.getElementById("budget").readOnly = true;
      document.getElementById("numberofguests").readOnly = true;
      document.getElementById("liveband").readOnly = true;
      document.getElementById("liveband").style.backgroundColor = "#e4e6e9";
      document.getElementById("photographer").readOnly = true;
      document.getElementById("editButton").textContent = "Editează";

      UpdateForm();
    } else {
      document.getElementById("location").readOnly = false;
      document.getElementById("budget").readOnly = false;
      document.getElementById("numberofguests").readOnly = false;
      document.getElementById("liveband").readOnly = false;
      document.getElementById("liveband").style.backgroundColor = "white";
      document.getElementById("photographer").readOnly = false;
      document.getElementById("editButton").textContent = "Salvează schimbări";
    }
  }

  function UpdateForm() {
    setLoader(true);
    axios({
      method: "POST",
      url: "https://server-licenta.azurewebsites.net/updateform",
      data: {
        email: email,
        event: event,
        date: date,
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
        setOpenSucces(true);
      })
      .catch((error) => {
        if (error.response) {
          setOpenError(true);
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      })
      .finally(() => setLoader(false));
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
      <Box
        sx={{
          marginTop: columns,
          marginBottom: columns - 10,
          width: "85vw",
          backgroundColor: "white",
          textAlign: "center",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "left",
            margin: "1vh",
          }}
        >
          <Button
            sx={{
              fontSize: "2vw",
            }}
            startIcon={<ArrowBackIcon />}
            variant="contained"
            onClick={() => {
              history.push("/myeventpage");
              history.go(0);
            }}
            style={{
              backgroundColor: "#2C5E1A",
              color: "white",
              padding: "0.5vh",
            }}
          >
            Înapoi
          </Button>
        </Grid>
        <Box sx={{ backgroundColor: "white" }}>
          <div className="card-header">
            {event} {date}
          </div>
          <div className="card-body">
            <form>
              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="judet">
                    Judet
                  </label>
                  <input
                    className="form-control"
                    id="judet"
                    defaultValue={judet}
                    readOnly
                  />
                </div>

                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="budget">
                    Buget
                  </label>
                  <input
                    className="form-control"
                    id="budget"
                    type="number"
                    name="budget"
                    defaultValue={budget}
                    onChange={(event) =>
                      window.localStorage.setItem("buget", event.target.value)
                    }
                    readOnly
                  />
                </div>
              </div>

              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="location">
                    Locație
                  </label>
                  <input
                    className="form-control"
                    id="location"
                    type="text"
                    defaultValue={location}
                    onChange={(event) =>
                      window.localStorage.setItem("locatie", event.target.value)
                    }
                    readOnly
                  />
                </div>

                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="numberofguests">
                    Număr invitați
                  </label>
                  <input
                    className="form-control"
                    id="numberofguests"
                    type="number"
                    defaultValue={guests}
                    onChange={(event) =>
                      window.localStorage.setItem(
                        "invitati",
                        event.target.value
                      )
                    }
                    readOnly
                  />
                </div>
              </div>

              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="liveband">
                    Muzică
                  </label>
                  <input
                    className="form-control"
                    id="liveband"
                    defaultValue={liveband}
                    onChange={(event) =>
                      window.localStorage.setItem(
                        "liveband",
                        event.target.value
                      )
                    }
                    readOnly
                  />
                </div>

                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="photographer">
                    Fotograf
                  </label>
                  <input
                    className="form-control"
                    id="photographer"
                    defaultValue={photographer}
                    onChange={(event) =>
                      window.localStorage.setItem(
                        "fotograf",
                        event.target.value
                      )
                    }
                    readOnly
                  />
                </div>
              </div>
            </form>
            <Button
              id="editButton"
              variant="contained"
              onClick={() => {
                UnblockInputs();
              }}
              style={{
                backgroundColor: "#2C5E1A",
                color: "white",
                padding: "0.5vh",
              }}
            >
              Editează
            </Button>
            {loader && <OverlayLoader />}
          </div>
        </Box>
        <Snackbar
          open={openError}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            Eroare la modificarea datelor!
          </Alert>
        </Snackbar>

        <Snackbar
          open={openSucces}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success">
            Date modificate cu succes!
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
}
export default EditFormPage;

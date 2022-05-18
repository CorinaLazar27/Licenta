import React, { useState } from "react";
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
  // const ringDance = window.localStorage.getItem("ringdans");
  // const drinks = window.localStorage.getItem("bauturi");
  // const fruitsbar = window.localStorage.getItem("fruitsbar");
  // const candybar = window.localStorage.getItem("candybar");
  const video = window.localStorage.getItem("video");
  const photographer = window.localStorage.getItem("fotograf");
  const artisticmoment = window.localStorage.getItem("momentartistic");
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
      // document.getElementById("judet").readOnly = true;
      document.getElementById("budget").readOnly = true;
      document.getElementById("numberofguests").readOnly = true;
      document.getElementById("liveband").readOnly = true;
      document.getElementById("liveband").style.backgroundColor = "#e4e6e9";
      // document.getElementById("artisticmoment").readOnly = true;
      // document.getElementById("artisticmoment").style.backgroundColor =
      //   "#e4e6e9";
      document.getElementById("photographer").readOnly = true;
      // document.getElementById("photographer").style.backgroundColor = "#e4e6e9";
      // document.getElementById("video").readOnly = true;
      // document.getElementById("video").style.backgroundColor = "#e4e6e9";
      // document.getElementById("candybar").readOnly = true;
      // document.getElementById("candybar").style.backgroundColor = "#e4e6e9";
      // document.getElementById("fruitsbar").readOnly = true;
      // document.getElementById("fruitsbar").style.backgroundColor = "#e4e6e9";
      // document.getElementById("drinks").readOnly = true;
      // document.getElementById("drinks").style.backgroundColor = "#e4e6e9";
      // document.getElementById("ringDance").readOnly = true;
      // document.getElementById("ringDance").style.backgroundColor = "#e4e6e9";
      document.getElementById("editButton").textContent = "Editează";

      UpdateForm();
    } else {
      document.getElementById("location").readOnly = false;
      // document.getElementById("judet").readOnly = false;
      document.getElementById("budget").readOnly = false;
      document.getElementById("numberofguests").readOnly = false;
      document.getElementById("liveband").readOnly = false;
      document.getElementById("liveband").style.backgroundColor = "white";
      // document.getElementById("artisticmoment").readOnly = false;
      // document.getElementById("artisticmoment").style.backgroundColor = "white";
      document.getElementById("photographer").readOnly = false;
      // document.getElementById("photographer").style.backgroundColor = "white";
      // document.getElementById("video").readOnly = false;
      // document.getElementById("video").style.backgroundColor = "white";
      // document.getElementById("candybar").readOnly = false;
      // document.getElementById("candybar").style.backgroundColor = "white";
      // document.getElementById("fruitsbar").readOnly = false;
      // document.getElementById("fruitsbar").style.backgroundColor = "white";
      // document.getElementById("drinks").readOnly = false;
      // document.getElementById("drinks").style.backgroundColor = "white";
      // document.getElementById("ringDance").readOnly = false;
      // document.getElementById("ringDance").style.backgroundColor = "white";
      document.getElementById("editButton").textContent = "Salvează schimbări";
    }
  }

  function UpdateForm() {
    setLoader(true);
    axios({
      method: "POST",
      url: "/updateform",
      data: {
        email: email,
        event: event,
        date: date,
        nrguests: window.localStorage.getItem("invitati"),
        location: window.localStorage.getItem("locatie"),
        judet: window.localStorage.getItem("judet"),
        budget: window.localStorage.getItem("buget"),
        liveband: window.localStorage.getItem("liveband"),
        artisticmoment: window.localStorage.getItem("momentartistic"),
        photographer: window.localStorage.getItem("fotograf"),
        videorecording: window.localStorage.getItem("video"),
        // candybar: window.localStorage.getItem("candybar"),
        // fruitsbar: window.localStorage.getItem("fruitsbar"),
        // drinks: window.localStorage.getItem("bauturi"),
        // ringdance: window.localStorage.getItem("ringdans"),
      },
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setOpenSucces(true);
        // setTimeout(() => {
        //   history.push("/myeventpage");
        //   history.go(0);
        // }, 2500);
        if (res == "Done") {
          console.log("dONE");
        }
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

  return (
    <div className="Container">
      <Header />
      <Box
        sx={{
          minWidth: "90vw",
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
                  {/* <select
                  name="liveband"
                  id="liveband"
                  disabled="true"
                  className="select-control"
                  defaultValue={liveband}
                  onChange={(event) => {
                    window.localStorage.setItem("liveband", event.target.value);
                  }}
                >
                  <option value=""></option>
                  <option value="Da">Da</option>
                  <option value="Nu">Nu</option>
                </select> */}
                  {/* <input
                  className="form-control"
                  id="location"
                  type="text"
                  defaultValue={location}
                  onChange={(event) =>
                    window.localStorage.setItem("locatie", event.target.value)
                  }
                  readOnly
                /> */}
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
                  {/* <label className="small mb-1" htmlFor="artisticmoment">
                  Moment artistic
                </label>
                <input
                  className="form-control"
                  id="artisticmoment"
                  defaultValue={artisticmoment}
                  onChange={(event) =>
                    window.localStorage.setItem(
                      "momentartistic",
                      event.target.value
                    )
                  }
                  readOnly
                /> */}
                  {/* <select
                  name="artisticmoment"
                  id="artisticmoment"
                  disabled="true"
                  className="select-control"
                  defaultValue={artisticmoment}
                  onChange={(event) => {
                    window.localStorage.setItem(
                      "momentartistic",
                      event.target.value
                    );
                  }}
                >
                  <option value=""></option>
                  <option value="Da">Da</option>
                  <option value="Nu">Nu</option>
                </select> */}
                </div>
              </div>

              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  {/* <label className="small mb-1" htmlFor="photographer">
                  Fotograf
                </label>
                <input
                  className="form-control"
                  id="photographer"
                  defaultValue={photographer}
                  onChange={(event) =>
                    window.localStorage.setItem("fotograf", event.target.value)
                  }
                  readOnly
                /> */}
                  {/* <select
                  name="photographer"
                  id="photographer"
                  disabled="true"
                  className="select-control"
                  defaultValue={photographer}
                  onChange={(event) => {
                    window.localStorage.setItem("fotograf", event.target.value);
                  }}
                >
                  <option value=""></option>
                  <option value="Da">Da</option>
                  <option value="Nu">Nu</option>
                </select> */}
                </div>

                <div className="col-md-6">
                  {/* <label className="small mb-1" htmlFor="video">
                  Inregistrare video
                </label>
                <input
                  className="form-control"
                  id="video"
                  name="birthday"
                  defaultValue={video}
                  onChange={(event) =>
                    window.localStorage.setItem("video", event.target.value)
                  }
                  readOnly
                /> */}
                  {/* <select
                  name="video"
                  id="video"
                  disabled="true"
                  className="select-control"
                  defaultValue={video}
                  onChange={(event) => {
                    window.localStorage.setItem("video", event.target.value);
                  }}
                >
                  <option value=""></option>
                  <option value="Da">Da</option>
                  <option value="Nu">Nu</option>
                </select> */}
                </div>
              </div>

              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  {/* <label className="small mb-1" htmlFor="candybar">
                  Candy Bar
                </label> */}
                  {/* <input
                  className="form-control"
                  id="candybar"
                  defaultValue={candybar}
                  onChange={(event) =>
                    window.localStorage.setItem("candybar", event.target.value)
                  }
                  readOnly
                /> */}
                  {/* <select
                  name="candybar"
                  id="candybar"
                  disabled="true"
                  className="select-control"
                  defaultValue={candybar}
                  onChange={(event) => {
                    window.localStorage.setItem("candybar", event.target.value);
                  }}
                >
                  <option value=""></option>
                  <option value="Da">Da</option>
                  <option value="Nu">Nu</option>
                </select> */}
                </div>

                <div className="col-md-6">
                  {/* <label className="small mb-1" htmlFor="fruitsbar">
                  Bar cu fructe
                </label> */}
                  {/* <input
                  className="form-control"
                  id="fruitsbar"
                  name="fruitsbar"
                  defaultValue={fruitsbar}
                  onChange={(event) =>
                    window.localStorage.setItem("fruitsbar", event.target.value)
                  }
                  readOnly
                /> */}

                  {/* <select
                  name="fruitsbar"
                  id="fruitsbar"
                  disabled="true"
                  className="select-control"
                  defaultValue={fruitsbar}
                  onChange={(event) => {
                    window.localStorage.setItem(
                      "fruitsbar",
                      event.target.value
                    );
                  }}
                >
                  <option value=""></option>
                  <option value="Da">Da</option>
                  <option value="Nu">Nu</option>
                </select> */}
                </div>
              </div>

              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  {/* <label className="small mb-1" htmlFor="drinks">
                  Băuturi
                </label> */}
                  {/* <input
                  className="form-control"
                  id="drinks"
                  defaultValue={drinks}
                  onChange={(event) =>
                    window.localStorage.setItem("bauturi", event.target.value)
                  }
                  readOnly
                /> */}
                  {/* <select
                  name="drinks"
                  id="drinks"
                  disabled="true"
                  className="select-control"
                  defaultValue={drinks}
                  onChange={(event) => {
                    window.localStorage.setItem("bauturi", event.target.value);
                  }}
                >
                  <option value=""></option>
                  <option value="Băuturi la masă">Băuturi la masă</option>
                  <option value="Bartman">Bartman</option>
                </select> */}
                </div>

                {/* <div className="col-md-6">
                <label className="small mb-1" htmlFor="ringDance">
                  Ring dans
                </label> */}
                {/* <input
                  className="form-control"
                  id="ringDance"
                  name="ringDance"
                  defaultValue={ringDance}
                  onChange={(event) =>
                    window.localStorage.setItem("ringdans", event.target.value)
                  }
                  readOnly
                /> */}
                {/* <select
                  name="ringDance"
                  id="ringDance"
                  disabled="true"
                  className="select-control"
                  defaultValue={ringDance}
                  onChange={(event) => {
                    window.localStorage.setItem("ringdans", event.target.value);
                  }}
                >
                  <option value=""></option>
                  <option value="Dominant">Dominant</option>
                  <option value="Restrâns">Restrâns</option>
                  <option value="Fără">Fără</option>
                </select> */}
                {/* </div> */}
              </div>
            </form>
            <Button
              id="editButton"
              variant="contained"
              sx={{
                backgroundColor: "green",
                hover: {
                  "&:hover": {
                    backgroundColor: "red",
                  },
                },
              }}
              onClick={() => {
                UnblockInputs();
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

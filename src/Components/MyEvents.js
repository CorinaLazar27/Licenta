import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { useHistory } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import OverlayLoader from "./OverlayLoader";
import "react-dropdown/style.css";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";

import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Container, Box, Grid, Typography, TextField } from "@mui/material";
import Header from "./Header";
import { Tooltip } from "@material-ui/core";
import MuiAlert from "@mui/material/Alert";
import { LoadingButton } from "@mui/lab";

function MyEventPage() {
  const history = useHistory();
  const [openError, setOpenError] = useState(false);
  const [openSucces, setOpenSucces] = useState(false);
  const [data, setData] = useState([]);
  const [dateForDelete, setDateForDelete] = useState("");
  const email = window.localStorage.getItem("email");
  const event = window.localStorage.getItem("eveniment");
  const date = window.localStorage.getItem("dataeveniment");
  const judet = window.localStorage.getItem("judet");
  const [loader, setLoader] = useState(true);
  const [box, setBox] = useState(false);
  const [noData, setNoData] = useState(false);
  const [load, setLoad] = useState(true);
  const [restaurant, setRestaurant] = useState("");
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [sure, setSure] = useState(false);

  const [locationsRecomanded, setLocationsRecomanded] = useState([]);
  const [openInputText, setOpenInputText] = useState(false);
  const [noRecomandations, setNoRecomandations] = useState(false);

  const handleToClose = () => {
    setOpenDialogDelete(false);
  };

  useEffect(() => {
    GetMyEvents();
  }, []);

  function GetLocationRecomandation() {
    setNoRecomandations(false);
    axios({
      method: "POST",
      url: "/getRecomandations",
      data: {
        email: email,
        event: event,
        judet: judet,
        date: date,
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
        if (
          response.data[0] === "" &&
          response.data[1] === "" &&
          response.data[2] === ""
        )
          setNoRecomandations(true);
        if (
          locationsRecomanded[0] === "" &&
          locationsRecomanded[1] === "" &&
          locationsRecomanded[2] === ""
        )
          setNoRecomandations(true);
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

  function GetMyEvents() {
    axios({
      method: "POST",
      url: "/getmyevents",
      data: {
        email: email,
      },
    })
      .then((response) => {
        setLoader(false);
        setLoad(false);
        setData(response.data.results);
        console.log(response.data.results.length);
        console.log(response.data.results.location);
        if (response.data.results.length === 0) setNoData(true);
      })
      .catch((error) => {
        if (error.response) {
          setLoader(false);
          setLoad(false);
          setNoData(true);
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }
  // function GetElements(event) {
  //   axios({
  //     method: "GET",
  //     url: "/elements",
  //   })
  //     .then((response) => {
  //       //console.log(response.data.results);
  //       setData(response.data.results);
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         console.log(error.response);
  //         console.log(error.response.status);
  //         console.log(error.response.headers);
  //       }
  //     });

  //   event.preventDefault();
  // }

  const DeleteEvent = (item) => {
    setLoader(true);
    axios({
      method: "POST",
      url: "/deleteevent",
      data: {
        email: email,
        date: item.RowKey,
      },
    })
      .then((response) => {
        setOpenSucces(true);
        setLoader(false);
        if (response.data == "Done") {
          setTimeout(window.location.reload(false), 4000);
        }
      })
      .catch((error) => {
        if (error.response) {
          setOpenError(true);
          setLoader(false);
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  function chooseLocation() {
    setLoader(true);
    setBox(true);
    GetLocationRecomandation();
  }

  const [loading, setLoading] = useState(false);
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
        //setOpenSuccesLocation(true);
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
          setOpenErrorLocation(true);
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      })
      .finally(() => setLoading(false));
  }

  function myClick(event) {
    setDateForDelete(event.RowKey);
    console.log(dateForDelete);
    //handleClickToOpen();
    window.localStorage.setItem("eveniment", event.EventType);
    window.localStorage.setItem("locatie", event.Location);
    window.localStorage.setItem("judet", event.Judet);
    window.localStorage.setItem("invitati", event.NumberGuests);
    window.localStorage.setItem("buget", event.Budget);
    window.localStorage.setItem("momentartistic", event.ArtisticMoment);
    window.localStorage.setItem("fotograf", event.Photographer);
    window.localStorage.setItem("video", event.VideoRecording);
    window.localStorage.setItem("candybar", event.CandyBar);
    window.localStorage.setItem("fruitsbar", event.FruitsBar);
    // window.localStorage.setItem("bauturi", event.Drinks);
    // window.localStorage.setItem("ringdans", event.RingDance);
    // window.localStorage.setItem("dataeveniment", event.RowKey);
    // window.localStorage.setItem("liveband", event.LiveBand);
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  return (
    <Container
      maxWidth={"100vw"}
      sx={{
        // backgroundColor: "#FFD59E",
        // backgroundSize: "cover",
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Grid container rowSpacing={5}>
        {!noData && !load && (
          <Grid item xs={12}>
            <h3>Evenimentele mele</h3>
          </Grid>
        )}
        {noData && !load && (
          <Grid item xs={12}>
            <h3>Nu există evenimente!</h3>
          </Grid>
        )}
        {!noData && !load && (
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Table sx={{ maxWidth: "80vw" }}>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox"></TableCell>
                  <TableCell> Tipul evenimentului </TableCell>
                  <TableCell> Data </TableCell>
                  <TableCell> Restaurant </TableCell>
                  <TableCell> Actiuni</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => (
                  <TableRow>
                    <TableCell padding="checkbox"></TableCell>
                    <TableCell onClick={() => myClick(item)}>
                      {item.EventType}
                    </TableCell>
                    <TableCell onClick={() => myClick(item)}>
                      {item.RowKey}
                    </TableCell>
                    <TableCell onClick={() => myClick(item)}>
                      {item.Location !== "" && item.Location}

                      {item.Location == "" && (
                        <Button
                          onClick={() => {
                            setOpenInputText(true);
                            chooseLocation();
                          }}
                        >
                          Alege
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Anulare eveniment">
                        <Button
                          sx={{ minWidth: "2px" }}
                          onClick={() => {
                            myClick(item);
                            // setSure(false);
                            // setOpenDialogDelete(true);

                            // if (sure == true)
                            DeleteEvent(item);
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Editeaza eveniment">
                        <Button
                          sx={{ minWidth: "2px" }}
                          onClick={() => {
                            myClick(item);
                            history.push("/editformpage");
                          }}
                        >
                          <EditIcon />
                        </Button>
                      </Tooltip>

                      <Tooltip title="Trimite formular la invitați">
                        <Button
                          sx={{ minWidth: "2px" }}
                          onClick={() => {
                            myClick(item);
                            history.push("/sendinvitationspage");
                          }}
                        >
                          <ForwardToInboxIcon />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Vizualizeaza rezultate formular">
                        <Button
                          sx={{ minWidth: "2px" }}
                          onClick={() => {
                            myClick(item);
                            history.push("/resultpage");
                            history.go(0);
                          }}
                        >
                          <ContentPasteSearchIcon />
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        )}
        {!load && (
          <Grid
            item
            xs={12}
            sx={{
              marginTop: "5vh",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                history.push("/registerevent");
                history.go(0);
              }}
            >
              Adaugă un eveniment
            </Button>
          </Grid>
        )}
        {box && !loader && (
          <Grid item xs={12}>
            <Box sx={{ border: 2 }}>
              <label> Alții au ales ... </label>
              <Grid
                container
                sx={{ justifyContent: "center", marginBottom: "2vh" }}
              >
                {noRecomandations && (
                  <h6>
                    Nu există recomandări pentru evenimentul dumneavoastră..
                  </h6>
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
                          <LoadingButton
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
                          </LoadingButton>
                        </CardActions>
                      </Card>
                    );
                })}

                {openInputText && (
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "2vh",
                    }}
                  >
                    <Card
                      style={{
                        backgroundColor: "#F5F4F2",
                        color: "black",
                        minHeight: "10vh",
                        minWidth: "10vw",
                        marginLeft: "3vw",
                      }}
                    >
                      <CardContent>
                        <TextField
                          variant="outlined"
                          label="Altă opțiune"
                          size="small"
                          value={restaurant}
                          onChange={(e) => setRestaurant(e.target.value)}
                        ></TextField>
                      </CardContent>
                      <CardActions
                        sx={{ justifyContent: "center", alignItems: "center" }}
                      >
                        <LoadingButton
                          loading={loading}
                          onClick={() => {
                            window.localStorage.setItem("locatie", restaurant);
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
                        </LoadingButton>
                      </CardActions>
                    </Card>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Grid>
        )}
      </Grid>
      <Header />
      {loader && <OverlayLoader />}

      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          Eroare la stergere!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openErrorLocation}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          Eroare la alegerea locației!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSuccesLocation}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          Locatie aleasa cu succes!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSucces}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          Eveniment sters cu succes!
        </Alert>
      </Snackbar>

      <Dialog
        open={openDialogDelete}
        onClose={handleToClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          {"Sunteți sigur că vreți să stergeți evenimentul?"}
        </DialogTitle>

        <DialogActions>
          <Button
            color="primary"
            autoFocus
            onClick={() => {
              setSure(true);
              handleToClose();
            }}
          >
            Da
          </Button>
          <Button
            color="primary"
            autoFocus
            onClick={() => {
              history.push("/myeventpage");
              history.go(0);
            }}
          >
            Nu
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
export default MyEventPage;

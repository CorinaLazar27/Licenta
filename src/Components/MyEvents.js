import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Image/logo.png";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Dropdown from "react-dropdown";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
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
import {
  Container,
  Box,
  Grid,
  Typography,
  responsiveFontSizes,
} from "@mui/material";

import Header from "./Header";
import { Tooltip } from "@material-ui/core";
import { IconButton } from "material-ui";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import MuiAlert from "@mui/material/Alert";

function MyEventPage() {
  const history = useHistory();
  const [openError, setOpenError] = useState(false);
  const [openSucces, setOpenSucces] = useState(false);
  const [data, setData] = useState([]);
  const [dateForDelete, setDateForDelete] = useState("");
  const email = window.localStorage.getItem("email");
  const event = window.localStorage.getItem("eveniment");
  const [loader, setLoader] = useState(true);
  const [box, setBox] = useState(false);
  const [noData, setNoData] = useState(false);
  const [load, setLoad] = useState(true);

  const [locationsRecomanded, setLocationsRecomanded] = useState([]);

  useEffect(() => {
    GetMyEvents();
  }, []);

  function GetLocationRecomandation() {
    axios({
      method: "POST",
      url: "/getRecomandations",
      data: {
        email: email,
        event: event,
      },
    })
      .then((response) => {
        setLoader(false);
        console.log(response.data);
        setLocationsRecomanded(Object.values(response.data));
        console.log(locationsRecomanded);
      })
      .catch((error) => {
        if (error.response) {
          setLoader(false);
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
        if (response.data.results.length === 0) setNoData(true);
      })
      .catch((error) => {
        if (error.response) {
          setLoader(false);
          setLoad(false);
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }
  function GetElements(event) {
    axios({
      method: "GET",
      url: "/elements",
    })
      .then((response) => {
        //console.log(response.data.results);
        setData(response.data.results);
        console.log(data);
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

  function DeleteEvent(item) {
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
  }

  function chooseLocation() {
    setLoader(true);
    setBox(true);
    GetLocationRecomandation();
  }

  function myClick(event) {
    setDateForDelete(event.RowKey);
    console.log(dateForDelete);
    //handleClickToOpen();
    window.localStorage.setItem("eveniment", event.EventType);
    window.localStorage.setItem("locatie", event.Location);
    window.localStorage.setItem("invitati", event.NumberGuests);
    window.localStorage.setItem("buget", event.Budget);
    window.localStorage.setItem("momentartistic", event.ArtisticMoment);
    window.localStorage.setItem("fotograf", event.Photographer);
    window.localStorage.setItem("video", event.VideoRecording);
    window.localStorage.setItem("candybar", event.CandyBar);
    window.localStorage.setItem("fruitsbar", event.FruitsBar);
    window.localStorage.setItem("bauturi", event.Drinks);
    window.localStorage.setItem("ringdans", event.RingDance);
    window.localStorage.setItem("dataeveniment", event.RowKey);
    window.localStorage.setItem("liveband", event.LiveBand);
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
      maxWidth={false}
      sx={{
        backgroundColor: "#FFD59E",
        backgroundSize: "cover",
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
          <Grid item xs={12}>
            <Table>
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
                      {item.Location !== null && item.Location}
                      <Button onClick={() => chooseLocation()}>Alege</Button>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Anulare eveniment">
                        <Button
                          sx={{ minWidth: "2px" }}
                          onClick={() => {
                            myClick(item);
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
              marginTop: "12vh",
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
              <label> Altii au ales ... </label>

              <List sx={{ width: "100%", maxWidth: 360 }}>
                {locationsRecomanded.map((location) => (
                  <ListItem key={location}>
                    <ListItemText primary={location} />
                    <button
                      onClick={() => console.log(location)}
                      style={{
                        backgroundColor: "pink",
                        height: "5vh",
                        width: "5vw",
                      }}
                    >
                      Alege
                    </button>
                  </ListItem>
                ))}
              </List>
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
        open={openSucces}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          Eveniment sters cu succes!
        </Alert>
      </Snackbar>
    </Container>
  );
}
export default MyEventPage;

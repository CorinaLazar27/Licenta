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
import $ from "jquery";

import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@mui/material/Button";
import { Container, Box, Grid, Typography } from "@mui/material";

import Header from "./Header";
import { Tooltip } from "@material-ui/core";
import { IconButton } from "material-ui";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";

function MyEventPage() {
  const history = useHistory();
  const [reload, setReload] = useState("1");
  const [data, setData] = useState([]);
  const [dateForDelete, setDateForDelete] = useState("");
  const email = window.localStorage.getItem("email");
  const event = window.localStorage.getItem("eveniment");
  const [loader, setLoader] = useState(true);
  const [box, setBox] = useState(false);
  const [open, setOpen] = useState(false);
  const [locationsRecomanded, setLocationsRecomanded] = useState([]);

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };

  // window.onload = function exampleFunction() {
  //   GetMyEvents();
  //   //window.location.reload();
  // };
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
        setData(response.data.results);
        console.log(data);
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

  function DeleteEvent() {
    axios({
      method: "POST",
      url: "/deleteevent",
      data: {
        email: email,
        date: dateForDelete,
      },
    })
      .then((response) => {
        if (response.data == "Done") {
          // handleToClose();
          window.location.reload(false);
          //notificare();
        }
      })
      .catch((error) => {
        if (error.response) {
          eroare();

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

  function eroare() {
    // Show the div in 5s
    $("#note").show();
    setTimeout(function () {
      $("#notes").fadeOut("fast");
    }, 3000); // <-- time in milliseconds
    setOpen(false);
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
        <Grid item xs={12}>
          <h3>Evenimentele mele</h3>
        </Grid>
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
                          DeleteEvent();
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

                    <Tooltip title="Trimite formular la invitati">
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
        <Grid
          item
          xs={12}
          sx={{
            marginTop: "12vh",
          }}
        >
          <Button
            variant="contained"
            onClick={() => history.push("/registerevent")}
          >
            Adaugă un eveniment
          </Button>
        </Grid>
        {box && (
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

      <div id="notesucces">Eveniment sters cu succes!</div>
      <div id="note">Eroare la stergerea evenimentului, incearca din nou!</div>

      <Dialog open={open} onClose={handleToClose}>
        <DialogTitle>{"Ce actiune vrei sa faci?"}</DialogTitle>

        <DialogActions>
          <Button
            onClick={() => history.push("/editformpage")}
            color="primary"
            autoFocus
          >
            Editare
          </Button>
          <Button onClick={() => DeleteEvent()} color="primary" autoFocus>
            Stergere
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
export default MyEventPage;

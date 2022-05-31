import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { useHistory } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import CloseIcon from "@mui/icons-material/Close";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import OverlayLoader from "./OverlayLoader";
import "react-dropdown/style.css";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";

import Dialog from "@material-ui/core/Dialog";

import DialogTitle from "@material-ui/core/DialogTitle";

import DialogContent from "@material-ui/core/DialogContent";
import Button from "@mui/material/Button";

import { Container, Box, Grid, TextField } from "@mui/material";
import Header from "./Header";
import { Tooltip } from "@material-ui/core";
import MuiAlert from "@mui/material/Alert";
import { LoadingButton } from "@mui/lab";

import background from "../Image/homePage.png";

import AssistantIcon from "@mui/icons-material/Assistant";
import RecommendIcon from "@mui/icons-material/Recommend";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import Rating from "@mui/material/Rating";
import TableContainer from "@mui/material/TableContainer";

import Paper from "@material-ui/core/Paper";

function MyEventPage() {
  const history = useHistory();
  const [openError, setOpenError] = useState(false);
  const [openSucces, setOpenSucces] = useState(false);
  const [data, setData] = useState([]);
  const [dateForDelete, setDateForDelete] = useState("");
  const email = window.localStorage.getItem("email");
  const event = window.localStorage.getItem("eveniment");

  const [loader, setLoader] = useState(true);
  const [noData, setNoData] = useState(false);
  const [load, setLoad] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);
  const [opiniiRestaurant, setOpiniiRestaurant] = useState("");
  const [opiniiFotograf, setOpiniiFotograf] = useState("");
  const [opiniiMuzica, setOpiniiMuzica] = useState("");
  const [ratingRestaurant, setRatingRestaurant] = useState(0);
  const [ratingMuzica, setRatingMuzica] = useState(0);
  const [ratingFotograf, setRatingFotograf] = useState(0);
  const [loadingOpinii, setLoadingOpinii] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleToClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    GetMyEvents();
  }, []);

  function GetMyEvents() {
    axios({
      method: "POST",
      url: "https://server-licenta.azurewebsites.net/getmyevents",
      data: {
        email: email,
      },
    })
      .then((response) => {
        setLoader(false);
        setLoad(false);
        setData(response.data.results);
        console.log("ASTA VREAU", response.data.results);
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

  const DeleteEvent = (item) => {
    setLoader(true);
    axios({
      method: "POST",
      url: "https://server-licenta.azurewebsites.net/deleteevent",
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

  async function UpdateForm() {
    console.log("GATA!");

    await axios({
      method: "POST",
      url: "https://server-licenta.azurewebsites.net/updateform",
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
        opinie: true,
      },
    })
      .then((response) => {
        const res = response.data;
        console.log(res);

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
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  function PostOpinii() {
    setLoadingOpinii(true);
    axios({
      method: "POST",
      url: "https://server-licenta.azurewebsites.net/postOpinii",
      data: {
        email: email,
        event: event,
        name: window.localStorage.getItem("nume"),
        date: window.localStorage.getItem("dataeveniment"),
        nrguests: window.localStorage.getItem("invitati"),
        location: window.localStorage.getItem("locatie"),
        judet: window.localStorage.getItem("judet"),
        liveband: window.localStorage.getItem("liveband"),
        photographer: window.localStorage.getItem("fotograf"),
        opiniiFotograf: opiniiFotograf,
        opiniiRestaurant: opiniiRestaurant,
        opiniiMuzica: opiniiMuzica,
        ratingFotograf: ratingFotograf,
        ratingRestaurant: ratingRestaurant,
        ratingMuzica: ratingMuzica,
      },
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        UpdateForm();
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      })
      .finally(() => setLoadingOpinii(false));
  }

  function myClick(event) {
    setDateForDelete(event.RowKey);
    console.log(dateForDelete);
    window.localStorage.setItem("eveniment", event.TipEveniment);
    window.localStorage.setItem("locatie", event.Restaurant);
    window.localStorage.setItem("judet", event.Judet);
    window.localStorage.setItem("invitati", event.NumarInvitati);
    window.localStorage.setItem("buget", event.Buget);
    window.localStorage.setItem("fotograf", event.Fotograf);
    window.localStorage.setItem("dataeveniment", event.RowKey);
    window.localStorage.setItem("liveband", event.Muzica);
    window.localStorage.setItem("opinie", event.Opinie);
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
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url("${background}")`,
      }}
    >
      <Header />

      {!load && (
        <Box
          sx={{
            background: "rgb(255, 255, 255,1)",
            boxShadow: "2px 4px 6px rgba(0, 0, 0, 1)",
            padding: "2vw",
            textAlign: "center",
            maxWidth: "100vw",
          }}
        >
          <Dialog open={openDialog} onClose={handleToClose}>
            <DialogTitle
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid
                container
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Grid item xs={6}>
                  {"Ce părere ai avut despre ..."}
                </Grid>
                <Grid item xs={6}>
                  <Button
                    onClick={handleToClose}
                    sx={{
                      float: "right",
                    }}
                    float="right"
                  >
                    <CloseIcon />
                  </Button>
                </Grid>
              </Grid>
            </DialogTitle>
            <DialogContent
              sx={{
                backgroundColor: "white",
              }}
            >
              <form>
                <Grid
                  container
                  rowSpacing={"2vh"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      label="Sala de evenimente"
                      rows={3}
                      multiline
                      required
                      onChange={(e) => setOpiniiRestaurant(e.target.value)}
                    ></TextField>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Rating
                      name="simple-controlled"
                      value={ratingRestaurant}
                      onChange={(event, newValue) => {
                        setRatingRestaurant(newValue);
                      }}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",

                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      rows={3}
                      label="Muzică"
                      multiline
                      required
                      onChange={(e) => setOpiniiMuzica(e.target.value)}
                    ></TextField>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Rating
                      name="simple-controlled"
                      value={ratingMuzica}
                      onChange={(event, newValue) => {
                        setRatingMuzica(newValue);
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      rows={3}
                      label="Fotograf"
                      multiline
                      required
                      onChange={(e) => setOpiniiFotograf(e.target.value)}
                    ></TextField>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Rating
                      name="simple-controlled"
                      value={ratingFotograf}
                      onChange={(event, newValue) => {
                        setRatingFotograf(newValue);
                      }}
                    />
                  </Grid>
                  <LoadingButton
                    loading={loadingOpinii}
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(opiniiRestaurant);
                      console.log(opiniiMuzica);
                      console.log(opiniiFotograf);
                      PostOpinii();
                    }}
                  >
                    Trimite
                  </LoadingButton>
                </Grid>
              </form>
            </DialogContent>
          </Dialog>

          <Grid
            container
            rowSpacing={5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
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
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox"></TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          {" "}
                          Tipul evenimentului{" "}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          {" "}
                          Data{" "}
                        </TableCell>

                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          {" "}
                          Invitați
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          {" "}
                          Statistici
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          {" "}
                          Recomandări
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          {" "}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((item) => {
                        const splitDate = item.RowKey.split(".");

                        const dataEveniment = new Date(
                          splitDate[2],
                          splitDate[1] - 1,
                          splitDate[0]
                        );

                        if (dataEveniment >= today)
                          //Evenimentul  nu e trecut
                          return (
                            <TableRow>
                              <TableCell padding="checkbox"></TableCell>
                              <TableCell
                                sx={{
                                  textAlign: "center",
                                }}
                                onClick={() => myClick(item)}
                              >
                                {item.TipEveniment}
                              </TableCell>
                              <TableCell
                                sx={{
                                  textAlign: "center",
                                }}
                                onClick={() => myClick(item)}
                              >
                                {item.RowKey}
                              </TableCell>

                              <TableCell
                                sx={{
                                  textAlign: "center",
                                }}
                              >
                                <Tooltip title="Vezi invitații">
                                  <Button
                                    sx={{ minWidth: "2px" }}
                                    onClick={() => {
                                      myClick(item);
                                      history.push("/sendinvitationspage");
                                    }}
                                  >
                                    <PeopleIcon />
                                  </Button>
                                </Tooltip>
                              </TableCell>
                              <TableCell
                                sx={{
                                  textAlign: "center",
                                }}
                              >
                                {" "}
                                <Tooltip title="Vizualizeaza rezultate chestionar">
                                  <Button
                                    sx={{ minWidth: "2px" }}
                                    onClick={() => {
                                      myClick(item);
                                      history.push("/resultpage");
                                      history.go(0);
                                    }}
                                  >
                                    <RecommendIcon />
                                  </Button>
                                </Tooltip>
                              </TableCell>
                              <TableCell
                                sx={{
                                  textAlign: "center",
                                }}
                              >
                                <Tooltip title="Vezi recomandări">
                                  <Button
                                    sx={{ minWidth: "2px" }}
                                    onClick={() => {
                                      myClick(item);
                                      history.push("/recommandpage");
                                      history.go(0);
                                    }}
                                  >
                                    <AssistantIcon />
                                  </Button>
                                </Tooltip>
                              </TableCell>
                              <TableCell
                                sx={{
                                  textAlign: "center",
                                }}
                              >
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
                              </TableCell>
                            </TableRow>
                          );
                        //Evenimentul   e trecut
                        else
                          return (
                            <TableRow
                              sx={{
                                backgroundColor: "#fdfff5",
                              }}
                            >
                              <TableCell padding="checkbox"></TableCell>
                              <TableCell
                                sx={{
                                  textAlign: "center",
                                }}
                                onClick={() => myClick(item)}
                              >
                                {item.TipEveniment}
                              </TableCell>
                              <TableCell
                                sx={{
                                  textAlign: "center",
                                }}
                                onClick={() => myClick(item)}
                              >
                                {item.RowKey}
                              </TableCell>

                              <TableCell
                                sx={{
                                  textAlign: "center",
                                }}
                              >
                                <Tooltip title="Vezi invitații">
                                  <Button
                                    sx={{ minWidth: "2px" }}
                                    onClick={() => {
                                      myClick(item);
                                      history.push("/sendinvitationspage");
                                    }}
                                  >
                                    <PeopleIcon />
                                  </Button>
                                </Tooltip>
                              </TableCell>
                              <TableCell
                                sx={{
                                  textAlign: "center",
                                }}
                              >
                                {" "}
                                <Tooltip title="Vizualizeaza rezultate chestionar">
                                  <Button
                                    sx={{ minWidth: "2px" }}
                                    onClick={() => {
                                      myClick(item);
                                      history.push("/resultpage");
                                      history.go(0);
                                    }}
                                  >
                                    <RecommendIcon />
                                  </Button>
                                </Tooltip>
                              </TableCell>
                              <TableCell
                                sx={{
                                  textAlign: "center",
                                }}
                              >
                                <Tooltip title="Vezi recomandări">
                                  <Button
                                    disabled
                                    sx={{ minWidth: "2px" }}
                                    onClick={() => {
                                      myClick(item);
                                      history.push("/recommandpage");
                                      history.go(0);
                                    }}
                                  >
                                    <AssistantIcon />
                                  </Button>
                                </Tooltip>
                              </TableCell>
                              <TableCell
                                sx={{
                                  textAlign: "center",
                                }}
                              >
                                <Tooltip title="Editeaza eveniment">
                                  <Button
                                    disabled
                                    sx={{ minWidth: "2px" }}
                                    onClick={() => {
                                      myClick(item);
                                      history.push("/editformpage");
                                    }}
                                  >
                                    <EditIcon />
                                  </Button>
                                </Tooltip>
                                <Tooltip title="Anulare eveniment">
                                  <Button
                                    disabled
                                    sx={{ minWidth: "2px" }}
                                    onClick={() => {
                                      myClick(item);

                                      DeleteEvent(item);
                                    }}
                                  >
                                    <DeleteIcon />
                                  </Button>
                                </Tooltip>
                                {!item.Opinie && (
                                  <Tooltip title="Spune-ți opinia">
                                    <Button
                                      sx={{ minWidth: "2px" }}
                                      onClick={() => {
                                        myClick(item);
                                        setOpenDialog(true);
                                      }}
                                    >
                                      {item.Opinie}
                                      <RateReviewIcon />
                                    </Button>
                                  </Tooltip>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
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
                  style={{
                    backgroundColor: "#2C5E1A",
                    color: "white",
                    padding: "0.5vh",
                  }}
                >
                  Adaugă un eveniment
                </Button>
              </Grid>
            )}
          </Grid>
        </Box>
      )}

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

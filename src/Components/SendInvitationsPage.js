import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import "react-dropdown/style.css";
import emailjs from "emailjs-com";
import Header from "./Header";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import InputLabel from "@mui/material/InputLabel";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import OverlayLoader from "./OverlayLoader";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

import background from "../Image/homePage.png";

function SendInvitationsPage() {
  const history = useHistory();
  const email = window.localStorage.getItem("email");
  const nume = window.localStorage.getItem("nume");
  const eveniment = window.localStorage.getItem("eveniment");
  const data = window.localStorage.getItem("dataeveniment");
  const messageValue =
    "Salut! Te astept în data de: " +
    data +
    " la " +
    eveniment.toLocaleLowerCase() +
    ". " +
    "\n" +
    "Te rugăm să completezi formularul de la următorul link pentru a afla preferințele tale legate de evenimentul la care îmi doresc să participi:" +
    "\n" +
    "https://completare-chestionar.netlify.app/?email=" +
    email +
    "&event=" +
    eveniment +
    "&date=" +
    data +
    "\n" +
    "Mulțumesc foarte mult!";
  const [loading, setLoading] = useState(false);
  const [loadingMail, setLoadingMail] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [formValues, setFormValues] = useState([
    {
      EmailInvitat: "",
      NumeInvitat: "",
      ConfirmarePrezenta: false,
      NumarPersoane: 1,
    },
  ]);
  const [empty, setEmpty] = useState(false);
  const [invitatiSalvati, setInvitatiSalvati] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleToClose = () => {
    setOpenDialog(false);
  };

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    if (e.target.name == "ConfirmarePrezenta")
      newFormValues[i][e.target.name] = e.target.checked;
    else newFormValues[i][e.target.name] = e.target.value;

    setFormValues(newFormValues);
  };

  let handleChangeOld = (i, e) => {
    console.log("change", e.target.name);
    console.log("value", e.target.value);
    let newFormValues = [...invitatiSalvati];
    console.log("inainte", newFormValues);
    if (e.target.name == "ConfirmarePrezenta")
      newFormValues[i][e.target.name] = e.target.checked;
    else newFormValues[i][e.target.name] = e.target.value;

    setInvitatiSalvati(newFormValues);
    console.log(invitatiSalvati);
  };

  let addFormFields = () => {
    setFormValues([
      ...formValues,
      {
        EmailInvitat: "",
        NumeInvitat: "",
        ConfirmarePrezenta: false,
        NumarPersoane: 1,
      },
    ]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };
  const [openError, setOpenError] = useState(false);
  const [openSucces, setOpenSucces] = useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
    setOpenSucces(false);
  };

  const [checked, setChecked] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [mailChecked, setMailChecked] = useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    console.log("CHEKED1111!", checked);
  };

  async function GetInvitati() {
    await axios({
      method: "POST",
      url: "/getInvitati",
      data: {
        email: email,
        date: data,
      },
    })
      .then((response) => {
        console.log(response.data.results);
        if (response.data.results.length == 0) setEmpty(true);
        else setInvitatiSalvati(response.data.results);

        // console.log("invitatiSalvati", invitatiSalvati);
      })
      .catch((error) => {
        if (error.response) {
          // setLoader(false);
          // setLoad(false);
          // setNoData(true);
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      })
      .finally(() => setLoader(false));
  }
  function removeFormInv(i) {
    let newFormValues = [...invitatiSalvati];
    // newFormValues.splice(i, 1);
    setInvitatiSalvati(newFormValues);
    console.log("console.log", invitatiSalvati[i].RowKey);

    setLoader(true);
    axios({
      method: "POST",
      url: "/deleteinvitat",
      data: {
        email: email,
        date: data,
        EmailInvitat: invitatiSalvati[i].RowKey,
      },
    })
      .then((response) => {
        setOpen(true);
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

  const [open, setOpen] = useState(false);

  async function SendInvitati() {
    let formVal = formValues.slice(1);

    console.log("aaaA", formVal);

    console.log("bbbb", invitatiSalvati);

    setLoading(true);

    await axios({
      method: "POST",
      url: "/invitationList",
      data: {
        oldValues: invitatiSalvati,
        formValues: formVal,
        email: email,
        date: data,
      },
    })
      .then((response) => {
        setLoading(false);
        console.log(response);
        setOpen(true);
        setTimeout(window.location.reload(false), 4000);
        const res = response.data;
        console.log(res);
      })
      .catch((error) => {
        if (error.response) {
          setOpenError(true);
          setLoading(false);

          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }
  const [mail, setMail] = useState([]);

  function sendEmail() {
    console.log("====CHEKED===", checked);
    let newMail = [];

    checked.map((element, index) => {
      // newMail.splice(index, 1);
      newMail.push(element.RowKey);
      console.log(element.NumeInvitat);
      console.log(element.RowKey);
    });
    setMail(newMail);
    console.log("MAAAIL", mail);
    var templateParams = {
      EmailInvitat: mail,
      name: nume,
      message: messageValue,
    };
    if (mail.length != 0) {
      setLoadingMail(true);
      emailjs
        .send(
          "service_n4e6ik8",
          "template_ent1jts",
          templateParams,
          "user_K0LHWwDahklB8kPrwKB2k"
        )
        .then((res) => {
          // document.getElementById("inputinv").value = "";
          setLoadingMail(false);
          setOpenSucces(true);
          console.log(res);
          setOpenDialog(false);
          console.log("REUSIT");
        })
        .catch((err) => {
          console.log(err);
          setOpenDialog(false);
          setLoadingMail(false);
          setOpenError(true);
        });
    }
  }
  const today = new Date();
  const [past, setPast] = useState(false);
  today.setHours(0, 0, 0, 0);
  useEffect(() => {
    GetInvitati();
    const splitDate = data.split(".");

    const dataEveniment = new Date(
      splitDate[2],
      splitDate[1] - 1,
      splitDate[0]
    );
    // dataEveniment.setHours(0, 0, 0, 0);
    if (dataEveniment < today) setPast(true);
  }, []);

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url("${background}")`,
      }}
    >
      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          Eroare!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSucces}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          Chestionar trimis cu succes!
        </Alert>
      </Snackbar>
      <Header />
      <Box
        sx={{
          marginTop: "10vh",
          marginBottom: "5vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgb(255, 255, 255,1)",
          boxShadow: "2px 4px 6px rgba(0, 0, 0, 1)",
          textAlign: "center",
        }}
      >
        {loader && <OverlayLoader />}
        <Dialog open={openDialog} onClose={handleToClose}>
          <DialogTitle>
            {"Alegeți invitații pentru acest eveniment"}
            <Button onClick={handleToClose}>
              <CloseIcon />
            </Button>
          </DialogTitle>
          <DialogContent
            sx={{
              backgroundColor: "white",
            }}
          >
            <List>
              {invitatiSalvati.map((value, index) => {
                const labelId = `checkbox-list-secondary-label-${index}`;

                return (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <Checkbox
                        onChange={handleToggle(value)}
                        checked={checked.indexOf(value) !== -1}
                      />
                    }
                  >
                    <ListItemButton>
                      <ListItemText
                        sx={{ color: "black" }}
                        id={labelId}
                        primary={value.NumeInvitat}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </DialogContent>
          <DialogActions>
            <LoadingButton
              loading={loadingMail}
              autoFocus
              onClick={() => {
                // handleToClose();
                // console.log(checked);
                sendEmail();
                // checked.map((element) => {
                //   console.log(element.NumeInvitat);
                //   console.log(element.RowKey);
                // });
              }}
            >
              Trimite
            </LoadingButton>
          </DialogActions>
        </Dialog>
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "40vh",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "left",
              margin: "1rem",
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
          <Grid item xs={12} sx={{ padding: "2vh" }}>
            <Grid container rowSpacing={3}>
              <Grid item xs={12}>
                {/*Evenimentul nu e trecut*/}
                {!empty && !past ? (
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
                            Nume{" "}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            {" "}
                            Email{" "}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            {" "}
                            Prezență confirmată{" "}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            {" "}
                            Număr persoane{" "}
                          </TableCell>
                          <TableCell> </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {invitatiSalvati.map((element, index) => {
                          // console.log(element);
                          return (
                            <>
                              {element.NumeInvitat != "" ? (
                                <TableRow
                                  sx={{
                                    backgroundColor: "#fffdf3",
                                  }}
                                >
                                  <TableCell>{index + 1}</TableCell>
                                  <TableCell>
                                    <TextField
                                      fullWidth
                                      name="NumeInvitat"
                                      defaultValue={element.NumeInvitat || ""}
                                      variant="standard"
                                      onChange={(e) =>
                                        handleChangeOld(index, e)
                                      }
                                    />
                                  </TableCell>

                                  <TableCell>
                                    <TextField
                                      fullWidth
                                      type="email"
                                      name="EmailInvitat"
                                      defaultValue={element.RowKey || ""}
                                      variant="standard"
                                      onChange={(e) =>
                                        handleChangeOld(index, e)
                                      }
                                      required
                                    />
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      textAlign: "center",
                                    }}
                                  >
                                    <Checkbox
                                      name="ConfirmarePrezenta"
                                      defaultChecked={
                                        element.ConfirmarePrezenta
                                      }
                                      onChange={(e) => {
                                        console.log("value", e.target.checked);
                                        handleChangeOld(index, e);
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      textAlign: "center",
                                    }}
                                  >
                                    <TextField
                                      type="number"
                                      name="NumarPersoane"
                                      variant="filled"
                                      defaultValue={element.NumarPersoane}
                                      onChange={(e) => {
                                        console.log(e);
                                        handleChangeOld(index, e);
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      startIcon={<DeleteOutlineIcon />}
                                      onClick={() => removeFormInv(index)}
                                    ></Button>
                                  </TableCell>
                                </TableRow>
                              ) : null}
                            </>
                          );
                        })}
                        {formValues.map((element, index) => {
                          return (
                            <>
                              {index ? (
                                <TableRow>
                                  <TableCell />
                                  <TableCell>
                                    <TextField
                                      fullWidth
                                      name="NumeInvitat"
                                      value={element.NumeInvitat || ""}
                                      variant="standard"
                                      onChange={(e) => handleChange(index, e)}
                                      required
                                    />
                                  </TableCell>

                                  <TableCell>
                                    <TextField
                                      fullWidth
                                      type="email"
                                      name="EmailInvitat"
                                      value={element.EmailInvitat || ""}
                                      variant="standard"
                                      onChange={(e) => handleChange(index, e)}
                                      required
                                    />
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      textAlign: "center",
                                    }}
                                  >
                                    <Checkbox
                                      name="ConfirmarePrezenta"
                                      defaultChecked={false}
                                      onChange={(e) => handleChange(index, e)}
                                    />
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      textAlign: "center",
                                    }}
                                  >
                                    <TextField
                                      type="number"
                                      name="NumarPersoane"
                                      variant="filled"
                                      defaultValue={element.NumarPersoane}
                                      onChange={(e) => handleChange(index, e)}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    {/* <Checkbox
                              sx={{
                                alignSelf: "center",
                                justifyContent: "center",
                              }}
                              defaultChecked={"false"}
                            /> */}

                                    <Button
                                      startIcon={<DeleteOutlineIcon />}
                                      onClick={() => removeFormFields(index)}
                                    ></Button>
                                  </TableCell>
                                </TableRow>
                              ) : null}
                            </>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : null}
                {/*Evenimentul  e trecut*/}
                {!empty && past ? (
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
                            Nume{" "}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            {" "}
                            Email{" "}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            {" "}
                            Prezență confirmată{" "}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            {" "}
                            Număr persoane{" "}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {invitatiSalvati.map((element, index) => {
                          // console.log(element);
                          return (
                            <>
                              {element.NumeInvitat != "" ? (
                                <TableRow
                                  sx={{
                                    backgroundColor: "#fffdf3",
                                  }}
                                >
                                  <TableCell>{index + 1}</TableCell>
                                  <TableCell>
                                    <TextField
                                      disabled
                                      fullWidth
                                      name="NumeInvitat"
                                      defaultValue={element.NumeInvitat || ""}
                                      variant="standard"
                                      onChange={(e) =>
                                        handleChangeOld(index, e)
                                      }
                                    />
                                  </TableCell>

                                  <TableCell>
                                    <TextField
                                      disabled
                                      fullWidth
                                      type="email"
                                      name="EmailInvitat"
                                      defaultValue={element.RowKey || ""}
                                      variant="standard"
                                      onChange={(e) =>
                                        handleChangeOld(index, e)
                                      }
                                      required
                                    />
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      textAlign: "center",
                                    }}
                                  >
                                    <Checkbox
                                      disabled
                                      name="ConfirmarePrezenta"
                                      defaultChecked={
                                        element.ConfirmarePrezenta
                                      }
                                      onChange={(e) => {
                                        console.log("value", e.target.checked);
                                        handleChangeOld(index, e);
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      textAlign: "center",
                                    }}
                                  >
                                    <TextField
                                      type="number"
                                      disabled
                                      name="NumarPersoane"
                                      variant="filled"
                                      defaultValue={element.NumarPersoane}
                                      onChange={(e) => {
                                        console.log(e);
                                        handleChangeOld(index, e);
                                      }}
                                    />
                                  </TableCell>
                                </TableRow>
                              ) : null}
                            </>
                          );
                        })}
                        {formValues.map((element, index) => {
                          return (
                            <>
                              {index ? (
                                <TableRow>
                                  <TableCell />
                                  <TableCell>
                                    <TextField
                                      fullWidth
                                      name="NumeInvitat"
                                      value={element.NumeInvitat || ""}
                                      variant="standard"
                                      onChange={(e) => handleChange(index, e)}
                                      required
                                    />
                                  </TableCell>

                                  <TableCell>
                                    <TextField
                                      fullWidth
                                      type="email"
                                      name="EmailInvitat"
                                      value={element.EmailInvitat || ""}
                                      variant="standard"
                                      onChange={(e) => handleChange(index, e)}
                                      required
                                    />
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      textAlign: "center",
                                    }}
                                  >
                                    <Checkbox
                                      name="ConfirmarePrezenta"
                                      defaultChecked={false}
                                      onChange={(e) => handleChange(index, e)}
                                    />
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      textAlign: "center",
                                    }}
                                  >
                                    <TextField
                                      type="number"
                                      name="NumarPersoane"
                                      variant="filled"
                                      defaultValue={element.NumarPersoane}
                                      onChange={(e) => handleChange(index, e)}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    {/* <Checkbox
                              sx={{
                                alignSelf: "center",
                                justifyContent: "center",
                              }}
                              defaultChecked={"false"}
                            /> */}

                                    <Button
                                      startIcon={<DeleteOutlineIcon />}
                                      onClick={() => removeFormFields(index)}
                                    ></Button>
                                  </TableCell>
                                </TableRow>
                              ) : null}
                            </>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : null}
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {!past && (
                    <Button
                      sx={{
                        float: "right",
                      }}
                      startIcon={<AddIcon />}
                      onClick={() => {
                        setEmpty(false);
                        addFormFields();
                      }}
                    >
                      Adaugă contact
                    </Button>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {!past && (
                  <LoadingButton
                    type="submit"
                    loading={loading}
                    onClick={() => SendInvitati()}
                    variant="contained"
                  >
                    Salvează lista
                  </LoadingButton>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "1rem",
            }}
          >
            {!past && (
              <Button
                sx={{
                  fontSize: "2vw",
                }}
                type="submit"
                variant="contained"
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                Trimite chestionar{" "}
              </Button>
            )}
          </Grid>
          <Grid item xs={12} sx={{ padding: "2vh" }}>
            {/* <form onSubmit={sendEmail}>
              <Grid container rowSpacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    id="name"
                    name="name"
                    label="Nume"
                    variant="standard"
                    defaultValue={nume}
                  />
                </Grid>

                <Grid item xs={12}>
                  {formValues.map((element, index) => {
                    return (
                      <div>
                        <TextField
                          fullWidth
                          id="inputinv"
                          type="email"
                          name="EmailInvitat"
                          label="Email"
                          variant="standard"
                          value={element.EmailInvitat || ""}
                          onChange={(e) => handleChange(index, e)}
                          required
                        />

                        {index ? (
                          <div className="col-3">
                            <Button
                              startIcon={<DeleteOutlineIcon />}
                              onClick={() => removeFormFields(index)}
                            >
                              Șterge
                            </Button>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}

                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => addFormFields()}
                  >
                    Adaugă email
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="message"
                    name="message"
                    label="Mesaj"
                    multiline
                    rows={5}
                    defaultValue={messageValue}
                    required
                  />
                  <Typography sx={{ color: "red", marginBottom: "1vh" }}>
                    Puteți modifica textul mesajului, dar să nu ștergeți link-ul
                    pentru completarea chestionarului!!
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <LoadingButton
                    loading={loading}
                    type="submit"
                    variant="contained"
                  >
                    Trimite{" "}
                  </LoadingButton>
                </Grid>
              </Grid>
            </form>{" "} */}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
export default SendInvitationsPage;

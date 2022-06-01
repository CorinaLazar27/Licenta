import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import "react-dropdown/style.css";
import emailjs from "emailjs-com";
import Header from "./Header";
import { Container, Grid, Button, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
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
      url: "https://server-licenta.azurewebsites.net/getInvitati",
      data: {
        email: email,
        date: data,
      },
    })
      .then((response) => {
        console.log(response.data.results);
        if (response.data.results.length == 0) setEmpty(true);
        else setInvitatiSalvati(response.data.results);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      })
      .finally(() => setLoader(false));
  }
  const [indexDelete, setIndexDelete] = useState();

  function removeFormInv(i) {
    let newFormValues = [...invitatiSalvati];
    // newFormValues.splice(i, 1);
    setInvitatiSalvati(newFormValues);
    console.log("console.log", invitatiSalvati[i].RowKey);

    setLoader(true);
    axios({
      method: "POST",
      url: "https://server-licenta.azurewebsites.net/deleteinvitat",
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

  async function SendInvitati(e) {
    let formVal = formValues.slice(1);

    console.log("aaaA", formVal);

    console.log("bbbb", invitatiSalvati);

    setLoading(true);
    await axios({
      method: "POST",
      url: "https://server-licenta.azurewebsites.net/invitationList",
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
        setTimeout(() => {
          history.push("/sendinvitationspage");
          history.go(0);
        }, 4000);
        const res = response.data;
        console.log(res);
      })
      .catch((error) => {
        if (error.response) {
          setOpenError(true);
          setLoading(false);
          // setTimeout(window.location.reload(false), 1000);
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
    e.preventDefault();
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
    if (dataEveniment < today) setPast(true);
  }, []);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleDialogClose = () => {
    setOpenDeleteDialog(false);
  };

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
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          Listă actualizată cu succes!
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
          maxWidth: "90vw",
        }}
      >
        {loader && <OverlayLoader />}

        <Dialog
          fullScreen={fullScreen}
          open={openDialog}
          onClose={handleToClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle
            id="responsive-dialog-title"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {"Alegeți invitații la care trimiteți chestionarul"}
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
                sendEmail();
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
              startIcon={<ArrowBackIcon />}
              variant="contained"
              style={{
                backgroundColor: "#2C5E1A",
                color: "white",
                padding: "0.5vh",
              }}
              onClick={() => {
                history.push("/myeventpage");
                history.go(0);
              }}
            >
              Înapoi
            </Button>
          </Grid>
          <form onSubmit={(e) => SendInvitati(e)}>
            <Grid item xs={12} sx={{ padding: "2vh" }}>
              <Grid
                container
                rowSpacing={3}
                sx={{
                  maxWidth: "85vw",
                }}
              >
                <Grid item xs={12}>
                  {/*Evenimentul nu e trecut*/}
                  {!empty && !past ? (
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                                        onChange={(e) => {
                                          handleChangeOld(index, e);
                                        }}
                                        required
                                      />
                                    </TableCell>

                                    <TableCell>
                                      <TextField
                                        fullWidth
                                        type="email"
                                        name="EmailInvitat"
                                        disabled
                                        defaultValue={element.RowKey || ""}
                                        variant="standard"
                                        onChange={(e) =>
                                          handleChangeOld(index, e)
                                        }
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
                                          console.log(
                                            "value",
                                            e.target.checked
                                          );
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
                                        onClick={() => {
                                          setIndexDelete(index);
                                          setOpenDeleteDialog(true);
                                          // removeFormInv(indexDelete);
                                        }}
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
                                          console.log(
                                            "value",
                                            e.target.checked
                                          );
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
                      style={{
                        backgroundColor: "#2C5E1A",
                        color: "white",
                        padding: "0.5vh",
                      }}
                      // onClick={() => SendInvitati()}
                      variant="contained"
                    >
                      Salvează lista
                    </LoadingButton>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </form>
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
                variant="contained"
                style={{
                  backgroundColor: "#2C5E1A",
                  color: "white",
                  padding: "0.5vh",
                }}
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                Trimite chestionar{" "}
              </Button>
            )}
          </Grid>
          <Grid item xs={12} sx={{ padding: "2vh" }}></Grid>
        </Grid>
      </Box>

      <Dialog
        fullScreen={fullScreen}
        open={openDeleteDialog}
        onClose={handleDialogClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
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
            <Grid item xs={9}>
              {`Ești sigur că ștergi invitatul din listă?`}
            </Grid>
            <Grid item xs={3}>
              <Button
                onClick={handleDialogClose}
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
        <DialogContent>
          <DialogContentText>
            După ce ștergi invitatul, va fi șters definitiv din baza de date!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDeleteDialog(false);
              removeFormInv(indexDelete);
            }}
            autoFocus
          >
            Da
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
export default SendInvitationsPage;

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Image/logo.png";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Dropdown from "react-dropdown";

import "react-dropdown/style.css";
import axios from "axios";

import Header from "./Header";
import { Container, Grid, Typography, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Tab } from "material-ui";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import OverlayLoader from "./OverlayLoader";

function InvitatiPage() {
  const history = useHistory();
  const [formValues, setFormValues] = useState([
    { emailInvitat: "", numeInvitat: "" },
  ]);
  const [invitatiSalvati, setInvitatiSalvati] = useState([]);

  const [data, setData] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const email = window.localStorage.getItem("email");
  const [loader, setLoader] = useState(true);
  const [empty, setEmpty] = useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
    setOpen(false);
  };
  async function SendInvitati() {
    let formVal = formValues.slice(1);
    console.log("aaaA", formVal);
    setLoading(true);
    await axios({
      method: "POST",
      url: "/invitationList",
      data: {
        formValues: formVal,
        email: email,
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

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { emailInvitat: "", numeInvitat: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  async function removeFormInv(i) {
    let newFormValues = [...invitatiSalvati];
    newFormValues.splice(i, 1);
    setInvitatiSalvati(newFormValues);

    setLoader(true);
    await axios({
      method: "POST",
      url: "/deleteinvitat",
      data: {
        email: email,
        emailInvitat: invitatiSalvati[i].emailInvitat,
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

  async function GetInvitati() {
    await axios({
      method: "POST",
      url: "/getInvitati",
      data: {
        email: email,
      },
    })
      .then((response) => {
        console.log(response.data.results);
        if (response.data.results.length == 0) setEmpty(true);
        else setInvitatiSalvati(response.data.results);

        console.log("invitatiSalvati", invitatiSalvati);
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
  useEffect(() => {
    GetInvitati();
    console.log("formValues", formValues);
  }, []);
  return (
    <Container
      maxWidth={false}
      sx={{
        postion: "absolute",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        minHeigth: "100vh",
      }}
    >
      <Header />
      {loader && <OverlayLoader />}
      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          Eroare la actualizarea listei!
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
      <Grid container sx={{ marginTop: "10vh" }}>
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
        <Grid item xs={12}>
          <h3>Listă contacte</h3>
        </Grid>

        <Grid item xs={12} sx={{ padding: "2vh" }}>
          <Grid container rowSpacing={3}>
            <Grid item xs={12}>
              {!empty ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell> Nume </TableCell>
                      <TableCell> Email </TableCell>
                      <TableCell> Ștergere</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {invitatiSalvati.map((element, index) => {
                      console.log(element);
                      return (
                        <>
                          {element.numeInvitat != "" ? (
                            <TableRow
                              sx={{
                                backgroundColor: "#fffdf3",
                              }}
                            >
                              <TableCell />
                              <TableCell>
                                <TextField
                                  fullWidth
                                  name="numeInvitat"
                                  value={element.NumeInvitat || ""}
                                  variant="standard"
                                  onChange={(e) => handleChange(index, e)}
                                  readOnly
                                />
                              </TableCell>

                              <TableCell>
                                <TextField
                                  fullWidth
                                  type="email"
                                  name="emailInvitat"
                                  value={element.RowKey || ""}
                                  variant="standard"
                                  onChange={(e) => handleChange(index, e)}
                                  required
                                  readOnly
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
                                  name="numeInvitat"
                                  value={element.numeInvitat || ""}
                                  variant="standard"
                                  onChange={(e) => handleChange(index, e)}
                                  required
                                />
                              </TableCell>

                              <TableCell>
                                <TextField
                                  fullWidth
                                  type="email"
                                  name="emailInvitat"
                                  value={element.emailInvitat || ""}
                                  variant="standard"
                                  onChange={(e) => handleChange(index, e)}
                                  required
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
                                >
                                  Șterge
                                </Button>
                              </TableCell>
                            </TableRow>
                          ) : null}
                        </>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : null}
              <Grid
                item
                xs={12}
                minWidth="50VW"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
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
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                marginTop: "10vh",
              }}
            >
              <LoadingButton
                loading={loading}
                onClick={() => SendInvitati()}
                // type="submit"
                variant="contained"
              >
                Salvează lista
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
export default InvitatiPage;

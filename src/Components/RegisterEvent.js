import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import "react-dropdown/style.css";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Header from "./Header";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";

import { FormikTextField } from "./FormikComponents/FormikTextField";
import { FormikCheckBox } from "./FormikComponents/FormikCheckBox";
import { FormikSelectSimple } from "./FormikComponents/FormikSelectSimple";
import { FormikDatePicker } from "./FormikComponents/FormikDatePicker";
import { LoadingButton, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Footer from "./Footer";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Container, Box, Grid, Typography } from "@mui/material";
import * as Yup from "yup";

function RegisterEventPage() {
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };

  const history = useHistory();
  const email = window.localStorage.getItem("email");

  const [dialogBox, setDialogBox] = useState(Boolean);

  function FormOptions(values) {
    console.log(values.event);
    console.log(values.date);
    setLoading(true);
    axios({
      method: "POST",
      url: "/postform",
      data: {
        email: email,
        event: values.event,
        date: values.date,
        nrguests: values.nrguests,
        location: values.location,
        budget: values.budget,
        liveband: values.liveBand,
        artisticmoment: values.artisticMoment,
        photographer: values.photographer,
        videorecording: values.videoRecording,
        candybar: values.candyBar,
        fruitsbar: values.fruitsBar,
        drinks: values.drinks,
        ringdance: values.ringDance,
      },
    })
      .then((response) => {
        setLoading(false);

        const res = response.data;
        console.log(res);
        if (res == "Done") {
          handleClickToOpen();
          setDialogBox(true);
          console.log(dialogBox);
        }
      })
      .catch((error) => {
        if (error.response) {
          setOpenError(true);
          setLoading(false);
          // setTimeout(window.location.reload(), 8000);
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
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

  const eventsSelectItems = ["Nuntă", "Botez", "Aniversare"];
  const ringDanceSelectItems = ["Dominant", "Restrâns", "Fără"];
  const drinksSelectItems = ["Băuturi la masă", "Bartman"];

  const ValidationsForm = Yup.object().shape({
    event: Yup.string().required("Trebuie aleasă o opțiune!"),
    nrguests: Yup.number()
      .typeError("Introdu doar cifre!")
      .required("Alege numărul invitațiilor"),
    budget: Yup.number().typeError("Introdu doar cifre!"),
  });

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

  const getSize = (width) => {
    if (width < breakpoints.sm) {
      return "18px";
    } else if (width < breakpoints.md) {
      return "20px";
    } else if (width < breakpoints.lg) {
      return "35px";
    } else if (width < breakpoints.xl) {
      return "35px";
    } else return "35px";
  };
  const [size, setSize] = useState(getSize(window.innerWidth));
  const updateDimensionsSize = () => {
    setSize(getSize(window.innerWidth));
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensionsSize);
    return () => window.removeEventListener("resize", updateDimensionsSize);
  }, []);

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

      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          Eroare la crearea evenimentului!
        </Alert>
      </Snackbar>

      <Formik
        initialValues={{
          event: "",
          date: new Date(),
          nrguests: "",
          location: "",
          budget: "",
          liveBand: "",
          artisticMoment: "",
          photographer: "",
          videoRecording: "",
          candyBar: "",
          fruitsBar: "",
          drinks: "",
          ringDance: "",
        }}
        validationSchema={ValidationsForm}
        onSubmit={(values) => {
          values.date = values.date.toLocaleDateString();
          FormOptions(values);
        }}
      >
        <Form>
          <Grid
            container
            columnSpacing={3}
            rowSpacing={5}
            sx={{
              paddingTop: "5em",
              paddingLeft: "5em",
              paddingRight: "5em",
            }}
          >
            <Grid item xs={12}>
              <Typography style={{ fontSize: size }}>
                Înregistrează un eveniment
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormikSelectSimple
                id="event"
                name="event"
                label="Tip eveniment*"
                items={eventsSelectItems}
              />
            </Grid>

            <Grid item xs={columns}>
              <FormikTextField
                id="nrguests"
                label="Număr invitați*"
                name="nrguests"
              />
            </Grid>
            <Grid item xs={columns}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <FormikDatePicker
                  name="date"
                  label="Data evenimentului*"
                  variant="standard"
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={columns}>
              <FormikTextField id="location" label="Locație" name="location" />
            </Grid>

            <Grid item xs={columns}>
              <FormikTextField id="budget" label="Buget (LEI)" name="budget" />
            </Grid>

            <Grid item xs={columns}>
              <Box
                sx={{
                  border: "2px solid",
                  borderColor: "#DCDCDC",
                  borderRadius: 4,
                }}
              >
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  sx={{ marginTop: "1.5vh" }}
                >
                  Trupă live
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <label>
                      <Field type="radio" name="liveBand" value="Da" />
                      Da
                    </label>
                    <label>
                      <Field type="radio" name="liveBand" value="Nu" />
                      Nu
                    </label>
                  </RadioGroup>
                </FormLabel>
              </Box>
            </Grid>

            <Grid item xs={columns}>
              <Box
                sx={{
                  border: "2px solid",
                  borderColor: "#DCDCDC",
                  borderRadius: 4,
                }}
              >
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  sx={{ marginTop: "1.5vh" }}
                >
                  Moment artistic
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <label>
                      <Field type="radio" name="artisticMoment" value="Da" />
                      Da
                    </label>
                    <label>
                      <Field type="radio" name="artisticMoment" value="Nu" />
                      Nu
                    </label>
                  </RadioGroup>
                </FormLabel>
              </Box>
            </Grid>

            <Grid item xs={columns}>
              <Box
                sx={{
                  border: "2px solid",
                  borderColor: "#DCDCDC",
                  borderRadius: 4,
                }}
              >
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  sx={{ marginTop: "1.5vh" }}
                >
                  Fotograf
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <label>
                      <Field type="radio" name="photographer" value="Da" />
                      Da
                    </label>
                    <label>
                      <Field type="radio" name="photographer" value="Nu" />
                      Nu
                    </label>
                  </RadioGroup>
                </FormLabel>
              </Box>
            </Grid>

            <Grid item xs={columns}>
              <Box
                sx={{
                  border: "2px solid",
                  borderColor: "#DCDCDC",
                  borderRadius: 4,
                }}
              >
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  sx={{ marginTop: "1.5vh" }}
                >
                  Înregistrare video
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <label>
                      <Field type="radio" name="videoRecording" value="Da" />
                      Da
                    </label>
                    <label>
                      <Field type="radio" name="videoRecording" value="Nu" />
                      Nu
                    </label>
                  </RadioGroup>
                </FormLabel>
              </Box>
            </Grid>

            <Grid item xs={columns}>
              <Box
                sx={{
                  border: "2px solid",
                  borderColor: "#DCDCDC",
                  borderRadius: 4,
                }}
              >
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  sx={{ marginTop: "1.5vh" }}
                >
                  Candy bar
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <label>
                      <Field type="radio" name="candyBar" value="Da" />
                      Da
                    </label>
                    <label>
                      <Field type="radio" name="candyBar" value="Nu" />
                      Nu
                    </label>
                  </RadioGroup>
                </FormLabel>
              </Box>
            </Grid>

            <Grid item xs={columns}>
              <Box
                sx={{
                  border: "2px solid",
                  borderColor: "#DCDCDC",
                  borderRadius: 4,
                }}
              >
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  sx={{ marginTop: "1.5vh" }}
                >
                  Bar cu fructe
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <label>
                      <Field type="radio" name="fruitsBar" value="Da" />
                      Da
                    </label>
                    <label>
                      <Field type="radio" name="fruitsBar" value="Nu" />
                      Nu
                    </label>
                  </RadioGroup>
                </FormLabel>
              </Box>
            </Grid>
            <Grid item xs={columns}>
              <FormikSelectSimple
                id="drinks"
                name="drinks"
                label="Servire băuturi"
                items={drinksSelectItems}
              />
            </Grid>

            <Grid item xs={columns}>
              <FormikSelectSimple
                id="ringDance"
                name="ringDance"
                label="Ring de dans"
                items={ringDanceSelectItems}
              />
            </Grid>

            <Grid item xs={12}>
              <LoadingButton
                loading={loading}
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "green",
                  hover: {
                    "&:hover": {
                      backgroundColor: "red",
                    },
                  },

                  marginBottom: "3vh",
                }}
              >
                Înregistrează
              </LoadingButton>
            </Grid>
          </Grid>
        </Form>
      </Formik>

      <Dialog open={open} onClose={handleToClose}>
        <DialogTitle>{"Vreti sa invitati oamenii acum?"}</DialogTitle>

        <DialogActions>
          <Button
            onClick={() => history.push("/sendinvitationspage")}
            color="primary"
            autoFocus
          >
            Da
          </Button>
          <Button
            onClick={() => {
              history.push("/myeventpage");
              history.go(0);
            }}
            color="primary"
            autoFocus
          >
            Nu acum
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default RegisterEventPage;

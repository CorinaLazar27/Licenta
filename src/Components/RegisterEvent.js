import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import "react-dropdown/style.css";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Header from "./Header";
import { FormikTextField } from "./FormikComponents/FormikTextField";
import { FormikSelectSimple } from "./FormikComponents/FormikSelectSimple";
import { FormikDatePicker } from "./FormikComponents/FormikDatePicker";
import { LoadingButton, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Box, Grid, Typography } from "@mui/material";
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
      url: "https://server-licenta.azurewebsites.net/postform",
      data: {
        email: email,
        event: values.event,
        date: values.date,
        nrguests: values.nrguests,
        location: values.location,
        judet: values.judet,
        budget: values.budget,
        liveband: values.liveBand,
        artisticmoment: values.artisticMoment,
        photographer: values.photographer,
        videorecording: values.videoRecording,
        candybar: values.candyBar,
        fruitsbar: values.fruitsBar,
        drinks: values.drinks,
        ringdance: values.ringDance,
        opinie: false,
      },
    })
      .then((response) => {
        setLoading(false);
        setOpen(true);
        setTimeout(() => {
          history.push("/myeventpage");
          history.go(0);
        }, 4000);

        const res = response.data;
        console.log(res);
        if (res == "Done") {
          // handleClickToOpen();
          // setDialogBox(true);
          // console.log(dialogBox);
        }
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
  const judetSelectItems = [
    "Alba",
    "Arad",
    "Argeș",
    "Bacău",
    "Bihor",
    "Bistrița Năsăud",
    "Botoșani",
    "Brăila",
    "Brașov",
    "Buzău",
    "Călărași",
    "Caraș Severin",
    "Cluj",
    "Constanța",
    "Covasna",
    "Dâmbovița",
    "Dolj",
    "Galați",
    "Giurgiu",
    "Gorj",
    "Hargita",
    "Hunedoara",
    "Ialomița",
    "Iași",
    "Ilfov",
    "Maramureș",
    "Mehedinti",
    "Mureș",
    "Neamț",
    "Olt",
    "Prahova",
    "Sălaj",
    "Satu mare",
    "Sibiu",
    "Suceava",
    "Teleorman",
    "Timiș",
    "Tulcea",
    "Vâlcea",
    "Vaslui",
    "Vrancea",
  ];
  // const ringDanceSelectItems = ["Dominant", "Restrâns", "Fără"];
  // const drinksSelectItems = ["Băuturi la masă", "Bartman"];

  const ValidationsForm = Yup.object().shape({
    event: Yup.string().required("Trebuie aleasă o opțiune!"),
    nrguests: Yup.number()
      .typeError("Introdu doar cifre!")
      .required("Introdu numărul aproximativ al invitațiilor"),
    budget: Yup.number()
      .typeError("Introdu doar cifre!")
      .required("Introdu bugetul aproximativ alocat evenimentului"),
    judet: Yup.string().required("Trebuie aleasă o opțiune!"),
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

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          Eveniment creat cu succes!
        </Alert>
      </Snackbar>
      <Box
        sx={{
          backgroundColor: "white",
          maxWidth: "80vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Formik
          initialValues={{
            event: "",
            date: new Date(),
            nrguests: "",
            location: "",
            judet: "",
            budget: "",
            liveBand: "",
            artisticMoment: "",
            photographer: "",
            videoRecording: "",
            // candyBar: "",
            // fruitsBar: "",
            // drinks: "",
            // ringDance: "",
          }}
          validationSchema={ValidationsForm}
          onSubmit={(values) => {
            values.date = values.date.toLocaleDateString();
            FormOptions(values);
          }}
        >
          <Form
            sx={{
              backgroundColor: "white",
            }}
          >
            <Grid
              container
              columnSpacing={3}
              rowSpacing={5}
              sx={{
                paddingTop: "1vh",
                paddingLeft: "2vw",
                paddingRight: "2vw",
              }}
            >
              <Grid item xs={12}>
                <Typography style={{ fontSize: size }}>
                  Creează un eveniment
                </Typography>
              </Grid>
              <Grid item xs={columns}>
                <FormikSelectSimple
                  id="event"
                  name="event"
                  label="Tip eveniment*"
                  items={eventsSelectItems}
                />
              </Grid>
              <Grid item xs={columns}>
                <FormikSelectSimple
                  id="judet"
                  name="judet"
                  label="Județ eveniment*"
                  items={judetSelectItems}
                />
              </Grid>

              <Grid item xs={columns}>
                <FormikTextField
                  id="nrguests"
                  label="Numărul aproximativ de invitați*"
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
                <FormikTextField
                  id="budget"
                  label="Bugetul aproximativ alocat(LEI)*"
                  name="budget"
                />
              </Grid>
              <Grid item xs={columns}>
                <FormikTextField
                  id="location"
                  label="Sala de evenimente"
                  name="location"
                />
              </Grid>

              {/* 
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
            </Grid> */}
              <Grid item xs={columns}>
                <FormikTextField id="muzică" label="Muzică" name="liveBand" />
              </Grid>
              {/* <Grid item xs={columns}>
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
            </Grid> */}
              {/* <Grid item xs={columns}>
              <FormikTextField
                id="artisticMoment"
                label="Moment artistic"
                name="artisticMoment"
              />
            </Grid> */}
              {/* 
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
            </Grid> */}
              <Grid item xs={columns}>
                <FormikTextField
                  id="photographer"
                  label="Fotograf"
                  name="photographer"
                />
              </Grid>
              {/* <Grid item xs={columns}>
              <FormikTextField
                id="videoRecording"
                label="Înregistrare video"
                name="videoRecording"
              />
            </Grid> */}
              {/* 
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
            </Grid> */}
              {/* 
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
            </Grid> */}

              <Grid item xs={12}>
                <LoadingButton
                  style={{
                    color: "white",
                    backgroundColor: "#2C5E1A",
                    borderColor: "white",
                  }}
                  loading={loading}
                  type="submit"
                  variant="contained"
                  sx={{
                    // backgroundColor: "green",
                    // hover: {
                    //   "&:hover": {
                    //     backgroundColor: "red",
                    //   },
                    // },

                    marginBottom: "3vh",
                  }}
                >
                  Înregistrează
                </LoadingButton>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Box>
      {/* <Dialog open={open} onClose={handleToClose}>
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
      </Dialog> */}
    </div>
  );
}
export default RegisterEventPage;

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import "react-dropdown/style.css";
import axios from "axios";
import { Formik, Form } from "formik";
import Header from "./Header";
import { FormikTextField } from "./FormikComponents/FormikTextField";
import { FormikSelectSimple } from "./FormikComponents/FormikSelectSimple";
import { FormikDatePicker } from "./FormikComponents/FormikDatePicker";
import { LoadingButton, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Box, Grid, Typography } from "@mui/material";
import * as Yup from "yup";

function RegisterEventPage() {
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const email = window.localStorage.getItem("email");

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
        }, 2000);

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
          marginTop: columns,
          marginBottom: columns - 6,
          maxWidth: "85vw",
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

              <Grid item xs={columns}>
                <FormikTextField id="muzică" label="Muzică" name="liveBand" />
              </Grid>

              <Grid item xs={columns}>
                <FormikTextField
                  id="photographer"
                  label="Fotograf"
                  name="photographer"
                />
              </Grid>

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
    </div>
  );
}
export default RegisterEventPage;

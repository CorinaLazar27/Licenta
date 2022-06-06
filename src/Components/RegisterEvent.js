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
import { LoadingButton } from "@mui/lab";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Box, Grid, Typography, TextField } from "@mui/material";
import * as Yup from "yup";

function RegisterEventPage() {
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dataForm = new Date().toLocaleDateString();
  const [dataBackend, setDataBackend] = useState(new Date());

  const history = useHistory();
  const emailLocalStorage = window.localStorage.getItem("email");
  const [dateValue, setDateValue] = useState(new Date());
  function FormOptions(values) {
    // console.log("AAa", dateValue.toLocaleDateString());
    // alert(dateValue.toLocaleDateString());
    // console.log("aaaa", values.dataEvenimentMobile);
    // console.log("bbbb", values.dataEveniment);
    // console.log(mobile);
    setLoading(true);
    if (mobile) {
      console.log(values.dataEveniment);
      axios({
        method: "POST",
        url: "https://server-licenta.azurewebsites.net/postform",
        data: {
          email: emailLocalStorage,
          event: values.event,
          date: values.dataEveniment,
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
    } else {
      axios({
        method: "POST",
        url: "https://server-licenta.azurewebsites.net/postform",
        data: {
          email: emailLocalStorage,
          event: values.event,
          date: dateValue.toLocaleDateString(),
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

    dataEveniment: Yup.string()
      .required("Introdu data evenimentului")
      .matches(
        /^(?:(?:31(\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
        "Trebuie aleasă o data de tipul zz.ll.zzzz!"
      )
      .when("mobile", {
        is: true,
        then: "Must enter email address",
      }),
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

  const getMobile = (width) => {
    if (width < breakpoints.sm) {
      return true;
    } else if (width < breakpoints.md) {
      return false;
    } else if (width < breakpoints.lg) {
      return false;
    } else if (width < breakpoints.xl) {
      return false;
    } else return false;
  };

  const [mobile, setMobile] = useState(getMobile(window.innerWidth));

  const updateMobile = () => {
    setMobile(getMobile(window.innerWidth));
  };

  useEffect(() => {
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
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
            dataEveniment: "01.01.2022",
            nrguests: "",
            // dataEvenimentMobile: new Date().toLocaleDateString(),
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
            // if (!mobile)
            // values.dataEveniment = values.dataEveniment.toLocaleDateString();
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
                {/* {!mobile && ( */}
                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <FormikDatePicker
                    name="dataEveniment"
                    label="Data evenimentului*"
                    variant="standard"
                  />
                </LocalizationProvider> */}
                {/* <FormikTextField
                  type="date"
                  label="Data evenimentului*"
                  name="dataEveniment"
                /> */}
                {!mobile && (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Data evenimentului*"
                      openTo="year"
                      views={["year", "month", "day"]}
                      value={dateValue}
                      onChange={(newValue) => {
                        setDateValue(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField fullWidth {...params} />
                      )}
                    />
                  </LocalizationProvider>
                )}
                {mobile && (
                  <FormikTextField
                    name="dataEveniment"
                    placeholder="zz.ll.aaaa"
                    label="Data evenimentului*"
                  ></FormikTextField>
                )}
                {/* )} */}
                {/* {mobile && (
                  <FormikTextField
                    label="Data evenimentuluiii*"
                    name="dataEvenimentMobile"
                  />
                )} */}
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

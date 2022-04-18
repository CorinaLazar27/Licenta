import React, { useState } from "react";
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
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Footer from "./Footer";

import { Container, Box, Grid, Typography } from "@mui/material";
import * as Yup from "yup";

function RegisterEventPage() {
  const [open, setOpen] = React.useState(false);

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };

  const history = useHistory();
  const email = window.localStorage.getItem("email");
  // const [event, setEvent] = useState("");
  // const [date, setDate] = useState("");
  // const [nrguests, setNrGuests] = useState("");
  // const [location, setLocation] = useState("");
  // const [budget, setBudget] = useState("");
  // const [liveBand, setLiveBand] = useState("");
  // const [artisticMoment, setArtisticMoment] = useState("");
  // const [photographer, setPhotographer] = useState("");
  // const [videoRecording, setVideoRecording] = useState("");
  // const [candyBar, setCandyBar] = useState("");
  // const [fruitsBar, setfruitsBar] = useState("");
  // const [drinks, setDrinks] = useState("");
  // const [ringDance, setRingDance] = useState("");
  const [dialogBox, setDialogBox] = useState(Boolean);

  function FormOptions(values) {
    console.log(values.event);
    console.log(values.date);
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
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  const eventsSelectItems = ["Nunta", "Botez", "Aniversare"];
  const ringDanceSelectItems = ["Dominant", "Restrans", "Fara"];
  const drinksSelectItems = ["Bauturi la masa", "Bartman"];

  const ValidationsForm = Yup.object().shape({
    event: Yup.string().required("Trebuie aleasă o opțiune!"),
    nrguests: Yup.number().required("Alege numărul invitațiilor"),
    budget: Yup.number(),
  });

  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundSize: "cover",
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
      }}
    >
      <Header />
      <Footer />

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
          // values.date = values.date.toLocaleDateString();
          FormOptions(values);
        }}
      >
        <Form>
          <Grid
            container
            columnSpacing={3}
            rowSpacing={5}
            sx={{
              padding: "2em",
            }}
          >
            <Grid item xs={12} sx={{ marginTop: "7vh" }}>
              <Typography variant="h4">Înregistrează un eveniment</Typography>
            </Grid>
            <Grid item xs={12}>
              {" "}
              <FormikSelectSimple
                id="event"
                name="event"
                label="Tip eveniment*"
                items={eventsSelectItems}
              />
            </Grid>

            <Grid item xs={6}>
              <FormikTextField
                id="nrguests"
                label="Număr invitați*"
                name="nrguests"
              />
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <FormikDatePicker
                  name="date"
                  label="Data evenimentului*"
                  variant="standard"
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={6}>
              <FormikTextField id="location" label="Locație" name="location" />
            </Grid>

            <Grid item xs={6}>
              <FormikTextField id="budget" label="Buget (LEI)" name="budget" />
            </Grid>

            <Grid item xs={6}>
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

            <Grid item xs={6}>
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

            <Grid item xs={6}>
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

            <Grid item xs={6}>
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

            <Grid item xs={6}>
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

            <Grid item xs={6}>
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
            <Grid item xs={6}>
              <FormikSelectSimple
                id="drinks"
                name="drinks"
                label="Servire băuturi"
                items={drinksSelectItems}
              />
            </Grid>

            <Grid item xs={6}>
              <FormikSelectSimple
                id="ringDance"
                name="ringDance"
                label="Ring de dans"
                items={ringDanceSelectItems}
              />
            </Grid>

            <Grid item xs={12} sx={{ marginBottom: "5vh" }}>
              <Button type="submit" variant="contained">
                Înregistrează
              </Button>
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
    </Container>
  );
}
export default RegisterEventPage;

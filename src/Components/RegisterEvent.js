import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import "react-dropdown/style.css";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Header from "./Header";
import { Container, Grid, Box } from "@material-ui/core";
import { FormikTextField } from "./FormikComponents/FormikTextField";
import { FormikCheckBox } from "./FormikComponents/FormikCheckBox";
import { FormikSelectSimple } from "./FormikComponents/FormikSelectSimple";
import { FormikDatePicker } from "./FormikComponents/FormikDatePicker";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";

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
  const [event, setEvent] = useState("");
  const [date, setDate] = useState("");
  const [nrguests, setNrGuests] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [liveBand, setLiveBand] = useState("");
  const [artisticMoment, setArtisticMoment] = useState("");
  const [photographer, setPhotographer] = useState("");
  const [videoRecording, setVideoRecording] = useState("");
  const [candyBar, setCandyBar] = useState("");
  const [fruitsBar, setfruitsBar] = useState("");
  const [drinks, setDrinks] = useState("");
  const [ringDance, setRingDance] = useState("");
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

  return (
    <div className="nav">
      <Header />

      <div className="home1">
        <h3>Inregistreaza un eveniment</h3>
        <br></br>
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
          onSubmit={(values) => {
            values.date = values.date.toLocaleDateString();
            FormOptions(values);
          }}
        >
          <Form>
            <Grid
              container
              spacing={3}
              columnSpacing={5}
              rowSpacing={4}
              sx={{
                padding: "2em",
              }}
            >
              <Grid item xs={12}>
                {" "}
                <FormikSelectSimple
                  id="event"
                  name="event"
                  label="Tip eveniment"
                  items={eventsSelectItems}
                />
              </Grid>

              <Grid item xs={6}>
                <FormikTextField
                  id="nrguests"
                  label="Numar invitati"
                  name="nrguests"
                />
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <FormikDatePicker
                    name="date"
                    label="Data evenimentului"
                    variant="standard"
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={6}>
                <FormikTextField
                  id="location"
                  label="Locatie favorita"
                  name="location"
                />
              </Grid>

              <Grid item xs={6}>
                <FormikTextField id="budget" label="Buget" name="budget" />
              </Grid>

              <Grid item xs={6}>
                <Box
                  sx={{
                    border: "2px solid",
                    borderColor: "#DCDCDC",
                    borderRadius: 4,
                  }}
                >
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Trupa live
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
                  <FormLabel id="demo-row-radio-buttons-group-label">
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
                  <FormLabel id="demo-row-radio-buttons-group-label">
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
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Inregistrare video
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
                  <FormLabel id="demo-row-radio-buttons-group-label">
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
                  <FormLabel id="demo-row-radio-buttons-group-label">
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
                  label="Servire bauturi"
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

              <Grid item xs={12}>
                <Button type="submit" variant="standard">
                  Inregistreaza
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
              onClick={() => history.push("/myeventpage")}
              color="primary"
              autoFocus
            >
              Nu acum
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
export default RegisterEventPage;

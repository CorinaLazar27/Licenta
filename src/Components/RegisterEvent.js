import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Image/logo.png";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Dropdown from "react-dropdown";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
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
import { Container, Grid } from "@material-ui/core";
import { textAlign } from "@mui/system";

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

  function ShowFormValues() {
    console.log("----------------------------");
    console.log("Eveniment:" + event);
    console.log("Data:" + date);
    console.log("Numar invitati:" + nrguests);
    console.log("Locatie:" + location);
    console.log("Buget:" + budget);
    console.log("Band Live:" + liveBand);
    console.log("Moment artistic:" + artisticMoment);
    console.log("Fotograf:" + photographer);
    console.log("Video:" + videoRecording);
    console.log("Candy Bar:" + candyBar);
    console.log("Bar fructe:" + fruitsBar);
    console.log("Bauturi:" + drinks);
    console.log("Ring dans:" + ringDance);
    console.log("----------------------------");
    FormOptions();

    //history.push("myeventpage");
  }

  return (
    <div className="nav">
      <Header />

      <div className="home1">
        <ScrollUpButton
          StopPosition={0}
          ShowAtPosition={150}
          EasingType="easeOutCubic"
          AnimationDuration={2}
          ContainerClassName="ScrollUpButton__Container"
          TransitionClassName="ScrollUpButton__Toggled"
          style={{}}
          ToggledStyle={{}}
        />

        <h3>Inregistreaza un eveniment</h3>

        <Formik
          initialValues={{
            event: "",
            date: "",
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
            FormOptions(values);
          }}
        >
          <Form>
            <Container display="flex" alignItems="center">
              <Grid
                container
                columnSpacing={10}
                sx={{
                  p: 1,
                }}
              >
                <Grid item xs={6}>
                  {" "}
                  <label htmlFor="event">Tipul evenimentului</label>
                </Grid>
                <Grid item xs={6}>
                  {" "}
                  <Field
                    as="select"
                    name="event"
                    id="event"
                    placeholder="Select an option"
                  >
                    <option value="">Alege optiunea</option>
                    <option value="Wedding">Nunta</option>
                    <option value="Christening">Botez</option>
                    <option value="Zi de nastere">Zi de nastere</option>
                  </Field>
                </Grid>

                <Grid item xs={6}>
                  <label>Numarul invitatilor</label>
                </Grid>
                <Grid item xs={6}>
                  <Field id="nrguests" type="nrguests" name="nrguests" />
                </Grid>
                <Grid item xs={6}>
                  <label>Data</label>
                </Grid>
                <Grid item xs={6}>
                  <Field id="date" type="date" name="date" required />
                </Grid>
                <Grid item xs={6}>
                  <label>Locatie favorita</label>
                </Grid>
                <Grid item xs={6}>
                  <input id="location" type="location" name="location" />
                </Grid>
                <Grid item xs={6}>
                  <label htmlFor="budget">Buget</label>
                </Grid>
                <Grid item xs={6}>
                  <input id="budget" type="budget" name="budget" />
                </Grid>

                <Grid item xs={6}>
                  <label htmlFor="band">Band live</label>
                </Grid>
                <Grid item xs={6}>
                  <input
                    type="radio"
                    value="Yes"
                    name="band"
                    id="band"
                    className="radio"
                  />
                  Yes
                  <input
                    type="radio"
                    value="No"
                    name="band"
                    id="band"
                    className="radio"
                    onChange={(event) => {
                      setLiveBand(event.target.value);
                    }}
                  />{" "}
                  No
                </Grid>
                <Grid item xs={6}>
                  <label htmlFor="artisticmoment">Moment artistic</label>
                </Grid>
                <Grid item xs={6}>
                  <input
                    id="artisticmoment"
                    type="radio"
                    value="Yes"
                    name="artisticmoment"
                    className="radio"
                    onChange={(event) => {
                      setArtisticMoment(event.target.value);
                    }}
                  />{" "}
                  Yes
                  <input
                    id="artisticmoment"
                    type="radio"
                    value="No"
                    name="artisticmoment"
                    className="radio"
                  />{" "}
                  No
                </Grid>
                <Grid item xs={6}>
                  <label htmlFor="photographer">Fotograf</label>
                </Grid>
                <Grid item xs={6}>
                  <input
                    id="photographer"
                    type="radio"
                    value="Yes"
                    name="photographer"
                    className="radio"
                  />{" "}
                  Yes
                  <input
                    id="photographer"
                    type="radio"
                    value="No"
                    name="photographer"
                    className="radio"
                  />{" "}
                  No
                </Grid>
                <Grid item xs={6}>
                  <label htmlFor="videorecording">Inregistrare video</label>
                </Grid>
                <Grid item xs={6}>
                  <input
                    id="videorecording"
                    type="radio"
                    value="Yes"
                    name="videorecording"
                    className="radio"
                  />{" "}
                  Yes
                  <input
                    id="videorecording"
                    type="radio"
                    value="No"
                    name="videorecording"
                    className="radio"
                  />{" "}
                  No
                </Grid>
                <Grid item xs={6}>
                  <label htmlFor="candybar">Candy Bar</label>
                </Grid>
                <Grid item xs={6}>
                  <input
                    id="candybar"
                    type="radio"
                    value="Yes"
                    name="candybar"
                    className="radio"
                  />{" "}
                  Yes
                  <input
                    id="candybar"
                    type="radio"
                    value="No"
                    name="candybar"
                    className="radio"
                  />{" "}
                  No
                </Grid>
                <Grid item xs={6}>
                  <label htmlFor="fruitsbar">Bar cu fructe</label>
                </Grid>
                <Grid item xs={6}>
                  <input
                    id="fruitsbar"
                    type="radio"
                    value="Yes"
                    name="fruitsbar"
                    className="radio"
                  />{" "}
                  Yes
                  <input
                    id="fruitsbar"
                    type="radio"
                    value="No"
                    name="fruitsbar"
                    className="radio"
                  />{" "}
                  No
                </Grid>
                <Grid item xs={6}>
                  <label htmlFor="drinks">Bauturi</label>
                </Grid>
                <Grid item xs={6}>
                  <select
                    name="drinks"
                    id="drinks"
                    placeholder="Select an option"
                  >
                    <option value="">Alege optiunea</option>
                    <option value="At the table">La masa</option>
                    <option value="Bar with bartender">Bar cu bartman</option>
                  </select>
                </Grid>
                <Grid item xs={6}>
                  <label htmlFor="ringdance">Ring de dans</label>
                </Grid>
                <Grid item xs={6}>
                  <select
                    name="ringdance"
                    id="ringdance"
                    placeholder="Select an option"
                  >
                    <option value="">Alege optiunea</option>
                    <option value="Dominant">Dominant</option>
                    <option value="Restricted">Restrans</option>
                  </select>
                  <br></br>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="outlined">
                    Inregistreaza
                  </Button>
                </Grid>
              </Grid>
            </Container>
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

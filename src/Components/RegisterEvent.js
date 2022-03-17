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

import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Header from "./Header";

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

  function FormOptions() {
    axios({
      method: "POST",
      url: "/postform",
      data: {
        email: email,
        event: event,
        date: date,
        nrguests: nrguests,
        location: location,
        budget: budget,
        liveband: liveBand,
        artisticmoment: artisticMoment,
        photographer: photographer,
        videorecording: videoRecording,
        candybar: candyBar,
        fruitsbar: fruitsBar,
        drinks: drinks,
        ringdance: ringDance,
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
  var mainListDiv = document.getElementById("mainListDiv"),
    mediaButton = document.getElementById("mediaButton");

  /*mediaButton.onclick = function () {
  
  "use strict";
  
  mainListDiv.classList.toggle("show_list");
  mediaButton.classList.toggle("active");

};*/
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
        <form className="form1">
          <h3>Inregistreaza un eveniment</h3>
          <br></br>
          <div className="input-group1">
            <label htmlFor="event">Tipul evenimentului</label>

            <select
              name="event"
              id="event"
              placeholder="Select an option"
              required
              onChange={(event) => {
                setEvent(event.target.value);
              }}
            >
              <option value="">Alege optiunea</option>
              <option value="Wedding">Nunta</option>
              <option value="Christening">Botez</option>
              <option value="Birthday">Zi de nastere</option>
            </select>
          </div>

          <div className="input-group1">
            <label>Numarul invitatilor</label>
            <input
              id="nrguests"
              type="nrguests"
              name="nrguests"
              onChange={(event) => {
                setNrGuests(event.target.value);
              }}
            />
          </div>
          <div className="input-group1">
            <label>Data</label>
            <input
              id="date"
              type="date"
              name="date"
              onChange={(event) => {
                setDate(event.target.value);
              }}
              required
            />
          </div>
          <div className="input-group1">
            <label>Locatie favorita</label>
            <input
              id="location"
              type="location"
              name="location"
              onChange={(event) => {
                setLocation(event.target.value);
              }}
            />
          </div>

          <div className="input-group1">
            <label htmlFor="budget">Buget</label>
            <input
              id="budget"
              type="budget"
              name="budget"
              onChange={(event) => {
                setBudget(event.target.value);
              }}
            />
          </div>

          <div className="input-group1">
            <label htmlFor="band">Band live</label>
            <input
              type="radio"
              value="Yes"
              name="band"
              id="band"
              className="radio"
              onChange={(event) => {
                setLiveBand(event.target.value);
              }}
            />{" "}
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
          </div>
          <div className="input-group1">
            <label htmlFor="artisticmoment">Moment artistic</label>
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
              onChange={(event) => {
                setArtisticMoment(event.target.value);
              }}
            />{" "}
            No
          </div>
          <div className="input-group1">
            <label htmlFor="photographer">Fotograf</label>
            <input
              id="photographer"
              type="radio"
              value="Yes"
              name="photographer"
              className="radio"
              onChange={(event) => {
                setPhotographer(event.target.value);
              }}
            />{" "}
            Yes
            <input
              id="photographer"
              type="radio"
              value="No"
              name="photographer"
              className="radio"
              onChange={(event) => {
                setPhotographer(event.target.value);
              }}
            />{" "}
            No
          </div>
          <div className="input-group1">
            <label htmlFor="videorecording">Inregistrare video</label>
            <input
              id="videorecording"
              type="radio"
              value="Yes"
              name="videorecording"
              className="radio"
              onChange={(event) => {
                setVideoRecording(event.target.value);
              }}
            />{" "}
            Yes
            <input
              id="videorecording"
              type="radio"
              value="No"
              name="videorecording"
              className="radio"
              onChange={(event) => {
                setVideoRecording(event.target.value);
              }}
            />{" "}
            No
          </div>
          <div className="input-group1">
            <label htmlFor="candybar">Candy Bar</label>
            <input
              id="candybar"
              type="radio"
              value="Yes"
              name="candybar"
              className="radio"
              onChange={(event) => {
                setCandyBar(event.target.value);
              }}
            />{" "}
            Yes
            <input
              id="candybar"
              type="radio"
              value="No"
              name="candybar"
              className="radio"
              onChange={(event) => {
                setCandyBar(event.target.value);
              }}
            />{" "}
            No
          </div>
          <div className="input-group1">
            <label htmlFor="fruitsbar">Bar cu fructe</label>
            <input
              id="fruitsbar"
              type="radio"
              value="Yes"
              name="fruitsbar"
              className="radio"
              onChange={(event) => {
                setfruitsBar(event.target.value);
              }}
            />{" "}
            Yes
            <input
              id="fruitsbar"
              type="radio"
              value="No"
              name="fruitsbar"
              className="radio"
              onChange={(event) => {
                setfruitsBar(event.target.value);
              }}
            />{" "}
            No
          </div>
          <div className="input-group1">
            <label htmlFor="drinks">Bauturi</label>
            <select
              name="drinks"
              id="drinks"
              placeholder="Select an option"
              onChange={(event) => {
                setDrinks(event.target.value);
              }}
            >
              <option value="">Alege optiunea</option>
              <option value="At the table">La masa</option>
              <option value="Bar with bartender">Bar cu bartman</option>
            </select>
          </div>
          <div className="input-group1">
            <label htmlFor="ringdance">Ring de dans</label>

            <select
              name="ringdance"
              id="ringdance"
              placeholder="Select an option"
              onChange={(event) => {
                setRingDance(event.target.value);
              }}
            >
              <option value="">Alege optiunea</option>
              <option value="Dominant">Dominant</option>
              <option value="Restricted">Restrans</option>
            </select>
            <br></br>
          </div>
        </form>

        <button className="secondary" onClick={() => ShowFormValues()}>
          Inregistreaza evenimentul
        </button>

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

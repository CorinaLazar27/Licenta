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
import $ from "jquery";
import Header from "./Header";

function EditFormPage() {
  const history = useHistory();
  const event = window.localStorage.getItem("eveniment");
  const email = window.localStorage.getItem("email");
  const location = window.localStorage.getItem("locatie");
  const date = window.localStorage.getItem("dataeveniment");
  const ringDance = window.localStorage.getItem("ringdans");
  const drinks = window.localStorage.getItem("bauturi");
  const fruitsbar = window.localStorage.getItem("fruitsbar");
  const candybar = window.localStorage.getItem("candybar");
  const video = window.localStorage.getItem("video");
  const photographer = window.localStorage.getItem("fotograf");
  const artisticmoment = window.localStorage.getItem("momentartistic");
  const budget = window.localStorage.getItem("buget");
  const guests = window.localStorage.getItem("invitati");
  const liveband = window.localStorage.getItem("liveband");

  window.onload = function exampleFunction() {
    document.getElementById("saveButton").style.visibility = "hidden";
    document.getElementById("editButton").style.visibility = "visible";
  };
  $(document).ready(function () {
    document.getElementById("saveButton").style.visibility = "hidden";
    document.getElementById("editButton").style.visibility = "visible";
  });

  function UnblockInputs() {
    document.getElementById("location").readOnly = false;
    document.getElementById("budget").readOnly = false;
    document.getElementById("numberofguests").readOnly = false;
    document.getElementById("liveband").readOnly = false;
    document.getElementById("artisticmoment").readOnly = false;
    document.getElementById("photographer").readOnly = false;
    document.getElementById("video").readOnly = false;
    document.getElementById("candybar").readOnly = false;
    document.getElementById("fruitsbar").readOnly = false;
    document.getElementById("drinks").readOnly = false;
    document.getElementById("ringDance").readOnly = false;

    document.getElementById("saveButton").style.visibility = "visible";
    document.getElementById("editButton").style.visibility = "hidden";
  }

  function UpdateForm() {
    document.getElementById("saveButton").style.visibility = "hidden";
    document.getElementById("editButton").style.visibility = "visible";

    document.getElementById("location").readOnly = true;
    document.getElementById("budget").readOnly = true;
    document.getElementById("numberofguests").readOnly = true;
    document.getElementById("liveband").readOnly = true;
    document.getElementById("artisticmoment").readOnly = true;
    document.getElementById("photographer").readOnly = true;
    document.getElementById("video").readOnly = true;
    document.getElementById("candybar").readOnly = true;
    document.getElementById("fruitsbar").readOnly = true;
    document.getElementById("drinks").readOnly = true;
    document.getElementById("ringDance").readOnly = true;

    axios({
      method: "POST",
      url: "/updateform",
      data: {
        email: email,
        event: event,
        date: date,
        nrguests: window.localStorage.getItem("invitati"),
        location: window.localStorage.getItem("locatie"),
        budget: window.localStorage.getItem("buget"),
        liveband: window.localStorage.getItem("liveband"),
        artisticmoment: window.localStorage.getItem("momentartistic"),
        photographer: window.localStorage.getItem("fotograf"),
        videorecording: window.localStorage.getItem("video"),
        candybar: window.localStorage.getItem("candybar"),
        fruitsbar: window.localStorage.getItem("fruitsbar"),
        drinks: window.localStorage.getItem("bauturi"),
        ringdance: window.localStorage.getItem("ringdans"),
      },
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        if (res == "Done") {
          console.log("dONE");
          history.push("/myeventpage");
          history.go(0);
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

  return (
    <div className="nav">
      <Header />

      <div className="home1">
        <hr className="mt-0 mb-4" />
        <div className="row">
          <div className="col-xl-16">
            <div className="card mb-4">
              <div className="card-header">{event}</div>
              <div className="card-body">
                <form>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="location">
                        Locatie
                      </label>
                      <input
                        className="form-control"
                        id="location"
                        type="text"
                        defaultValue={location}
                        onChange={(event) =>
                          window.localStorage.setItem(
                            "locatie",
                            event.target.value
                          )
                        }
                        readOnly
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="budget">
                        Buget
                      </label>
                      <input
                        className="form-control"
                        id="budget"
                        type="text"
                        name="budget"
                        defaultValue={budget}
                        onChange={(event) =>
                          window.localStorage.setItem(
                            "buget",
                            event.target.value
                          )
                        }
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="date">
                        Date
                      </label>
                      <input
                        className="form-control"
                        id="date"
                        type="date"
                        defaultValue={date}
                        readOnly
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="numberofguests">
                        Numar invitati
                      </label>
                      <input
                        className="form-control"
                        id="numberofguests"
                        type="text"
                        defaultValue={guests}
                        onChange={(event) =>
                          window.localStorage.setItem(
                            "invitati",
                            event.target.value
                          )
                        }
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="liveband">
                        Trupa live
                      </label>
                      <input
                        className="form-control"
                        id="liveband"
                        defaultValue={liveband}
                        onChange={(event) =>
                          window.localStorage.setItem(
                            "liveband",
                            event.target.value
                          )
                        }
                        readOnly
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="artisticmoment">
                        Moment artistic
                      </label>
                      <input
                        className="form-control"
                        id="artisticmoment"
                        name="birthday"
                        defaultValue={artisticmoment}
                        onChange={(event) =>
                          window.localStorage.setItem(
                            "momentartistic",
                            event.target.value
                          )
                        }
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="photographer">
                        Fotograf
                      </label>
                      <input
                        className="form-control"
                        id="photographer"
                        defaultValue={photographer}
                        onChange={(event) =>
                          window.localStorage.setItem(
                            "fotograf",
                            event.target.value
                          )
                        }
                        readOnly
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="video">
                        Inregistrare video
                      </label>
                      <input
                        className="form-control"
                        id="video"
                        name="birthday"
                        defaultValue={video}
                        onChange={(event) =>
                          window.localStorage.setItem(
                            "video",
                            event.target.value
                          )
                        }
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="candybar">
                        Candy Bar
                      </label>
                      <input
                        className="form-control"
                        id="candybar"
                        defaultValue={candybar}
                        onChange={(event) =>
                          window.localStorage.setItem(
                            "candybar",
                            event.target.value
                          )
                        }
                        readOnly
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="fruitsbar">
                        Bar cu fructe
                      </label>
                      <input
                        className="form-control"
                        id="fruitsbar"
                        name="fruitsbar"
                        defaultValue={fruitsbar}
                        onChange={(event) =>
                          window.localStorage.setItem(
                            "fruitsbar",
                            event.target.value
                          )
                        }
                        readOnly
                      />
                      {/*  <select name="fruitsbar" id="fruitsbar" defaultValue={fruitsbar}
                                onChange={(event) => {window.localStorage.setItem('fruitsbar',event.target.value)}}>
                            <option value="">Select your option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            readOnly
                            </select>*/}
                    </div>
                  </div>

                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="drinks">
                        Drinks
                      </label>
                      <input
                        className="form-control"
                        id="drinks"
                        defaultValue={drinks}
                        onChange={(event) =>
                          window.localStorage.setItem(
                            "bauturi",
                            event.target.value
                          )
                        }
                        readOnly
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="ringDance">
                        Ring dans
                      </label>
                      <input
                        className="form-control"
                        id="ringDance"
                        name="ringDance"
                        defaultValue={ringDance}
                        onChange={(event) =>
                          window.localStorage.setItem(
                            "ringdans",
                            event.target.value
                          )
                        }
                        readOnly
                      />
                    </div>
                  </div>

                  <button
                    id="saveButton"
                    className="btn btn-primary"
                    type="button"
                    onClick={() => UpdateForm()}
                  >
                    Salvare schimbari
                  </button>
                </form>
                <button
                  id="editButton"
                  className="btn btn-primary"
                  type="button"
                  onClick={() => UnblockInputs()}
                >
                  Edit
                </button>
                <br></br>
                <button
                  id="editButton"
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => history.push("/sendinvitationspage")}
                >
                  Trimite invitatii
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditFormPage;

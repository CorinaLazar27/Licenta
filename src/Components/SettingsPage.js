import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Image/logo.png";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Dropdown from "react-dropdown";

import "react-dropdown/style.css";
import axios from "axios";
import $ from "jquery";

import emailjs from "emailjs-com";
import Header from "./Header";

function SettingsPage() {
  const email = window.localStorage.getItem("email");
  const name = window.localStorage.getItem("nume");
  const date = window.localStorage.getItem("data");
  const password = window.localStorage.getItem("parola");
  const location = window.localStorage.getItem("locatie");
  const phonenumber = window.localStorage.getItem("numartelefon");

  function sendEmail(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_n4e6ik8",
        "template_ent1jts",
        e.target,
        "user_K0LHWwDahklB8kPrwKB2k"
      )
      .then((res) => {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("subject").value = "";
        document.getElementById("message").value = "";
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  function UpdateProfile() {
    axios({
      method: "POST",
      url: "/updateprofile",
      data: {
        email: email,
        name: name,
        password: newpassword,
        date: date,
        location: location,
        phonenumber: phonenumber,
      },
    })
      .then((response) => {
        console.log(response.data);
        if (response.data == "Done") notificare();
      })
      .catch((error) => {
        eroare();
        if (error.response) {
          console.log(error);
          // console.log(error.response)
          // console.log(error.response.status)
          // console.log(error.response.headers)
        }
      });
  }

  const [newpassword, setNewPassword] = useState("");

  $(document).ready(function () {
    // Hide the div
    $("#notesucces").hide();
    $("#note").hide();
  });
  function notificare() {
    // Show the div in 5s
    $("#notesucces").show();
    setTimeout(function () {
      $("#notesucces").fadeOut("fast");
    }, 3000); // <-- time in milliseconds
  }
  function eroare() {
    // Show the div in 5s
    $("#note").show();
    setTimeout(function () {
      $("#notes").fadeOut("fast");
    }, 3000); // <-- time in milliseconds
  }

  return (
    <div className="nav">
      <Header />

      <div className="home1">
        <h3>Setari</h3>
        <br></br>
        <div id="accordion">
          <div class="card">
            <div class="card-header" id="headingOne">
              <h5 class="mb-0">
                <button
                  class="btn"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Schimba parola
                </button>
              </h5>
            </div>

            <div
              id="collapseOne"
              class="collapse"
              aria-labelledby="headingOne"
              data-parent="#accordion"
            >
              <div class="card-body">
                <div id="notesucces">Parola a fost schimbata cu succes!</div>
                <div id="note">A aparut o eroare la schimbarea parolei!</div>

                <div className="input-group1">
                  <label>Parola curenta</label>
                  <input
                    id="newpassword"
                    type="password"
                    onChange={(event) => setNewPassword(event.target.value)}
                  ></input>
                </div>

                <div className="input-group1">
                  <label>Parola noua</label>
                  <input
                    id="newpassword"
                    type="password"
                    onChange={(event) => {
                      setNewPassword(event.target.value);
                      window.localStorage.setItem("parola", event.target.value);
                    }}
                  ></input>
                </div>

                {/* <div className="input-group1">
       <label>Confirm password</label>
       <input 
       id="newpassword"
       type="password"
       onChange={(event) => setNewPassword(event.target.value)
       }></input>
       </div> */}

                <button
                  className="btn btn-primary"
                  onClick={() => UpdateProfile()}
                >
                  Schimba
                </button>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="headingTwo">
              <h5 class="mb-0">
                <button
                  class="btn  collapsed"
                  data-toggle="collapse"
                  data-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Despre noi
                </button>
              </h5>
            </div>
            <div
              id="collapseTwo"
              class="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordion"
            >
              <div class="card-body"></div>
            </div>
          </div>

          <div class="card">
            <div class="card-header" id="headingThree">
              <h5 class="mb-0">
                <button
                  class="btn  collapsed"
                  data-toggle="collapse"
                  data-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Ajutor
                </button>
              </h5>
            </div>
            <div
              id="collapseThree"
              class="collapse"
              aria-labelledby="headingThree"
              data-parent="#accordion"
            >
              <div class="card-body">
                <section class="mb-3">
                  <h3 class="h1-responsive font-weight-bold text-center my-4">
                    Contacteaza-ne
                  </h3>

                  <p class="text-center w-responsive mx-auto ">
                    Ai intrebari? Te rugam nu ezita sa ne contactezi! Echipa
                    noastra iti va raspunde cat de repede poate.
                  </p>

                  <div class="row">
                    <div class="col-md-9 mb-md-0 mb-5">
                      <form
                        id="contact-form"
                        name="contact-form"
                        onSubmit={sendEmail}
                      >
                        <div class="row">
                          <div class="col-md-6">
                            <div class="md-form mb-0">
                              <input
                                type="text"
                                id="name"
                                name="name"
                                class="form-control"
                              />
                              <label for="name" class="">
                                Numele tau
                              </label>
                            </div>
                          </div>

                          <div class="col-md-6">
                            <div class="md-form mb-0">
                              <input
                                type="text"
                                id="email"
                                name="email"
                                class="form-control"
                              />
                              <label for="email" class="">
                                Adresa ta de email
                              </label>
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-md-12">
                            <div class="md-form mb-0">
                              <input
                                type="text"
                                id="subject"
                                name="subject"
                                class="form-control"
                              />
                              <label for="subject" class="">
                                Subiect
                              </label>
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-md-12">
                            <div class="md-form">
                              <textarea
                                type="text"
                                id="message"
                                name="message"
                                rows="2"
                                class="form-control md-textarea"
                              ></textarea>
                              <label for="message">Mesajul tau</label>
                            </div>
                          </div>
                        </div>
                        <div class="text-center text-md-left">
                          <button
                            type="submit"
                            class="btn btn-outline-secondary"
                            onclick="document.getElementById('contact-form').submit();"
                          >
                            Trimite
                          </button>
                        </div>
                      </form>

                      <div class="status"></div>
                    </div>

                    <div class="col-md-3 text-center">
                      <ul class="list-unstyled mb-0">
                        <li>
                          <i class="fas fa-phone mt-2 fa-2x"></i>
                          <p>0760117716</p>
                        </li>

                        <li>
                          <i class="fas fa-envelope mt-2 fa-2x"></i>
                          <p>corina_lazar27@yahoo.com</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SettingsPage;

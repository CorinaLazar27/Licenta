import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Image/logo.png";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Dropdown from "react-dropdown";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import "react-dropdown/style.css";
import emailjs from "emailjs-com";
import Header from "./Header";

function SendInvitationsPage() {
  const history = useHistory();

  const [formValues, setFormValues] = useState([{ emailInvitat: "" }]);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { emailInvitat: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(formValues));
  };

  var mainListDiv = document.getElementById("mainListDiv"),
    mediaButton = document.getElementById("mediaButton");

  /*mediaButton.onclick = function () {
  
  "use strict";
  
  mainListDiv.classList.toggle("show_list");
  mediaButton.classList.toggle("active");

};*/

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
        document.getElementById("inputinv").value = "";

        console.log(res);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="nav">
      <Header />
      <div className="home1">
        <div class="container1">
          <form onSubmit={sendEmail}>
            <div class="row1">
              <div class="col-25">
                <label for="subject">Your Name</label>
              </div>
              <div class="col-75">
                <input id="inputinv" name="name" />
              </div>
            </div>
            <div class="row1">
              {formValues.map((element, index) => (
                <div className="form-inline" key={index}>
                  <div class="col-3">
                    <label for="fname">Email</label>
                  </div>
                  <div class="col-6">
                    <input
                      id="inputinv"
                      name="emailInvitat"
                      value={element.emailInvitat || ""}
                      onChange={(e) => handleChange(index, e)}
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    />
                  </div>
                  {index ? (
                    <div className="col-3">
                      <button
                        type="button"
                        className="button btn fa fa-minus"
                        onClick={() => removeFormFields(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ) : null}
                </div>
              ))}
              <div className="button-section">
                <button
                  className="button btn fa fa-plus"
                  type="button"
                  onClick={() => addFormFields()}
                >
                  Add
                </button>
              </div>
            </div>

            <div class="row1">
              <div class="col-25">
                <label for="subject">Message</label>
              </div>
              <div class="col-75">
                <textarea
                  id="message"
                  name="message"
                  value="Hello!
                    Please complete this form:  https://complete-form.netlify.app/  to make our event very nice :)
                   
                    Thank you!"
                  readOnly
                ></textarea>
              </div>
            </div>
            <br />
            <div class="row1">
              <button className="primary submit" type="submit">
                Send invitations
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SendInvitationsPage;

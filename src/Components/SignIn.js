import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Image/logo1.PNG";
import { useHistory } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import FacebookLogin from "react-facebook-login";
import { Card, Image } from "react-bootstrap";
import { Transition } from "react-transition-group";
import { TransitionGroup } from "react-transition-group";

function SingIn() {
  $(document).ready(function () {
    // Hide the div
    $("#note").hide();
  });
  function notificare() {
    // Show the div in 5s
    $("#note").show();
    setTimeout(function () {
      $("#note").fadeOut("fast");
    }, 4000); // <-- time in milliseconds
  }
  const history = useHistory();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");

  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState("");

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      console.log(data);

      window.localStorage.setItem("nume", data.name);
      window.localStorage.setItem("email", data.email);
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  function MakeLogin(event) {
    axios({
      method: "POST",
      url: "/login",
      data: {
        email: email,
        password: password,
      },
    })
      .then((response) => {
        const res = response.data;
        console.log(response);
        window.localStorage.setItem("nume", res.RowKey);
        window.localStorage.setItem("data", res.Date);
        window.localStorage.setItem("parola", res.Password);
        window.localStorage.setItem("locatieprofil", res.Location);
        window.localStorage.setItem("numartelefon", res.Phone);
        if (res != "Utilizator sau parola gresit") history.push("/homepage");
      })
      .catch((error) => {
        if (error.response) {
          console.log("Utilizator sau parola gresita");
          document.getElementById("email").value = "";
          document.getElementById("password").value = "";

          notificare();
          // console.log(error.response)
          // console.log(error.response.status)
          // console.log(error.response.headers)
        }
      });

    setEmail("");
    setPassword("");

    event.preventDefault();
  }

  const handleValidation = () => {
    let formIsValid = true;

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("Email Not Valid");

      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }

    if (!password.match(/^[a-zA-Z]{3,22}$/)) {
      formIsValid = false;
      setpasswordError(
        "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
      );
      return false;
    } else {
      setpasswordError("");
      formIsValid = true;
    }

    return formIsValid;
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    handleValidation();
  };

  return (
    <div className="Background">
      <div className="App">
        <div id="note">Utilizator sau parola gresita!</div>
        <h3>Sign in</h3>

        <form className="form" onSubmit={loginSubmit}>
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter e-mail"
              onChange={(event) => {
                setEmail(event.target.value);
                window.localStorage.setItem("email", event.target.value);
              }}
            />
            <small id="emailHelp" className="text-danger form-text">
              {emailError}
            </small>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <small id="passworderror" className="text-danger form-text">
              {passwordError}
            </small>
          </div>

          <button className="primary" onClick={MakeLogin}>
            Sign In
          </button>
        </form>
        <p>
          If you don't have account, <a href="/sign-up">create now!</a>
        </p>

        <Card id="card-fb" style={{ width: "500px" }}>
          <Card.Header>
            {!login && (
              <FacebookLogin
                appId="4917522175029919"
                autoLoad={false}
                fields="name,email,picture"
                scope="public_profile,email,user_friends"
                callback={responseFacebook}
                icon="fa-facebook"
              />
            )}
            {login && <Image src={picture} roundedCircle />}
          </Card.Header>
          {login &&
            ((
              <Card.Body>
                <Card.Title>{data.name}</Card.Title>
                <Card.Text>{data.email}</Card.Text>
              </Card.Body>
            ),
            history.push("homepage"))}
        </Card>
      </div>
    </div>
  );
}
export default SingIn;

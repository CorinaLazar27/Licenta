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
import { Field, Form, Formik } from "formik";
import { Button, Grid, Typography } from "@material-ui/core";
import { TextField } from "@mui/material";

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

  const MakeLogin = (values) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    console.log(data);
    axios({
      method: "POST",
      url: "/login",
      data: data,
    })
      .then((response) => {
        const res = response.data;
        console.log(response);
        window.localStorage.setItem("nume", res.RowKey);
        window.localStorage.setItem("data", res.Date);
        window.localStorage.setItem("parola", res.Password);
        window.localStorage.setItem("locatieprofil", res.Location);
        window.localStorage.setItem("numartelefon", res.Phone);
        window.localStorage.setItem("email", res.PartitionKey);
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
  };

  return (
    <div className="Background">
      <div className="App">
        <div id="note">Utilizator sau parola gresita!</div>
        <Typography variant="h4">Conecteaza-te</Typography>
        <br></br>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            MakeLogin(values);
            console.logs(values);
          }}
        >
          <Form>
            <Grid container spacing={5} columns={2}>
              <Grid item xs={12}>
                <Field
                  name="email"
                  label="Email"
                  variant="outlined"
                  placeholder="Introdu email-ul"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  type="password"
                  name="password"
                  label="Parola"
                  variant="outlined"
                  placeholder="Introdu parola"
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="outlined">
                  Conecteaza-te
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Formik>
        <br></br>
        <p>
          Daca nu ai un cont, <a href="/sign-up">fa unul acum!</a>
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

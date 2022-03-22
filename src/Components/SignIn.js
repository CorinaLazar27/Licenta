import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import FacebookLogin from "react-facebook-login";
import { Form, Formik } from "formik";
import { Button, Grid, Typography } from "@material-ui/core";
import { FormikTextField } from "./FormikComponents/FormikTextField";
import FacebookIcon from "@mui/icons-material/Facebook";

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

  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});

  const responseFacebook = (response) => {
    console.log(response);

    setData(response);

    if (response.accessToken) {
      window.localStorage.setItem("nume", response.name);
      window.localStorage.setItem("email", response.email);
      history.push("/homepage");
    } else {
      console.log("Ceva nu a mers ok");
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
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
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
                <FormikTextField
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  placeholder="Introdu email-ul"
                />
              </Grid>
              <Grid item xs={12}>
                <FormikTextField
                  id="password"
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
        <div style={{ margin: "10%" }}>
          <FacebookLogin
            appId="4917522175029919"
            autoLoad={false}
            fields="name,email"
            callback={responseFacebook}
            buttonStyle={{ color: "blue" }}
            cssClass="my-facebook-button-class"
            icon={<FacebookIcon />}
          >
            Conectează-te cu Facebook
          </FacebookLogin>
        </div>
      </div>
    </div>
  );
}
export default SingIn;

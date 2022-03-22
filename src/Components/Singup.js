import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import { Field, Form, Formik } from "formik";
import { Button, Grid, Typography } from "@material-ui/core";
import { FormikTextField } from "./FormikComponents/FormikTextField";

function SingUp(props) {
  const history = useHistory();

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

  const logMeIn = (values) => {
    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    console.log(data);
    axios({
      method: "POST",
      url: "/register",
      data: data,
    })
      .then((response) => {
        props.setToken(response.data.access_token);
        const res = response.data;
        history.push("/sign-in");
        if (res == "Done") history.push("/sign-in");
      })
      .catch((error) => {
        if (error.response) {
          notificare();

          history.push("/sign-in");
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  return (
    <div className="Background">
      <div className="App">
        <div id="note">Contul exista deja!</div>

        <Typography variant="h3">Inregistrare</Typography>
        <br></br>
        <Formik
          initialValues={{
            email: "",
            name: "",
            password: "",
          }}
          onSubmit={(values) => {
            logMeIn(values);
          }}
        >
          <Form>
            <Grid container spacing={5} columns={2}>
              <Grid item xs={12}>
                <FormikTextField
                  name="name"
                  label="Nume"
                  variant="outlined"
                  placeholder="Introdu numele"
                />
              </Grid>
              <Grid item xs={12}>
                <FormikTextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  placeholder="Introdu email-ul"
                />
              </Grid>
              <Grid item xs={12}>
                <FormikTextField
                  type="password"
                  name="password"
                  label="Parola"
                  variant="outlined"
                  placeholder="Introdu parola"
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained">
                  Creeaza cont
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Formik>
        <br></br>
        <p>
          <a href="/sign-in">Conecteaza-te..</a>
        </p>
      </div>
    </div>
  );
}
export default SingUp;

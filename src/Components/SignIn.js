import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
import { Form, Formik } from "formik";
import { Button, Grid, Typography } from "@material-ui/core";
import { FormikTextField } from "./FormikComponents/FormikTextField";
import FacebookIcon from "@mui/icons-material/Facebook";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { LoadingButton } from "@mui/lab";

function SingIn() {
  const history = useHistory();
  const [openError, setOpenError] = useState(false);
  const [loading, setLoading] = useState(false);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };
  const responseFacebook = (response) => {
    console.log(response);

    if (response.accessToken) {
      window.localStorage.setItem("nume", response.name);
      window.localStorage.setItem("email", response.email);
      history.push("/homepage");
    } else {
      setOpenError(true);
    }
  };

  const MakeLogin = (values) => {
    setLoading(true);
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
        setLoading(false);
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
          setOpenError(true);
          setLoading(false);

          //document.getElementById("email").value = "";
          //document.getElementById("password").value = "";

          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  return (
    <div className="Background">
      <div className="App">
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Eroare la conectare!
          </Alert>
        </Snackbar>
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
                <LoadingButton
                  loading={loading}
                  type="submit"
                  variant="outlined"
                >
                  Conecteaza-te
                </LoadingButton>
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

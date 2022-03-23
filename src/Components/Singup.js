import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import { Field, Form, Formik } from "formik";
import { Button, Grid, Typography } from "@material-ui/core";
import { FormikTextField } from "./FormikComponents/FormikTextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { LoadingButton } from "@mui/lab";
import Tooltip from "@mui/material/Tooltip";

function SingUp() {
  const history = useHistory();

  const [openSucces, setOpenSucces] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [loading, setLoading] = useState(false);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSucces(false);
    setOpenError(false);
  };

  const logMeIn = (values) => {
    setLoading(true);
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
        const res = response.data;
        setLoading(false);
        setOpenSucces(true);
        setTimeout(function () {
          if (res == "Done") history.push("/sign-in");
        }, 6000);
      })
      .catch((error) => {
        if (error.response) {
          setLoading(false);
          setOpenError(true);
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
            Eroare la crearea contului!
          </Alert>
        </Snackbar>

        <Snackbar
          open={openSucces}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Cont creat cu succes!
          </Alert>
        </Snackbar>

        <Typography variant="h4">Inregistrare</Typography>
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
                <Tooltip title="Creeaza cont nou">
                  <LoadingButton
                    loading={loading}
                    type="submit"
                    variant="contained"
                  >
                    Creeaza
                  </LoadingButton>
                </Tooltip>
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

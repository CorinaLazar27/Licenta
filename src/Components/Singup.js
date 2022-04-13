import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { Form, Formik } from "formik";
import { Grid, Typography } from "@material-ui/core";
import { FormikTextField } from "./FormikComponents/FormikTextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { LoadingButton } from "@mui/lab";
import Tooltip from "@mui/material/Tooltip";
import login from "../Image/login.jpg";
import login1 from "../Image/login1.jpg";
import login2 from "../Image/login2.jpg";
import login3 from "../Image/login3.jpg";
import login4 from "../Image/login4.jpg";
import login5 from "../Image/login5.jpg";
import login6 from "../Image/login6.jpg";
import login7 from "../Image/login7.jpg";
import login8 from "../Image/login8.jpeg";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import * as Yup from "yup";

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
        }, 1500);
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

  const ValidationsForm = Yup.object().shape({
    email: Yup.string()
      .email("Email invalid!")
      .required("Campul trebuie completat!"),
    password: Yup.string().required("Campul trebuie completat!"),
    name: Yup.string().required("Campul trebuie completat!"),
  });

  return (
    <Container
      sx={{
        root: 0,
        backgroundColor: "pink",
        backgroundImage: `url("${login8}")`,
        backgroundSize: "cover",
        display: "flex",
        minHeight: "100vh",
        minWidth: "100vw",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 0,
        paddingX: 0,
        margin: 0,
      }}
    >
      <Box
        sx={{
          background: "rgb(255, 255, 255)",
          borderRadius: "20%",
          boxShadow: "2px 4px 6px rgba(0, 0, 0, 1)",
          padding: "4rem",
          textAlign: "center",
          minWidth: "40vw",
        }}
      >
        <Snackbar
          open={openError}
          autoHideDuration={1500}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            Eroare la crearea contului!
          </Alert>
        </Snackbar>

        <Snackbar
          open={openSucces}
          autoHideDuration={1500}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success">
            Cont creat cu succes!
          </Alert>
        </Snackbar>

        <Typography variant="h4">Înregistrare</Typography>
        <br></br>
        <Formik
          initialValues={{
            email: "",
            name: "",
            password: "",
          }}
          validationSchema={ValidationsForm}
          onSubmit={(values) => {
            logMeIn(values);
          }}
        >
          <Form>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <FormikTextField
                  name="name"
                  label="Nume*"
                  variant="outlined"
                  placeholder="Introdu numele"
                />
              </Grid>
              <Grid item xs={12}>
                <FormikTextField
                  name="email"
                  label="Email*"
                  variant="outlined"
                  placeholder="Introdu email-ul"
                />
              </Grid>
              <Grid item xs={12}>
                <FormikTextField
                  type="password"
                  name="password"
                  label="Parola*"
                  variant="outlined"
                  placeholder="Introdu parola"
                />
              </Grid>
              <Grid item xs={12}>
                <Tooltip title="Creează cont nou">
                  <LoadingButton
                    loading={loading}
                    type="submit"
                    variant="contained"
                  >
                    Creează
                  </LoadingButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Form>
        </Formik>
        <br></br>
        <p>
          Ai deja cont? <a href="/sign-in">Conectează-te!</a>
        </p>
      </Box>
    </Container>
  );
}
export default SingUp;

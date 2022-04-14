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
import login from "../Image/login.jpg";
import login1 from "../Image/login1.jpg";
import login2 from "../Image/login2.jpg";
import login3 from "../Image/login3.jpg";
import login4 from "../Image/login4.jpg";
import login8 from "../Image/login8.jpeg";
import login9 from "../Image/login9.jpg";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import * as Yup from "yup";

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
          values.email = "";
          values.password = "";
          setOpenError(true);
          setLoading(false);

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
  });

  return (
    <Container
      sx={{
        backgroundImage: `url("${login1}")`,
        backgroundSize: "cover",
        display: "flex",
        minHeight: "100vh",
        minWidth: "100vw",
        justifyContent: "center",
        alignItems: "center",
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
        <Typography variant="h4">Intră în cont!</Typography>
        <br></br>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={ValidationsForm}
          onSubmit={(values) => {
            MakeLogin(values);
            console.logs(values);
          }}
        >
          <Form>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <FormikTextField
                  id="email"
                  name="email"
                  label="Email*"
                  variant="outlined"
                  placeholder="Introdu email-ul"
                />
              </Grid>
              <Grid item xs={12}>
                <FormikTextField
                  id="password"
                  type="password"
                  name="password"
                  label="Parola*"
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
                  Conectare
                </LoadingButton>
              </Grid>
            </Grid>
          </Form>
        </Formik>

        <Typography>sau</Typography>

        <FacebookLogin
          appId="4917522175029919"
          autoLoad={false}
          fields="name,email"
          callback={responseFacebook}
          buttonStyle={{ color: "blue" }}
          cssClass="my-facebook-button-class"
          icon={<FacebookIcon />}
          language="RO"
        >
          Conectează-te cu Facebook
        </FacebookLogin>
        <Typography>
          <a href="/sign-up"> Nu ai cont? Creeaza unul!</a>
        </Typography>
      </Box>
      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          Eroare la conectare!
        </Alert>
      </Snackbar>
    </Container>
  );
}
export default SingIn;

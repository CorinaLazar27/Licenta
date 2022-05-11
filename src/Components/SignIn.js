import React, { useState, useEffect } from "react";

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
import login10 from "../Image/login10.jpg";
import login11 from "../Image/login11.jpg";
import login12 from "../Image/login12.jpg";
import login13 from "../Image/login13.jpg";
import login14 from "../Image/login14.jpg";
import login15 from "../Image/login15.jpg";
import login16 from "../Image/login16.jpg";
import login17 from "../Image/login17.jpg";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import * as Yup from "yup";

import FirstHeader from "./FirstHeader";

function SingIn() {
  const CryptoJS = require("crypto-js");

  const encrypt = (text) => {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
  };

  const decrypt = (data) => {
    return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
  };

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
      password: encrypt(values.password),
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
        window.localStorage.setItem("nume", res.Name);
        window.localStorage.setItem("data", res.Date);
        window.localStorage.setItem("parola", decrypt(res.Password));
        // window.localStorage.setItem("locatieprofil", res.Location);
        // window.localStorage.setItem("numartelefon", res.Phone);
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

  const breakpoints = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  };
  const getSize = (width) => {
    if (width < breakpoints.sm) {
      return "18px";
    } else if (width < breakpoints.md) {
      return "20px";
    } else if (width < breakpoints.lg) {
      return "35px";
    } else if (width < breakpoints.xl) {
      return "35px";
    } else return "38px";
  };
  const [size, setSize] = useState(getSize(window.innerWidth));
  const updateDimensions = () => {
    setSize(getSize(window.innerWidth));
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <Container
      sx={{
        // backgroundImage: `url("${login16}")`,
        // backgroundSize: "cover",
        display: "flex",
        minHeight: "100vh",
        minWidth: "100vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FirstHeader />

      <Box
        sx={{
          background: "rgb(255, 255, 255)",
          boxShadow: "2px 4px 6px rgba(0, 0, 0, 1)",
          padding: "4rem",
          textAlign: "center",
          minWidth: "40vw",
        }}
      >
        <Typography style={{ fontSize: size }}>Intră în cont!</Typography>
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

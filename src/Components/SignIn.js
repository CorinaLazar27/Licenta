import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
import { Form, Formik } from "formik";
import { Grid, Typography } from "@material-ui/core";
import { FormikTextField } from "./FormikComponents/FormikTextField";
import FacebookIcon from "@mui/icons-material/Facebook";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { LoadingButton } from "@mui/lab";
import login1 from "../Image/3.png";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import * as Yup from "yup";
import FirstHeader from "./FirstHeader";
import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";

function SingIn() {
  const decryptWithAES = (ciphertext, passphrase) => {
    const bytes = AES.decrypt(ciphertext, passphrase);
    const originalText = bytes.toString(Utf8);
    return originalText;
  };
  const history = useHistory();
  const [openError, setOpenError] = useState(false);
  const [openErrorPassword, setOpenErrorPassword] = useState(false);
  const [openErrorUser, setOpenErrorUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
    setOpenErrorPassword(false);
    setOpenErrorUser(false);
  };
  const responseFacebook = (response) => {
    console.log(response);
    if (response.accessToken) {
      window.localStorage.setItem("nume", response.name);
      window.localStorage.setItem("email", response.email);
      window.localStorage.setItem("facebook", true);
      history.push("/homepage");
    } else {
      setOpenError(true);
    }
  };

  const MakeLogin = (values) => {
    setOpenErrorPassword(false);
    setOpenErrorUser(false);
    setOpenError(false);
    setLoading(true);
    const data = {
      email: values.email,
    };
    console.log(data);
    axios({
      method: "POST",
      url: "https://server-licenta.azurewebsites.net/getUserAndPassword",
      data: data,
    })
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        if (response.data.length == 0) {
          values.email = "";
          values.password = "";
          setOpenErrorUser(true);
        } else {
          if (
            decryptWithAES(response.data[0].Parola, "corinakey") ==
            values.password
          ) {
            window.localStorage.setItem("nume", response.data[0].Nume);
            window.localStorage.setItem("email", response.data[0].PartitionKey);
            history.push("/homepage");
          } else {
            setOpenErrorPassword(true);

            values.email = "";
            values.password = "";
          }
        }
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

  const getMobile = (width) => {
    if (width < breakpoints.sm) {
      return true;
    } else if (width < breakpoints.md) {
      return false;
    } else if (width < breakpoints.lg) {
      return false;
    } else if (width < breakpoints.xl) {
      return false;
    } else return false;
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
  const [mobile, setMobile] = useState(getMobile(window.innerWidth));
  const [size, setSize] = useState(getSize(window.innerWidth));
  const updateDimensions = () => {
    setSize(getSize(window.innerWidth));
  };
  const updateMobile = () => {
    setMobile(getMobile(window.innerWidth));
  };
  useEffect(() => {
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

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
      <FirstHeader />

      <Box
        sx={{
          background: "rgb(255, 255, 255)",
          boxShadow: "2px 4px 6px rgba(0, 0, 0, 1)",
          padding: "4rem",
          textAlign: "center",
          maxWidth: "70vh",
        }}
      >
        <Grid
          sx={{
            minWidth: "2vw",
          }}
        />

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
                  style={{
                    borderColor: "#2C5E1A",
                    color: "#2C5E1A",
                    hover: {
                      "&:hover": {
                        borderColor: "#2C5E1A",
                        color: "#2C5E1A",
                      },
                    },
                  }}
                >
                  Conectare
                </LoadingButton>
              </Grid>
            </Grid>
          </Form>
        </Formik>

        {/* {!mobile && ( */}
        <>
          <Typography
            style={{
              margin: "1vh",
            }}
          >
            sau
          </Typography>
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
        </>
        {/* )} */}
        <Typography
          style={{
            margin: "1vh",
          }}
        >
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

      <Snackbar
        open={openErrorPassword}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          Parola incorecta!{" "}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorUser}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          Contul nu exista!{" "}
        </Alert>
      </Snackbar>
    </Container>
  );
}
export default SingIn;

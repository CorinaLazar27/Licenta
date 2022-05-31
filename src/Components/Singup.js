import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import { Grid, Typography } from "@material-ui/core";
import { FormikTextField } from "./FormikComponents/FormikTextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { LoadingButton } from "@mui/lab";
import Tooltip from "@mui/material/Tooltip";
import login1 from "../Image/3.png";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import * as Yup from "yup";
import FirstHeader from "./FirstHeader";

function SingUp() {
  const CryptoJS = require("crypto-js");
  const encrypt = (text) => {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
  };
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
      password: encrypt(values.password),
    };
    console.log(data);
    axios({
      method: "POST",
      url: "https://server-licenta.azurewebsites.net/register1",
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
      maxWidth={false}
      sx={{
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url("${login1}")`,
        backgroundSize: "cover",
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
          marginTop: 6,
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

        <Typography style={{ fontSize: size }}>Înregistrare</Typography>
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
                    variant="outlined"
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

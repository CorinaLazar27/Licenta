import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Image/logo.png";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Dropdown from "react-dropdown";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "react-dropdown/style.css";
import axios from "axios";

import emailjs from "emailjs-com";
import Header from "./Header";
import { Container, Grid, Box, Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import background from "../Image/homePage.png";
function SettingsPage() {
  const CryptoJS = require("crypto-js");

  const encrypt = (text) => {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
  };
  const decrypt = (data) => {
    return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
  };
  const email = window.localStorage.getItem("email");
  const name = window.localStorage.getItem("nume");
  const date = window.localStorage.getItem("data");
  const password = window.localStorage.getItem("parola");
  const location = window.localStorage.getItem("locatie");
  const phonenumber = window.localStorage.getItem("numartelefon");
  const [loading, setLoading] = useState(false);
  const [newpassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  function sendEmail(e) {
    setLoading(true);
    e.preventDefault();
    emailjs
      .sendForm(
        "service_n4e6ik8",
        "template_4fpqkau",
        e.target,
        "user_K0LHWwDahklB8kPrwKB2k"
      )
      .then((res) => {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("subject").value = "";
        document.getElementById("message").value = "";
        console.log(res);
        setLoading(false);
        setTimeout(window.location.reload(false), 3000);
        setOpenSuccesEmail(true);
      })
      .catch((err) => {
        setLoading(false);
        setOpenErrorEmail(true);
        setTimeout(window.location.reload(false), 3000);
        console.log(err);
      });
  }

  function UpdateProfile() {
    setLoading(true);
    axios({
      method: "POST",
      url: "/changepassword",
      data: {
        email: email,
        name: name,
        newpassword: encrypt(newpassword),
        date: date,
        location: location,
        phonenumber: phonenumber,
      },
    })
      .then((response) => {
        console.log(response.data);
        console.log(decrypt(encrypt(newpassword)));
        window.localStorage.setItem("parola", decrypt(encrypt(newpassword)));
        setLoading(false);
        setOpenSuccesPassword(true);
        setTimeout(window.location.reload(false), 3000);
        // if (response.data == "Done") notificare();
      })
      .catch((error) => {
        if (error.response) {
          console.log(error);
          setLoading(false);
          setOpenErrorPassword(true);
          setTimeout(window.location.reload(false), 3000);
          // console.log(error.response)
          // console.log(error.response.status)
          // console.log(error.response.headers)
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const [openSuccesPassword, setOpenSuccesPassword] = useState(false);
  const [openErrorPassword, setOpenErrorPassword] = useState(false);
  const [openDifferentPassword, setOpenDifferentPassword] = useState(false);
  const [openSuccesEmail, setOpenSuccesEmail] = useState(false);
  const [openErrorEmail, setOpenErrorEmail] = useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccesPassword(false);
    setOpenErrorPassword(false);
    setOpenDifferentPassword(false);
    setOpenSuccesEmail(false);
    setOpenErrorEmail(false);
  };
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "flex-start",
        justifyContent: "center",
        textAlign: "center",
        backgroundImage: `url("${background}")`,
      }}
    >
      <Snackbar
        open={openSuccesPassword}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          Parola a fost schimbată cu succes!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorPassword}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          A apărut o eroare la schimbarea parolei!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openDifferentPassword}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          Nu ați introdus parola curentă corect!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccesEmail}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          Email-ul a fost trimis cu succes!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorEmail}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          Eroare la trimiterea email-ului!
        </Alert>
      </Snackbar>
      <Header />

      <Box
        sx={{
          width: "100vw",
          padding: "2%",
          marginTop: "10vh",
        }}
      >
        <Grid container rowSpacing={"10vh"}>
          <Grid item xs={12}>
            <h3>Setări</h3>
          </Grid>
          <Grid item xs={12}>
            <Accordion
              style={{
                minHeight: "8vh",
                // width: "100vw",
                backgroundColor: "#F5F4F2",
                color: "black",
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Schimbă parola</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid
                  container
                  rowSpacing={2}
                  sx={{ backgroundColor: "white" }}
                  padding="1vh"
                >
                  <Grid item xs={12}>
                    <TextField
                      id="Parola curentă"
                      name="Parola curentă"
                      label="Parola curentă"
                      type="password"
                      onChange={(event) =>
                        setCurrentPassword(event.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="Parola nouă"
                      name="Parola nouă"
                      label="Parola nouă"
                      type="password"
                      onChange={(event) => {
                        setNewPassword(event.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ marginBottom: "1vh" }}>
                    <LoadingButton
                      loading={loading}
                      variant="contained"
                      onClick={() => {
                        if (currentPassword == password) UpdateProfile();
                        else setOpenDifferentPassword(true);
                      }}
                    >
                      Schimbă
                    </LoadingButton>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              style={{
                minHeight: "8vh",
                backgroundColor: "#F5F4F2",
                color: "black",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Ajutor</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid
                  item
                  xs={12}
                  sx={{ padding: "2vh", backgroundColor: "white" }}
                >
                  <h3>Contactează-ne</h3>
                  <h7>
                    Ai întrebări? Te rugăm nu ezita să ne contactezi! Echipa
                    noastră îți va raspunde cât de repede poate.
                  </h7>
                  <form onSubmit={sendEmail}>
                    <Grid container rowSpacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="name"
                          name="name"
                          label="Nume"
                          variant="standard"
                          required
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="email"
                          type="email"
                          name="email"
                          label="Email"
                          variant="standard"
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="subject"
                          name="subject"
                          label="Subiect"
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="message"
                          name="message"
                          label="Mesaj"
                          multiline
                          rows={5}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <LoadingButton
                          loading={loading}
                          type="submit"
                          variant="contained"
                        >
                          Trimite{" "}
                        </LoadingButton>
                      </Grid>
                    </Grid>
                  </form>{" "}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
export default SettingsPage;

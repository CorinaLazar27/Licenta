import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "react-dropdown/style.css";
import axios from "axios";
import emailjs from "emailjs-com";
import Header from "./Header";
import { Container, Grid, Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import background from "../Image/homePage.png";

function SettingsPage() {
  const CryptoJS = require("crypto-js");
  const encrypt = (text) => {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
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
      url: "https://server-licenta.azurewebsites.net/changepassword",
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

        window.localStorage.setItem("parola", encrypt(newpassword));
        setLoading(false);
        setOpenSuccesPassword(true);
        setTimeout(window.location.reload(false), 3000);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error);
          setLoading(false);
          setOpenErrorPassword(true);
          setTimeout(window.location.reload(false), 3000);
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
  const facebookLogin = window.localStorage.getItem("facebook");
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
          minWidth: "100vw",
          padding: "2%",
          marginTop: "15vh",
          backgroundColor: "white",
          textAlign: "center",
        }}
      >
        <Grid
          container
          rowSpacing={"10vh"}
          sx={{
            display: "flex",
            textAlign: "center",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h3>Setări</h3>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              textAlign: "center",
            }}
          >
            <Accordion
              style={{
                minHeight: "8vh",
                backgroundColor: "#F5F4F2",
                color: "black",
                textAlign: "center",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  display: "flex",
                  textAlign: "center",
                }}
              >
                <Typography>Schimbă parola</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid
                  container
                  rowSpacing={2}
                  sx={{
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  padding="1vh"
                >
                  {!facebookLogin && (
                    <form
                      onSubmit={() => {
                        if (encrypt(currentPassword) == password)
                          UpdateProfile();
                        else setOpenDifferentPassword(true);
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        sx={{
                          marginBottom: "1vh",
                        }}
                      >
                        <TextField
                          id="Parola curentă"
                          name="Parola curentă"
                          label="Parola curentă"
                          type="password"
                          onChange={(event) =>
                            setCurrentPassword(event.target.value)
                          }
                          required
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          marginBottom: "1vh",
                        }}
                      >
                        <TextField
                          id="Parola nouă"
                          name="Parola nouă"
                          label="Parola nouă"
                          type="password"
                          required
                          onChange={(event) => {
                            setNewPassword(event.target.value);
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sx={{ marginBottom: "1vh" }}>
                        <LoadingButton
                          type="submit"
                          style={{
                            backgroundColor: "#2C5E1A",
                            color: "white",
                            padding: "0.5vh",
                          }}
                          loading={loading}
                          variant="contained"
                        >
                          Schimbă
                        </LoadingButton>
                      </Grid>
                    </form>
                  )}
                  {facebookLogin && (
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="h6">
                        Această funcție nu este disponibilă la conectarea prin
                        Facebook!
                      </Typography>
                    </Grid>
                  )}
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
                    Ai întrebări? Te rugăm nu ezita să ne contactezi! Vei primi
                    un răspuns cât de repede cu putință.
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
                          style={{
                            backgroundColor: "#2C5E1A",
                            color: "white",
                            padding: "0.5vh",
                          }}
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

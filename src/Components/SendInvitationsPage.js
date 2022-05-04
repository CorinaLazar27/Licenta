import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import "react-dropdown/style.css";
import emailjs from "emailjs-com";
import Header from "./Header";
import { Container, Grid, Typography, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function SendInvitationsPage() {
  const history = useHistory();

  const nume = window.localStorage.getItem("nume");
  const eveniment = window.localStorage.getItem("eveniment");
  const data = window.localStorage.getItem("dataeveniment");
  const messageValue =
    "Salut! Te astept în data de: " +
    data +
    " la " +
    eveniment.toLocaleLowerCase() +
    ". " +
    "\n" +
    "Te rugăm să completezi formularul de la următorul link pentru a afla preferințele tale legate de evenimentul la care îmi doresc să participi: https://complete-form.netlify.app/ " +
    "\n" +
    "Mulțumesc foarte mult!";
  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState([{ emailInvitat: "" }]);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { emailInvitat: "" }]);
    console.log(formValues);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
    console.log(formValues);
  };
  const [openError, setOpenError] = useState(false);
  const [openSucces, setOpenSucces] = useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
    setOpenSucces(false);
  };

  function sendEmail(e) {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm(
        "service_n4e6ik8",
        "template_ent1jts",
        e.target,
        "user_K0LHWwDahklB8kPrwKB2k"
      )
      .then((res) => {
        document.getElementById("inputinv").value = "";
        setLoading(false);
        setOpenSucces(true);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setOpenError(true);
      });
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "flex-start",
        textAlign: "center",
      }}
    >
      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          Eroare la trimiterea chestionarului!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSucces}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          Chestionar trimis cu succes!
        </Alert>
      </Snackbar>
      <Header />
      <Grid container sx={{ marginTop: "10vh", minHeight: "40vh" }}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "left",
            margin: "1rem",
          }}
        >
          <Button
            sx={{
              fontSize: "2vw",
            }}
            startIcon={<ArrowBackIcon />}
            variant="contained"
            onClick={() => {
              history.push("/myeventpage");
              history.go(0);
            }}
          >
            Înapoi
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ padding: "2vh" }}>
          <form onSubmit={sendEmail}>
            <Grid container rowSpacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="name"
                  name="name"
                  label="Nume"
                  variant="standard"
                  defaultValue={nume}
                />
              </Grid>

              <Grid item xs={12}>
                {formValues.map((element, index) => {
                  return (
                    <div>
                      <TextField
                        fullWidth
                        id="inputinv"
                        type="email"
                        name="emailInvitat"
                        label="Email"
                        variant="standard"
                        value={element.emailInvitat || ""}
                        onChange={(e) => handleChange(index, e)}
                        required
                      />

                      {index ? (
                        <div className="col-3">
                          <Button
                            startIcon={<DeleteOutlineIcon />}
                            onClick={() => removeFormFields(index)}
                          >
                            Șterge
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  );
                })}

                <Button startIcon={<AddIcon />} onClick={() => addFormFields()}>
                  Adaugă email
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="message"
                  name="message"
                  label="Mesaj"
                  multiline
                  rows={5}
                  defaultValue={messageValue}
                  required
                />
                <Typography sx={{ color: "red", marginBottom: "1vh" }}>
                  Puteți modifica textul mesajului, dar să nu ștergeți link-ul
                  pentru completarea chestionarului!!
                </Typography>
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
      </Grid>
    </Container>
  );
}
export default SendInvitationsPage;

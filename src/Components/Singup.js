import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import $ from 'jquery';

function SingUp(props) {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");

  $(document).ready(function() {

    // Hide the div
    $("#note").hide();

   

});
function notificare() {


  // Show the div in 5s
  $("#note").show();
  setTimeout(function() {
    $('#note').fadeOut('fast');
}, 4000); // <-- time in milliseconds
}

function trytoLogin()
{
  history.push('./sign-in');
}
  function logMeIn(event) {
    axios({
      method: "POST",
      url:"/register",
      data:{
        name: name,
        email: email,
        password: password
       }
    })
    .then((response) => {
    props.setToken(response.data.access_token)
    const res =response.data;
    if(res=="Done")
     history.push("/sign-in");
    }).catch((error) => {
      if (error.response) {
        notificare();
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })

   setEmail("");
   setPassword("");
   setName("");
    event.preventDefault();
  }

  const handleValidation = () => {


    let formIsValid = true;

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("Email Not Valid");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }

    if (!password.match(/^[a-zA-Z]{8,22}$/)) {
      formIsValid = false;
      setpasswordError(
        "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
      );
      return false;
    } else {
      setpasswordError("");
      formIsValid = true;
    }

    return formIsValid;
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    handleValidation();
  };
  
  function TryToSignIn()
  {
      history.push("/sign-in");
  }

  return (
    <div className="App">
      <div id="note">Contul exista deja!</div>
        <h1>Register</h1>
            <form className="form" onSubmit={loginSubmit}>
            <div className="input-group">
              <label htmlFor="name">Name</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your name"
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              
              <div className="input-group">
              <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter e-mail"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="input-group">
              <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>


              <button className="secondary" onClick={logMeIn}>Sign Up</button>
        </form>
        
        </div>
      
      
  );
}
export default SingUp;

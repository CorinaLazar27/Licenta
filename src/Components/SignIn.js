import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Image/logo.png"
import { useHistory } from "react-router-dom";
import axios from "axios";
import $ from 'jquery';

function SingIn() {

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
  const history = useHistory();
 
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");

  function MakeLogin(event) {
    
    axios({
      method: "POST",
      url:"/login",
      data:{
        email: email,
        password: password
       }
    })
    .then((response) => {
     const res =response.data
     if(res=="OK")
      history.push("/homepage");
     
    }).catch((error) => {
      if (error.response) {
        console.log("Utilizator sau parola gresita");
        notificare();
       // console.log(error.response)
       // console.log(error.response.status)
       // console.log(error.response.headers)
        }
    })
  
    setEmail("");
    setPassword("");
   
 
     event.preventDefault()
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

    if (!password.match(/^[a-zA-Z]{3,22}$/)) {
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
 
  function TryToSignUp()
  {
      history.push("/sign-up");
  }
  function HomePage()
  {
      history.push("/homepage");
  }


  return (
    <div className="App">
      <div id="note">Utilizator sau parola gresita!</div>
         <img src={logo} className="logo" alt="logo" />
            <form className="form" onSubmit={loginSubmit}>
              <div className="input-group">
              <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter e-mail"
                  onChange={(event) => {setEmail(event.target.value)
                    window.localStorage.setItem('email',event.target.value)}}

                />
                 <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small>
              </div>

              <div className="input-group">
              <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  onChange={(event) => setPassword(event.target.value)
                }
                />
                 <small id="passworderror" className="text-danger form-text">
                  {passwordError}
                </small>
              </div>


              <button className="primary" onClick={MakeLogin}>Sign In</button>
        </form>
        <button className="secondary" onClick={()=>TryToSignUp()} >
          Create acccont now!
        </button>
        </div>
      
      
  );
}
export default SingIn;

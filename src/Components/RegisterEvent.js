import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Image/logo.png"
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

import axios from "axios";

function RegisterEventPage() {
   
  const history = useHistory();
  const email=window.localStorage.getItem('email');
  
  
  //populating input data
  function getInputData() {
    let dataToPost = new FormData(); //formdata API
  
    //fill name attributes to corresponding values
    dataToPost.append("entry.294341084", document.querySelector("#inp1").value);
  
    return dataToPost;
  }

 /* var mainListDiv = document.getElementById("mainListDiv"),
  mediaButton = document.getElementById("mediaButton");

mediaButton.onclick = function () {
  
  "use strict";
  
  mainListDiv.classList.toggle("show_list");
  mediaButton.classList.toggle("active");

};*/
  return (

    <nav class="nav">
    <div class="container">
        <div class="logo">
            <a href="#">Wedding</a>
        </div>
        <div class="main_list" id="mainListDiv">
            <ul>
                <li><a href="/homepage">Home</a></li>
                <li><a href="#">Register event</a></li>
                <li><a href="#">My events</a></li>
                <li><a href="#">Profile</a></li>
                <li><a href="#">Settings</a></li>
                <li><a href="/sign-in">Log out</a></li>
          
            </ul>
        </div>
        <div class="media_button">
            <button class="main_media_button" id="mediaButton">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </div>
   
    <div class="home">
    <br></br>
    <form>
    <h2>Register your event</h2>
    </form>
   
      </div>
   
</nav>

  

  );
}
export default RegisterEventPage;

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Image/logo.png"
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

import axios from "axios";

function HomePage() {

  const history = useHistory();
  const email=window.localStorage.getItem('email');

  const [profileData, setProfileData] = useState(null)

  function getData() {
    //axios({
   //   method: "GET",
   //   url:"/profile",
  //  })
  axios.get('/login')
    .then((response) => {
     const res =response.data
     console.log(res);
      setProfileData(({
        profile_name: res.PartitionKey,
      }))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

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
                <li><a href="#">Home</a></li>
                <li><a href="#">Reservation</a></li>
                <li><a href="#">Profile</a></li>
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
    <h3>Welcome, {email}!</h3>

    <p>To get your profile details: </p><button onClick={getData}>Click me</button>
        {profileData && <div>
              <p>Profile name: {profileData.profile_name}</p>
             
            </div>
        }
    </div>
</nav>




  );
}
export default HomePage;

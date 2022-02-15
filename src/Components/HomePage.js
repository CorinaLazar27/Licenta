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
  const nume=window.localStorage.getItem('nume');
  var mainListDiv = document.getElementById("mainListDiv");
  var mediaButton = document.getElementById("mediaButton");
  var note = document.getElementById("note");


  const [data, setData]= useState("");
  function GetElements(event) {
    
    axios({
      method: "GET",
      url:"/elements",
     
    })
    .then((response) => {
    //console.log(response.data.results);
    setData(response.data.results);
    console.log(response);
    }).catch((error) => {
      if (error.response) {
      
       console.log(error.response)
       console.log(error.response.status)
       console.log(error.response.headers)
        }
    }) 
 
     event.preventDefault()
  }

  window.onload = GetElements;
/*mediaButton.onclick = function () {
  
  "use strict";
  
  mainListDiv.classList.toggle("show_list");
  mediaButton.classList.toggle("active");
  
};*/
  return (

<nav className="nav">
  

    <div className="container">
        <div className="logo">
            <a href="#">Event</a>
        </div>
        <div className="main_list" id="mainListDiv">
            <ul>
                <li><a href="/homepage">Home</a></li>
                <li><a href="/registerevent">Register event</a></li>
                <li><a href="/myeventpage">My events</a></li>
                <li><a href="/profilepage">Profile</a></li>
                <li><a href="/settingspage">Settings</a></li>
                <li><a href="/sign-in" onClick={()=>window.localStorage.clear()}>Log out</a></li>
          
            </ul>
        </div>
        <div className="media_button">
            <button className="main_media_button" id="mediaButton">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </div>
   
    <div className="home">
      <br></br> <br></br>
      <h3>Welcome, {nume}!</h3>
      <br></br>
      <div>
       <button className="button1" onClick={()=>history.push('/registerevent')}>Register Event</button>
       </div>
      <br></br>
      <div>
      <button className="button1"  onClick={()=>history.push('/myeventpage')}>My events</button>
      </div>
      
      </div>
    
</nav>




  );
}
export default HomePage;

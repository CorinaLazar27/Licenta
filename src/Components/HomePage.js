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
  var mainListDiv = document.getElementById("mainListDiv");
  var mediaButton = document.getElementById("mediaButton");
  var note = document.getElementById("note");
 setTimeout(()=>{
    note.style.display="none";
  }, 100);

/*mediaButton.onclick = function () {
  
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
                <li><a href="/registerevent">Register event</a></li>
                <li><a href="/myeventpage">My events</a></li>
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
   
    <div className="home">
      <br></br>
      <h3>Welcome, {email}!</h3>
      <br></br>
      <div>
       <button className="button1" onClick={()=>history.push('/registerevent')}>Register Event</button>
       </div>
      <br></br>
      <div>
      <button className="button1"  onClick={()=>history.push('/myeventpage')}>My events</button>
      </div>
      <div className="footer">
      <footer></footer>
      </div>
      </div>
    
</nav>




  );
}
export default HomePage;

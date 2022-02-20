import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Image/logo.png"
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Dropdown from 'react-dropdown';
 import {CircleArrow as ScrollUpButton} from "react-scroll-up-button"; 
import 'react-dropdown/style.css';



function SendInvitationsPage() {

  
  const history = useHistory();
  const email=window.localStorage.getItem('email');

   
  
  var mainListDiv = document.getElementById("mainListDiv"),
  mediaButton = document.getElementById("mediaButton");

/*mediaButton.onclick = function () {
  
  "use strict";
  
  mainListDiv.classList.toggle("show_list");
  mediaButton.classList.toggle("active");

};*/
 
return (

    <div className="nav">
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
        
    <div className="home1">
  
   
         
   </div>
    </div>
  
  );
}
export default SendInvitationsPage;

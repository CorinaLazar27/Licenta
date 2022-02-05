import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Image/logo.png"
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Dropdown from 'react-dropdown';

import 'react-dropdown/style.css';
import axios from "axios";

function MyEventPage() {
    const history = useHistory();

 

 /* var mainListDiv = document.getElementById("mainListDiv"),
  mediaButton = document.getElementById("mediaButton");

mediaButton.onclick = function () {
  
  "use strict";
  
  mainListDiv.classList.toggle("show_list");
  mediaButton.classList.toggle("active");

};*/
  return (

    <div className="nav">
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
        
    <div className="home1">
        <h3>My Events</h3>
        <br></br>
     <table id="myeventstable">
     <tr>
    <th>Event ID</th>
    <th>Event Name</th>
    </tr>
    <tr>
    <td></td>
    <td></td>
    
  </tr>
  
     </table>
     <br></br>
     <button className="table"  onClick={()=> history.push('/registerevent')} >Add an event</button>
</div>
</div>
  );
}
export default MyEventPage;

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Image/logo.png"
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Dropdown from 'react-dropdown';

import 'react-dropdown/style.css';
import axios from "axios";

function RegisterEventPage() {
   
  
  const optionsBar = [
    'At the table', 'Bar with bartender'
  ];
  const optionsRingDance= [
    'Dominant', 'Restricted'
  ];
  const optionsEvent= [
    'Wedding', 'Christening','Birthday'
  ];
 

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
       <form className="form1" >
         <h3>Register Your Event</h3>
        <br></br>
         <div className="input-group1">
            <label  for="event" >Type of Event</label>
       
            <select name="event" id="event" placeholder="Select an option">
            <option value="">Select your option</option>
              <option value="Wedding">Wedding</option>
             <option value="Christening">Christening</option>
        
            </select>
      
          </div>
  
         <div className="input-group1">
         <label >Number of guests</label>
           <input
             id="event"
             type="event"
             name="event"
           />
           </div>

         <div className="input-group1">
         <label >Favorite location</label>
           <input
             id="event"
             type="event"
             name="event"
           />
         </div>
  
         <div className="input-group1">
         <label htmlFor="event">Budget</label>
           <input
             id="event"
             type="event"
             name="event"
           />
           
         </div>
        
        
          <div className="input-group1">
        <label htmlFor="band">Live Band</label>
        
         <input type="radio" value="Yes" name="band" id="band" className="radio"/> Yes
         <input type="radio" value="No" name="band" id="band" className="radio" /> No
        
         </div>
         <div className="input-group1">
        <label htmlFor="artisticmoment" >Artistic moment</label>
         <input id="artisticmoment" type="radio" value="Yes" name="artisticmoment" className="radio"/> Yes
         <input  id="artisticmoment" type="radio" value="No" name="artisticmoment" className="radio"/> No
         </div>
         <div className="input-group1">
        <label htmlFor="photographer">Photographer</label>
         <input id="photographer" type="radio" value="Yes" name="photographer" className="radio" /> Yes
         <input id="photographer" type="radio" value="No" name="photographer" className="radio"/> No
         </div>
         <div className="input-group1">
        <label htmlFor="videorecording">Video Recording</label>
         <input id="videorecording" type="radio" value="Yes" name="videorecording" className="radio"/> Yes
         <input  id="videorecording" type="radio" value="No" name="videorecording"  className="radio"/> No
         </div>
         <div className="input-group1">
        <label htmlFor="candybar">Candy Bar</label>
         <input id="candybar" type="radio" value="Yes" name="candybar" className="radio"/> Yes
         <input id="candybar" type="radio" value="No" name="candybar" className="radio"/> No
         </div>
         <div className="input-group1">
        <label htmlFor="fruitsbar" >Fruits Bar</label>
         <input id="fruitsbar" type="radio" value="Yes" name="fruitsbar" className="radio" /> Yes
         <input id="fruitsbar" type="radio" value="No" name="fruitsbar" className="radio"/> No
         </div>
       <div className="input-group1">   
       <label htmlFor="drinks">Drinks</label>
       <select name="drinks" id="drinks" placeholder="Select an option">
          <option value="">Select your option</option>
          <option value="At the table">At the table</option>
          <option value="Bar with bartender">Bar with bartender</option>
         
        </select>
      
      
   
    </div>
    <div className="input-group1">  
       <label htmlFor="ringdance" >Ring Dance</label>
          
          <select name="ringdance" id="ringdance" placeholder="Select an option">
          <option value="">Select your option</option>
          <option value="Dominant">Dominant</option>
          <option value="Restricted">Restricted</option>
        
         </select>
   <br></br>
    </div>
         <button className="secondary">Submit your Event</button>
   </form>
</div>
</div>
  );
}
export default RegisterEventPage;

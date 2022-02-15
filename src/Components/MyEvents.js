import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Image/logo.png"
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Dropdown from 'react-dropdown';

import 'react-dropdown/style.css';
import axios from "axios";
import $ from 'jquery';

function MyEventPage() {
    const history = useHistory();
    const [data, setData] = useState([]);
    const email=window.localStorage.getItem('email');

    window.onload = function exampleFunction() {
  
      GetMyEvents();
  }

  function GetMyEvents() {
    
    axios({
      method: "POST",
      url:"/getmyevents",
      data:{
        email: email,
       }
    })
    .then((response) => {
     setData(response.data.results);
      console.log(data);
    }).catch((error) => {
      if (error.response) {
       
       // console.log(error.response)
       // console.log(error.response.status)
       // console.log(error.response.headers)
        }
    })
  }
    function GetElements(event) {
    
      axios({
        method: "GET",
        url:"/elements",
       
      })
      .then((response) => {
      //console.log(response.data.results);
      setData(response.data.results);
      console.log(data);
      }).catch((error) => {
        if (error.response) {
        
         console.log(error.response)
         console.log(error.response.status)
         console.log(error.response.headers)
          }
      }) 
   
       event.preventDefault()
    }
  

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
            <a href="#">Event</a>
        </div>
        <div class="main_list" id="mainListDiv">
            <ul>
                <li><a href="/homepage">Home</a></li>
                <li><a href="/registerevent">Register event</a></li>
                <li><a href="/myeventpage">My events</a></li>
                <li><a href="/profilepage">Profile</a></li>
                <li><a href="/settingspage">Settings</a></li>
                <li><a href="/sign-in" onClick={()=>window.localStorage.clear()}>Log out</a></li>
          
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
     <thead>
     <tr>
    <th>Event Type</th>
    <th>Date</th>
    </tr>
    </thead>
    <tbody>
    {
                        data.map((item) => (
                            <tr >
                                <td>{item.EventType}</td>
                                <td>{item.RowKey}</td>
          
                            </tr>
                        ))
                    }
    </tbody>

     </table>

     
     <br></br>
     <button className="table"  onClick={()=> history.push('/registerevent')} >Add an event</button>
</div>
</div>
  );
}
export default MyEventPage;

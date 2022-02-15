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

function SettingsPage() {
  const email=window.localStorage.getItem('email');
  const name=window.localStorage.getItem('nume');;
  const date=window.localStorage.getItem('data');
  const password=window.localStorage.getItem('parola');
  const location=window.localStorage.getItem('locatie');
  const phonenumber=window.localStorage.getItem('numartelefon');


  function UpdateProfile()
    {
        
    
            axios({
              method: "POST",
              url:"/updateprofile",
              data:{
                email: email,
                name:name,
                password:newpassword,
                date:date,
                location:location,
                phonenumber:phonenumber
                
               }
            })
            .then((response) => {
              console.log(response.data);
              if(response.data=="Done")
              notificare();
            
            }).catch((error) => {
              eroare();
              if (error.response) {
                  console.log(error);
               // console.log(error.response)
               // console.log(error.response.status)
               // console.log(error.response.headers)
                }
            })
          
    }

    const [newpassword,setNewPassword]=useState("");



    $(document).ready(function() {

        // Hide the div
        $("#notesucces").hide();
        $("#note").hide();
       
    
    });
    function notificare() {
    
    
      // Show the div in 5s
      $("#notesucces").show();
      setTimeout(function() {
        $('#notesucces').fadeOut('fast');
    }, 3000); // <-- time in milliseconds
    }    
    function eroare() {
    
    
        // Show the div in 5s
        $("#note").show();
        setTimeout(function() {
          $('#notes').fadeOut('fast');
      }, 3000); // <-- time in milliseconds
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
<h3>Settings</h3>
<br></br>
  <div id="accordion">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h5 class="mb-0">
        <button class="btn" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Change password
        </button>
      </h5>
    </div>

    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body">
      <div id="notesucces">Password was change with succes!</div>
    <div id="note">Password change error!</div>
      
      {/* 
      
      <div className="input-group1">
       <label>Current password</label>
       <input 
       id="newpassword"
       type="password"
       onChange={(event) => setNewPassword(event.target.value)
       }></input>
       </div>
       
       */} 
       <div className="input-group1">
       <label>New password</label>
       <input 
       id="newpassword"
       type="password"
       onChange={(event) => {setNewPassword(event.target.value)
        window.localStorage.setItem('parola',event.target.value)}
       }></input>
       </div>

       {/* <div className="input-group1">
       <label>Confirm password</label>
       <input 
       id="newpassword"
       type="password"
       onChange={(event) => setNewPassword(event.target.value)
       }></input>
       </div> */}
      
       <button  className="btn btn-primary" onClick={()=>UpdateProfile()}>Change</button>
       
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingTwo">
      <h5 class="mb-0">
        <button class="btn  collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          About us
        </button>
      </h5>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
      <div class="card-body">
       
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header" id="headingThree">
      <h5 class="mb-0">
        <button class="btn  collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseTwo">
          Help
        </button>
      </h5>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
      <div class="card-body">
       
      </div>
    </div>
  </div>
 
</div>

   
</div>
</div>
  );
}
export default SettingsPage;

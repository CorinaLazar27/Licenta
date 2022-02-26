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

function ProfilePage() {
  
    const email=window.localStorage.getItem('email');
    const name=window.localStorage.getItem('nume');;
    const date=window.localStorage.getItem('data');
    const password=window.localStorage.getItem('parola');
    const location=window.localStorage.getItem('locatieprofil');
    const phonenumber=window.localStorage.getItem('numartelefon');

    const [locationupdate, setLocationUpdate] = useState("");
    const [phoneupdate, setPhoneUpdate] = useState("");

    
  window.onload = function exampleFunction() {
  
    document.getElementById('saveButton').style.visibility="hidden";
     document.getElementById('editButton').style.visibility="visible";
   
}
  

    function UnblockInputs()
    {
      document.getElementById('inputLocation').readOnly=false;
      document.getElementById('inputPhone').readOnly=false;
      document.getElementById('editButton').style.visibility="hidden";
      document.getElementById('saveButton').style.visibility="visible";
    }
    function UpdateProfile()
    {

      document.getElementById('inputLocation').readOnly=true;
      document.getElementById('inputPhone').readOnly=true;
      document.getElementById('editButton').style.visibility="visible";
      document.getElementById('saveButton').style.visibility="hidden";
            axios({
              method: "POST",
              url:"/updateprofile",
              data:{
                email: email,
                name:name,
                password:password,
                date:date,
                location:window.localStorage.getItem('locatieprofil'),
                phonenumber:window.localStorage.getItem('numartelefon')
                
               }
            })
            .then((response) => {
              if(response.data=="Done")
              notificare();
            
              console.log(response.data);
            
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

const [image, setImage] = useState({ preview: "", raw:""});

const handleChange = e => {
  if (e.target.files.length) {
    setImage({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0]
    });

   
  }
};

const handleUpload = async e => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("image", image.raw);
  console.log(formData);
 
  localStorage.setItem("imgPreview", image.preview);
  localStorage.setItem("imgRaw", image.raw);
 
  await fetch("YOUR_URL", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: formData
  });
};
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
        <h3>My profile</h3>
       

        <div className="container-xl px-4 mt-4">
        <div id="notesucces">Profile updates saved with succes!</div>
    <div id="note">Profile change error!</div>
    <hr className="mt-0 mb-4"/>
    <div className="row">
      {/*  <div className="col-xl-4">
          
            <div className="card mb-4 mb-xl-0">
                <div className="card-header">Profile Picture</div>
                <div className="card-body text-center">
            
                   <div>


      <label htmlFor="upload-button">
        {image.preview ? (
          <img src={image.preview} alt="dummy"  className="img-account-profile rounded-circle mb-2" />
        ) : (
          <>
            <span className="fa-stack fa-2x mt-3 mb-2">
              <i className="fas fa-circle fa-stack-2x" />
              <i className="fas fa-store fa-stack-1x fa-inverse" />
            </span>
            <h5 className="text-center">Upload your photo..</h5>
          </>
        )}
      </label>
      <input
        type="file"
        id="upload-button"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <br />
      <button className="btn btn-primary" onClick={handleUpload} type="button">Upload</button>
    
    </div>
                </div>
            </div>
        </div>
  
        */}
        <div className="col-xl-16">
         
            <div className="card mb-3">
                <div className="card-header">Account Details</div>
                <div className="card-body">
                    <form>
                       
                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="inputUsername" >Name</label>
                            <input className="form-control" id="inputUsername" type="text" placeholder={"Enter your username"} value={name} readOnly/>
                        </div>
                      
                       
                       
                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputOrgName">Email address</label>
                                <input className="form-control" id="inputEmailAddress" type="email"  value={email} readOnly/>
                            </div>
                           
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputLocation">Location</label>
                                <input className="form-control" id="inputLocation" type="text" defaultValue={location}
                                   onChange={(event) => {setLocationUpdate(event.target.value)
                                    window.localStorage.setItem('locatieprofil',event.target.value)}}
                                    readOnly
                                    />
                            </div>
                        </div>
                      
                      
                        <div className="row gx-3 mb-3">
                          
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputPhone">Phone number</label>
                                <input className="form-control" id="inputPhone" type="tel" defaultValue={phonenumber} 
                                 onChange={(event) => {setPhoneUpdate(event.target.value)
                                  window.localStorage.setItem('numartelefon',event.target.value)}}
                                  readOnly/>
                            </div>
                          
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputBirthday">Registration date</label>
                                <input className="form-control" id="inputBirthday" type="text" name="birthday" value={date}
                                  readOnly/>
                            </div>
                        </div>
                      
               
                        <button id="saveButton" className="btn btn-primary" type="button" onClick={()=>UpdateProfile()}>Save changes</button>
                    </form>
                    
                    <button id="editButton" className="btn btn-primary" type="button" onClick={()=>UnblockInputs()}>Edit</button>
                </div>
            </div>
        </div>
    </div>
</div>


     
</div>
</div>
  );
}
export default ProfilePage;

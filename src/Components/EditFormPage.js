import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Image/logo.png"
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Dropdown from 'react-dropdown';
 import {CircleArrow as ScrollUpButton} from "react-scroll-up-button"; 
import 'react-dropdown/style.css';
import axios from "axios";
import $ from 'jquery';


function EditFormPage() {

    const history = useHistory();
    const event=window.localStorage.getItem('eveniment');
    const email=window.localStorage.getItem('email');
    const location=window.localStorage.getItem('locatie');
    const date=window.localStorage.getItem('dataeveniment');
    const ringDance=window.localStorage.getItem('ringdans');
    const drinks=window.localStorage.getItem('bauturi');
    const fruitsbar=window.localStorage.getItem('fruitsbar');
    const candybar=window.localStorage.getItem('candybar');
    const video=window.localStorage.getItem('video');
    const photographer=window.localStorage.getItem('fotograf');
    const artisticmoment=window.localStorage.getItem('momentartistic');
    const budget=window.localStorage.getItem('buget');
    const guests=window.localStorage.getItem('invitati');
    const liveband=window.localStorage.getItem('liveband');
  
    $(document).ready(function() {

        document.getElementById('saveButton').style.visibility="hidden";
        document.getElementById('editButton').style.visibility="visible";
       
    
    });
    
  
      function UnblockInputs()
      {
         document.getElementById('location').readOnly=false;
         document.getElementById('budget').readOnly=false;
         document.getElementById('numberofguests').readOnly=false;
         document.getElementById('liveband').readOnly=false;
         document.getElementById('artisticmoment').readOnly=false;
         document.getElementById('photographer').readOnly=false;
         document.getElementById('video').readOnly=false;
         document.getElementById('candybar').readOnly=false;
         document.getElementById('fruitsbar').readOnly=false;
         document.getElementById('drinks').readOnly=false;
         document.getElementById('ringDance').readOnly=false;

        document.getElementById('saveButton').style.visibility="visible";
        document.getElementById('editButton').style.visibility="hidden";
      }
 
  function UpdateForm() {
   

    document.getElementById('saveButton').style.visibility="hidden";
    document.getElementById('editButton').style.visibility="visible";

    document.getElementById('location').readOnly=true;
    document.getElementById('budget').readOnly=true;
    document.getElementById('numberofguests').readOnly=true;
    document.getElementById('liveband').readOnly=true;
    document.getElementById('artisticmoment').readOnly=true;
    document.getElementById('photographer').readOnly=true;
    document.getElementById('video').readOnly=true;
    document.getElementById('candybar').readOnly=true;
    document.getElementById('fruitsbar').readOnly=true;
    document.getElementById('drinks').readOnly=true;
    document.getElementById('ringDance').readOnly=true;

    event=window.localStorage.getItem('eveniment');
    email=window.localStorage.getItem('email');
    location=window.localStorage.getItem('locatie');
    date=window.localStorage.getItem('dataeveniment');
    ringDance=window.localStorage.getItem('ringdans');
    drinks=window.localStorage.getItem('bauturi');
    fruitsbar=window.localStorage.getItem('fruitsbar');
    candybar=window.localStorage.getItem('candybar');
    video=window.localStorage.getItem('video');
    photographer=window.localStorage.getItem('fotograf');
    artisticmoment=window.localStorage.getItem('momentartistic');
    budget=window.localStorage.getItem('buget');
    guests=window.localStorage.getItem('invitati');
    liveband=window.localStorage.getItem('liveband');

    axios({
      method: "POST",
      url:"/updateform",
      data:{
        email: email,
        event:event,
        date:date,
        nrguests:guests,
        location:location,
        budget:budget,
        liveband:liveband,
        artisticmoment:artisticmoment,
        photographer:photographer,
        videorecording:video,
        candybar:candybar,
        fruitsbar:fruitsbar,
        drinks:drinks,
        ringdance:ringDance
       }
    })
    .then((response) => {
     const res =response.data
     console.log(res);
     if(res=="Done")
     {
         console.log("dONE");
       //  history.push("/myeventpage");
     }
    
    }).catch((error) => {
      if (error.response) {
      
        console.log(error.response)
       console.log(error.response.status)
       console.log(error.response.headers)
        }
    })
   
 
  
  }
  
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
  
    <hr className="mt-0 mb-4"/>
    <div className="row">
      
        <div className="col-xl-8">
         
            <div className="card mb-4">
                <div className="card-header">{event}</div>
                <div className="card-body">
                    <form>
                       
                    <div className="row gx-3 mb-3">
                          
                          <div className="col-md-6">
                              <label className="small mb-1" htmlFor="location" >Location</label>
                              <input className="form-control" id="location" type="text" defaultValue={location}
                              onChange={(event) =>  window.localStorage.setItem('locatie',event.target.value)}
                             readOnly />
                          </div>
                        
                          <div className="col-md-6">
                              <label className="small mb-1" htmlFor="budget">Budget</label>
                              <input className="form-control" id="budget" type="text" name="budget" 
                              defaultValue={budget}
                              onChange={(event) =>  window.localStorage.setItem('buget',event.target.value)}
                              readOnly
                               />
                          </div>
                      </div>
                    
                       
                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="date">Date</label>
                                <input className="form-control" id="date" type="date"
                                defaultValue={date} readOnly
                                />
                                
                            </div>
                           
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="numberofguests">Number of guests</label>
                                <input className="form-control" id="numberofguests" type="text"
                                defaultValue={guests} 
                                onChange={(event) =>  window.localStorage.setItem('invitati',event.target.value)}
                                readOnly
                                    />
                            </div>
                        </div>
                      
                      
                        <div className="row gx-3 mb-3">
                          
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="liveband">Live Band</label>
                                <input className="form-control" id="liveband" 
                                 defaultValue={liveband} 
                                 onChange={(event) =>  window.localStorage.setItem('liveband',event.target.value)}
                                 readOnly
                                />
                            </div>
                          
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="artisticmoment">Artistic Moment</label>
                                <input className="form-control" id="artisticmoment"  name="birthday" 
                                 defaultValue={artisticmoment}
                                 onChange={(event) =>  window.localStorage.setItem('momentartistic',event.target.value)} 
                                 readOnly
                                  />
                            </div>
                        </div>

                        <div className="row gx-3 mb-3">
                          
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="photographer">Photographer</label>
                                <input className="form-control" id="photographer"
                                defaultValue={photographer}
                                onChange={(event) =>  window.localStorage.setItem('fotograf',event.target.value)}
                                readOnly
                                />
                            </div>
                          
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="video">Video Recording</label>
                                <input className="form-control" id="video" name="birthday" 
                                 defaultValue={video}
                                 onChange={(event) =>  window.localStorage.setItem('video',event.target.value)} 
                                 readOnly
                                />
                            </div>
                        </div>
                      

                        <div className="row gx-3 mb-3">
                          
                          <div className="col-md-6">
                              <label className="small mb-1" htmlFor="candybar">Candy Bar</label>
                              <input className="form-control" id="candybar" 
                               defaultValue={candybar}
                               onChange={(event) =>  window.localStorage.setItem('candybar',event.target.value)} 
                               readOnly
                              />
                          </div>
                        
                          <div className="col-md-6">
                              <label className="small mb-1" htmlFor="fruitsbar">Fruits Bar</label>
                              <input className="form-control" id="fruitsbar"  name="fruitsbar" 
                               defaultValue={fruitsbar}
                               onChange={(event) =>  window.localStorage.setItem('fruitsbar',event.target.value)} 
                               readOnly
                                />
                          </div>
                      </div>
                    

                      <div className="row gx-3 mb-3">
                          
                          <div className="col-md-6">
                              <label className="small mb-1" htmlFor="drinks">Drinks</label>
                              <input className="form-control" id="drinks" 
                               defaultValue={drinks}
                               onChange={(event) =>  window.localStorage.setItem('bauturi',event.target.value)} 
                               readOnly
                              />
                          </div>
                        
                          <div className="col-md-6">
                              <label className="small mb-1" htmlFor="ringDance">Ring Dance</label>
                              <input className="form-control" id="ringDance" name="ringDance" 
                               defaultValue={ringDance}
                               onChange={(event) =>  window.localStorage.setItem('ringdans',event.target.value)} 
                               readOnly
                                />
                          </div>
                      </div>
                    
                      
                        <button id="saveButton" className="btn btn-primary" type="button" onClick={()=>UpdateForm()} >Save changes</button>
                        
                           
                        
                    </form>
                    <button id="editButton" className="btn btn-primary" type="button" onClick={()=>UnblockInputs()}>Edit</button>
                </div>
            </div>
        </div>
    </div>
</div>

         
   </div>
 
  
  );
}
export default EditFormPage;

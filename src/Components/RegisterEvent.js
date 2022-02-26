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


import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

function RegisterEventPage() {

  const [open, setOpen] = React.useState(false);
  
  const handleClickToOpen = () => {
    setOpen(true);
  };
  
  const handleToClose = () => {
    setOpen(false);
  };

  const history = useHistory();
  const email=window.localStorage.getItem('email');
  const [event, setEvent] = useState("");
  const [date, setDate] = useState("");
  const [nrguests, setNrGuests] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [liveBand, setLiveBand] = useState("");
  const [artisticMoment, setArtisticMoment] = useState("");
  const [photographer, setPhotographer] = useState("");
  const [videoRecording, setVideoRecording] = useState("");
  const [candyBar, setCandyBar] = useState("");
  const [fruitsBar, setfruitsBar] = useState("");
  const [drinks, setDrinks] = useState("");
  const [ringDance, setRingDance] = useState("");
  const [dialogBox, setDialogBox]=useState(Boolean);

  function FormOptions() {
   

    axios({
      method: "POST",
      url:"/postform",
      data:{
        email: email,
        event:event,
        date:date,
        nrguests:nrguests,
        location:location,
        budget:budget,
        liveband:liveBand,
        artisticmoment:artisticMoment,
        photographer:photographer,
        videorecording:videoRecording,
        candybar:candyBar,
        fruitsbar:fruitsBar,
        drinks:drinks,
        ringdance:ringDance
       }
    })
    .then((response) => {
     const res =response.data
     console.log(res);
     if(res=="Done")
     {handleClickToOpen();
     setDialogBox(true);
     console.log(dialogBox);}
    
    }).catch((error) => {
      if (error.response) {
      
        console.log(error.response)
       console.log(error.response.status)
       console.log(error.response.headers)
        }
    })
   
 
  
  }
  
  function ShowFormValues()
  {
  
   console.log("----------------------------");
    console.log("Eveniment:"+event);
    console.log("Data:"+date);
    console.log("Numar invitati:"+nrguests);
    console.log("Locatie:"+location);
    console.log("Buget:"+budget);
    console.log("Band Live:"+liveBand);
    console.log("Moment artistic:"+artisticMoment);
    console.log("Fotograf:"+photographer);
    console.log("Video:"+videoRecording);
    console.log("Candy Bar:"+candyBar);
    console.log("Bar fructe:"+fruitsBar);
    console.log("Bauturi:"+drinks);
    console.log("Ring dans:"+ringDance);
    console.log("----------------------------");
    FormOptions();

    
    //history.push("myeventpage");
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
    <ScrollUpButton
      StopPosition={0}
      ShowAtPosition={150}
      EasingType='easeOutCubic'
      AnimationDuration={2}
      ContainerClassName='ScrollUpButton__Container'
      TransitionClassName='ScrollUpButton__Toggled'
      style={{}}
      ToggledStyle={{}}
    />
       <form className="form1" >
         <h3>Register Your Event</h3>
        <br></br>
         <div className="input-group1">
            <label  htmlFor="event" >Type of Event</label>
        
            <select name="event" id="event" placeholder="Select an option"  required onChange={(event) => {setEvent(event.target.value)}}>
            <option value="">Select your option</option>
            <option value="Wedding">Wedding</option>
             <option value="Christening">Christening</option>
             <option value="Birthday">Birthday</option>
        
            </select>
      
          </div>
  
         <div className="input-group1">
         <label >Number of guests</label>
           <input
             id="nrguests"
             type="nrguests"
             name="nrguests"
             onChange={(event) => {setNrGuests(event.target.value)}}
             
           />
           </div>
           <div className="input-group1">
         <label >Date</label>
           <input
             id="date"
             type="date"
             name="date"
             onChange={(event) => {setDate(event.target.value)}}
             required
           />
         </div>
         <div className="input-group1">
         <label >Favorite location</label>
           <input
             id="location"
             type="location"
             name="location"
             onChange={(event) => {setLocation(event.target.value)}}
           />
         </div>
  
         <div className="input-group1">
         <label htmlFor="budget">Budget</label>
           <input
             id="budget"
             type="budget"
             name="budget"
             onChange={(event) => {setBudget(event.target.value)}}
           />
           
         </div>
        
        
          <div className="input-group1">
        <label htmlFor="band">Live Band</label>
        
         <input type="radio" value="Yes" name="band" id="band" className="radio"  onChange={(event) => {setLiveBand(event.target.value)}}/> Yes
         <input type="radio" value="No" name="band" id="band" className="radio" onChange={(event) => {setLiveBand(event.target.value)}} /> No
        
         </div>
         <div className="input-group1">
        <label htmlFor="artisticmoment" >Artistic moment</label>
         <input id="artisticmoment" type="radio" value="Yes" name="artisticmoment" className="radio" onChange={(event) => {setArtisticMoment(event.target.value)}}/> Yes
         <input  id="artisticmoment" type="radio" value="No" name="artisticmoment" className="radio" onChange={(event) => {setArtisticMoment(event.target.value)}}/> No
         </div>
         <div className="input-group1">
        <label htmlFor="photographer">Photographer</label>
         <input id="photographer" type="radio" value="Yes" name="photographer" className="radio" onChange={(event) => {setPhotographer(event.target.value)}} /> Yes
         <input id="photographer" type="radio" value="No" name="photographer" className="radio" onChange={(event) => {setPhotographer(event.target.value)}}/> No
         </div>
         <div className="input-group1">
        <label htmlFor="videorecording">Video Recording</label>
         <input id="videorecording" type="radio" value="Yes" name="videorecording" className="radio" onChange={(event) => {setVideoRecording(event.target.value)}}/> Yes
         <input  id="videorecording" type="radio" value="No" name="videorecording"  className="radio" onChange={(event) => {setVideoRecording(event.target.value)}}/> No
         </div>
         <div className="input-group1">
        <label htmlFor="candybar">Candy Bar</label>
         <input id="candybar" type="radio" value="Yes" name="candybar" className="radio" onChange={(event) => {setCandyBar(event.target.value)}}/> Yes
         <input id="candybar" type="radio" value="No" name="candybar" className="radio" onChange={(event) => {setCandyBar(event.target.value)}}/> No
         </div>
         <div className="input-group1">
        <label htmlFor="fruitsbar" >Fruits Bar</label>
         <input id="fruitsbar" type="radio" value="Yes" name="fruitsbar" className="radio" onChange={(event) => {setfruitsBar(event.target.value)}}/> Yes
         <input id="fruitsbar" type="radio" value="No" name="fruitsbar" className="radio" onChange={(event) => {setfruitsBar(event.target.value)}}/> No
         </div>
       <div className="input-group1">   
       <label htmlFor="drinks">Drinks</label>
       <select name="drinks" id="drinks" placeholder="Select an option"
        onChange={(event) => {setDrinks(event.target.value)}}>
          <option value="">Select your option</option>
          <option value="At the table">At the table</option>
          <option value="Bar with bartender">Bar with bartender</option>
         
        </select>
      
   
    </div>
    <div className="input-group1">  
       <label htmlFor="ringdance" >Ring Dance</label>
          
          <select name="ringdance" id="ringdance" placeholder="Select an option"
           onChange={(event) => {setRingDance(event.target.value)}}>
          <option value="">Select your option</option>
          <option value="Dominant">Dominant</option>
          <option value="Restricted">Restricted</option>
        
         </select>
   <br></br>
    </div>
         
   </form>
  
   <button className="secondary" onClick={()=>ShowFormValues()}>Submit your Event</button>
  
      <Dialog open={open} onClose={handleToClose}>
        <DialogTitle>{"Do you want to invite people?"}</DialogTitle>
       
        <DialogActions>
          <Button onClick={()=>history.push("/sendinvitationspage")} 
                  color="primary" autoFocus>
        Yes
          </Button>
          <Button onClick={()=>history.push("/myeventpage")} 
                  color="primary" autoFocus>
            Not now
          </Button>
        </DialogActions>
      </Dialog>


</div>
</div>
  );
}
export default RegisterEventPage;

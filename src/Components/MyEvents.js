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


import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

function MyEventPage() {
    const history = useHistory();
    const [reload,setReload]=useState("1");
    const [data, setData] = useState([]);
    const [dateForDelete, setDateForDelete] = useState("");
    const email=window.localStorage.getItem('email');

    const [open, setOpen] = React.useState(false);
  
    const handleClickToOpen = () => {
      setOpen(true);
    };
    
    const handleToClose = () => {
      setOpen(false);
    };

    window.onload = function exampleFunction() {
  
    GetMyEvents();
    //window.location.reload();
 
     
     
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

    
    function DeleteEvent() {
    
      axios({
        method: "POST",
        url:"/deleteevent",
        data:{
          email: email,
          date: dateForDelete
         }
      })
      .then((response) => {
      
        if(response.data=="Done")
          {
            handleToClose();
            window.location.reload(false);
            notificare();
          }

      }).catch((error) => {
        if (error.response) {
        
          eroare();
        
         
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
      setOpen(false);
     
      }  
  

  

 /* var mainListDiv = document.getElementById("mainListDiv"),
  mediaButton = document.getElementById("mediaButton");

mediaButton.onclick = function () {
  
  "use strict";
  
  mainListDiv.classList.toggle("show_list");
  mediaButton.classList.toggle("active");

};*/
function myClick(event){
  setDateForDelete(event.RowKey);
  handleClickToOpen();
  window.localStorage.setItem('eveniment',event.EventType);
  window.localStorage.setItem('locatie',event.Location);
  window.localStorage.setItem('invitati',event.NumberGuests);
  window.localStorage.setItem('buget',event.Budget);
  window.localStorage.setItem('momentartistic',event.ArtisticMoment);
  window.localStorage.setItem('fotograf',event.Photographer);
  window.localStorage.setItem('video',event.VideoRecording);
  window.localStorage.setItem('candybar',event.CandyBar);
  window.localStorage.setItem('fruitsbar',event.FruitsBar);
  window.localStorage.setItem('bauturi',event.Drinks);
  window.localStorage.setItem('ringdans',event.RingDance);
  window.localStorage.setItem('dataeveniment',event.RowKey);
  window.localStorage.setItem('liveband',event.LiveBand);
  
}
  return (

    <div className="nav">
       <div  className="container">
        <div  className="logo">
          
            <a href="#">Event</a>
        </div>
        <div  className="main_list" id="mainListDiv">
            <ul>
                <li><a href="/homepage">Home</a></li>
                <li><a href="/registerevent">Register event</a></li>
                <li><a href="/myeventpage">My events</a></li>
                <li><a href="/profilepage">Profile</a></li>
                <li><a href="/settingspage">Settings</a></li>
                <li><a href="/sign-in" onClick={()=>window.localStorage.clear()}>Log out</a></li>
          
            </ul>
        </div>
        <div  className="media_button">
            <button  className="main_media_button" id="mediaButton">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
        </div>
        
    <div className="home1">
    <div id="notesucces">Event deleted with succes!</div>
    <div id="note">Error at delete event, try again!</div>
   
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
                                <td onClick={()=>myClick(item)}>{item.EventType}</td>
                                <td onClick={()=>myClick(item)}>{item.RowKey}</td>
          
                            </tr>
                        ))
                    }
    </tbody>

     </table>

     
     <br></br>
     <button className="table"  onClick={()=> history.push('/registerevent')} >Add an event</button>
                    
     <Dialog open={open} onClose={handleToClose}>
        <DialogTitle>{"What do you want to do?"}</DialogTitle>
               
        <DialogActions>
          <Button onClick={()=>history.push("/editformpage")} 
                  color="primary" autoFocus>
       Edit
          </Button>
          <Button onClick={()=>DeleteEvent()} 
                  color="primary" autoFocus>
           Delete
          </Button>
        </DialogActions>
      </Dialog>

      
  
</div>
</div>
  );
}
export default MyEventPage;

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import Header from "./Header";

import axios from "axios";

function HomePage() {
  const history = useHistory();
  const email = window.localStorage.getItem("email");
  const nume = window.localStorage.getItem("nume");
  var mainListDiv = document.getElementById("mainListDiv");
  var mediaButton = document.getElementById("mediaButton");
  var note = document.getElementById("note");

  const [data, setData] = useState("");
  function GetElements(event) {
    axios({
      method: "GET",
      url: "/elements",
    })
      .then((response) => {
        //console.log(response.data.results);
        setData(response.data.results);
        console.log(response);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });

    event.preventDefault();
  }

  window.onload = GetElements;

  return (
    <nav className="nav">
      <Header />
      <div className="home1">
        <h3>Salut, {nume}!</h3>
        <br></br>
        <div>
          <button
            className="button1"
            onClick={() => history.push("/registerevent")}
          >
            Eveniment nou
          </button>
        </div>
        <br></br>
        <div>
          <button
            className="button1"
            onClick={() => {
              history.push("/myeventpage");
              history.go(0);
            }}
          >
            Evenimentele mele
          </button>
        </div>
      </div>
    </nav>
  );
}
export default HomePage;

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Image/logo.png";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Dropdown from "react-dropdown";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import "react-dropdown/style.css";

function SendInvitationsPage() {
  const history = useHistory();

  const [inputList, setInputList] = useState([{ emailInvitat: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { emailInvitat: "" }]);
  };

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
            <li>
              <a href="/homepage">Home</a>
            </li>
            <li>
              <a href="/registerevent">Register event</a>
            </li>
            <li>
              <a href="/myeventpage">My events</a>
            </li>
            <li>
              <a href="/profilepage">Profile</a>
            </li>
            <li>
              <a href="/settingspage">Settings</a>
            </li>
            <li>
              <a href="/sign-in" onClick={() => window.localStorage.clear()}>
                Log out
              </a>
            </li>
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
        <form>
          {inputList.map((x, i) => {
            return (
              <div className="box">
                <div>
                  <input
                    name="emailInvitat"
                    placeholder="Enter email"
                    class="survey_options"
                    value={x.emailInvitat}
                    onChange={(e) => handleInputChange(e, i)}
                  />

                  <div className="btn-box">
                    {inputList.length !== 1 && (
                      <div class="controls">
                        <button
                          id="remove_fields"
                          className="fa fa-minus"
                          onClick={() => handleRemoveClick(i)}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                  {inputList.length - 1 === i && (
                    <div class="controls">
                      <button className="fa fa-plus" onClick={handleAddClick}>
                        Add
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
        </form>
      </div>
    </div>
  );
}
export default SendInvitationsPage;

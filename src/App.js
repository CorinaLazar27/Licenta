import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SingIn from "./Components/SignIn";
import SingUp from "./Components/Singup";
import HomePage from "./Components/HomePage";
import RegisterEventPage from "./Components/RegisterEvent";
import MyEventPage from "./Components/MyEvents";
import InvitatiPage from "./Components/InvitatiPage";
import SettingsPage from "./Components/SettingsPage";
import SendInvitationsPage from "./Components/SendInvitationsPage";
import EditFormPage from "./Components/EditFormPage";
import ResultPage from "./Components/ResultPage";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SingIn} />
        <Route exact path="/sign-in" component={SingIn} />
        <Route exact path="/sign-up" component={SingUp} />
        <Route exact path="/homepage" component={HomePage} />
        <Route exact path="/registerevent" component={RegisterEventPage} />
        <Route exact path="/myeventpage" component={MyEventPage} />
        <Route exact path="/invitatipage" component={InvitatiPage} />
        <Route exact path="/settingspage" component={SettingsPage} />
        <Route
          exact
          path="/sendinvitationspage"
          component={SendInvitationsPage}
        />
        <Route exact path="/editformpage" component={EditFormPage} />
        <Route exact path="/resultpage" component={ResultPage} />
      </Switch>
    </Router>
  );
}

export default App;

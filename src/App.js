import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SingIn from "./Components/SignIn";
import SingUp from "./Components/Singup";
import HomePage from "./Components/HomePage";
import RegisterEventPage from "./Components/RegisterEvent";
import MyEventPage from "./Components/MyEvents";
import OpiniiPage from "./Components/OpiniiPage";
import SettingsPage from "./Components/SettingsPage";
import SendInvitationsPage from "./Components/SendInvitationsPage";
import EditFormPage from "./Components/EditFormPage";
import ResultPage from "./Components/ResultPage";
import RecommendPage from "./Components/RecommendPage";
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
        <Route exact path="/opiniipage" component={OpiniiPage} />
        <Route exact path="/settingspage" component={SettingsPage} />
        <Route exact path="/recommandpage" component={RecommendPage} />
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

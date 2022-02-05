import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SingIn from './Components/SignIn';
import SingUp from './Components/Singup';
import HomePage from './Components/HomePage';
import RegisterEventPage from './Components/RegisterEvent';
import MyEventPage from './Components/MyEvents';

function App() {
  return (
    
    <Router>
   
     
          <Switch>
            <Route exact path='/' component={SingIn} />
            <Route exact path="/sign-in" component={SingIn} />
            <Route exact path="/sign-up" component={SingUp} />
            <Route exact path="/homepage" component={HomePage} />
            <Route exact path="/registerevent" component={RegisterEventPage}/>
            <Route exact path="/myeventpage" component={MyEventPage}/>
           
          </Switch>
       
    </Router>
 
  
  );
}

export default App;

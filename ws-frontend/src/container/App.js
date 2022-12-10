import React from 'react';
import UserSignUpPage from '../pages/UserSignUpPage';
import LoginPage from '../pages/LoginPage';
import UserPage from '../pages/UserPage';
import { Route, Redirect, Switch, HashRouter as Router } from 'react-router-dom'
import HomePage from '../pages/HomePage';
import TopBar from '../components/TopBar';


function App() {
  return (
    <div className="row">
      <Router>
        <TopBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={UserSignUpPage} />
          <Route path="/user/:username" component={UserPage} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

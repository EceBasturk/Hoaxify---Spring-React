import React from 'react';
import UserSignUpPage from '../pages/UserSignUpPage';
import LoginPage from '../pages/LoginPage';
import UserPage from '../pages/UserPage';
import { Route, Redirect, Switch, HashRouter as Router } from 'react-router-dom'
import HomePage from '../pages/HomePage';
import TopBar from '../components/TopBar';
import { useSelector } from 'react-redux';

const App = () => {
  const { isLoggedIn } = useSelector(store => ({
    isLoggedIn: store.isLoggedIn
  }));

  return (
    <div>
      <Router>
        <TopBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          {!isLoggedIn && <Route path="/login" component={LoginPage} />}
          <Route path="/signup" component={UserSignUpPage} />
          <Route path="/user/:username" component={UserPage} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
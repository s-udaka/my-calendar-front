import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import './App.css';
import Login from './components/pages/Login';
import UserCreate from './components/pages/UserCreate';
import Home from './components/pages/Home';
import SignUpConfirm from './components/pages/SignUpConfirm';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={UserCreate} exact />
        <Route path="/signupConf" component={SignUpConfirm} exact />
        <Route path="/home" component={Home} exact />
        <Route path="/" component={Login} exact />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;

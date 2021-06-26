import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={SignUp} exact />
        <Route path="/" component={SignIn} exact />
      </Switch>
    </Router>
  );
}

export default App;

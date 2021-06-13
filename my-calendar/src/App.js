import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/signup'>
          <CreateAccount />
        </Route>
        <Route path='/'>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

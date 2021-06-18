import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import CreateAccount from './pages/CreateAccount';
import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <Route path='/'>
          <SignIn />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

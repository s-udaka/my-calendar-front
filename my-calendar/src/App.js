import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';
import { Main } from './pages/Main';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <Route path='/main'>
          <Main />
        </Route>
        <Route path='/'>
          <SignIn />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

import './App.css';

import Home from './Components/Stream/Home/Home';
import Dashboard from './Components/Dashboard/Dashboard';
import Stream from './Components/Stream/Stream/Stream';
import {


  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
 

 

  return (
    <div className="App-header">
      <Router>
      <Switch>
          <Route path="/stream">
            <Stream/>
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        </Router>
   
    </div>    
  );
}

export default App;

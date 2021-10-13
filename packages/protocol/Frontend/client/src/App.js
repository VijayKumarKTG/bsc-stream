import './App.css';
import Home from './Components/Stream/Home/Home';
import Dashboard from './Components/Dashboard/Dashboard';
import Stream from './Components/Stream/Stream/Stream';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { AccountContext } from './context/AccountContext';

function App() {
  const [account, setAccount] = useState('');

  const changeAccount = (newAccount) => {
    setAccount(newAccount);
  };

  const contextValue = {
    account,
    changeAccount,
  };

  window.ethereum.on('accountsChanged', function (accounts) {
    if (accounts[0].toLowerCase() !== account.toLocaleLowerCase()) {
      changeAccount(accounts[0]);
    }
  });

  return (
    <AccountContext.Provider value={contextValue}>
      <div className='App-header'>
        <Router>
          <Switch>
            <Route path='/stream'>
              <Stream />
            </Route>
            <Route path='/dashboard'>
              <Dashboard />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    </AccountContext.Provider>
  );
}

export default App;

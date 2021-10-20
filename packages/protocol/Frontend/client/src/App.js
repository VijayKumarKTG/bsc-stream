import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import Stream from './Components/Stream/Stream/Stream';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AccountContext } from './context/AccountContext';
import Navbar from './Components/Navbar/Navbar'
import FrontPage from './Components/FrontPage/FrontPage'
function App({ history }) {
  const [account, setAccount] = useState('');
  const [chainId, setChainId] = useState('');

  useEffect(() => {
    const setChain = async () => {
      const chainID = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainID === '0x61' || chainID === '97') {
        setChainId(chainID);
      }
    };
    setChain();
  }, []);

  const changeAccount = (newAccount) => {
    setAccount(newAccount);
  };

  const contextValue = {
    account,
    changeAccount,
  };

  window.ethereum.on('accountsChanged', function (accounts) {
    if (
      accounts[0] &&
      accounts[0].toLocaleLowerCase() !== account.toLocaleLowerCase()
    ) {
      changeAccount(accounts[0]);
    } else {
      changeAccount('');
    }
  });

  window.ethereum.on('chainChanged', (chainID) => {
    window.location.reload();
  });

  const changeChain = () => {
    window.ethereum
      .request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x61',
            chainName: 'BSC Testnet',
            nativeCurrency: {
              name: 'Binance Coin',
              symbol: 'BNB',
              decimals: 18,
            },
            rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
          },
        ],
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AccountContext.Provider value={contextValue}>
      <div className='App-header'>
        {chainId !== '0x61' && (
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              width: '100%',
              zIndex: '10',
            }}>
            Please change your blockchain network to{' '}
            <span
              style={{ color: 'blue', cursor: 'pointer', fontWeight: 'bold' }}
              onClick={changeChain}>
              BSC Testnet
            </span>
          </div>
        )}
        <Router>
          <Switch>
            <Route path='/stream'>
              <Stream />
            </Route>
            <Route path='/dashboard'>
              <Dashboard />
            </Route>
            <Route path='/'>
              <Navbar/>
              <FrontPage/>
            </Route>
          </Switch>
        </Router>
      </div>
    </AccountContext.Provider>
  );
}

export default App;

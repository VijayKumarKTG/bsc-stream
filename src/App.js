import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { message } from 'antd';
import { AccountContext } from './context/AccountContext';
import Navbar from './Components/Navbar/Navbar';
import Dashboard from './Components/Dashboard/Dashboard';
import HomePage from './Components/HomePage/HomePage';
import './App.less';

function App() {
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
    setChainId(chainID);
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
        message.error(error);
      });
  };

  return (
    <AccountContext.Provider value={contextValue}>
      <div className='App-header'>
        <Router>
          <Navbar />
          <Switch>
            <Route path='/dashboard'>
              <Dashboard chainId={chainId} changeChain={changeChain} />
            </Route>
            <Route path='/'>
              <HomePage />
            </Route>
          </Switch>
        </Router>
      </div>
    </AccountContext.Provider>
  );
}

export default App;

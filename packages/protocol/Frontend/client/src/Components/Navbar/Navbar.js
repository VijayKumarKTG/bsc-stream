import React from 'react';
import { Link,withRouter } from 'react-router-dom';
import { Button, Tabs, Drawer,message } from 'antd';
import { useState, useContext,useEffect } from 'react';
import { AccountContext } from '../../context/AccountContext';
import image from '../../images/Group 5458.png';
import logo1 from '../../images/collection.svg';
import logo2 from '../../images/idea (5).svg';
import logo3 from '../../images/trending.svg';
import { connectWallet } from '../../helpers/wallet';
import './Navbar.less';

const { TabPane } = Tabs;
const tabsAddress = {
  1: '/',
  2: '/dashboard',
  3: '/about',
};

const Navbar = ({history,location}) => {
  const {account,changeAccount} = useContext(AccountContext);
  const [activeKey, setActiveKey] = useState('1');
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);

  useEffect(() => {
    if (location.pathname.includes('/about')) {
      setActiveKey('3');
    }else if (location.pathname.includes('/dashboard')) {
      setActiveKey('2');
    }else if (location.pathname.includes('/')) {
      setActiveKey('1');
    }
  }, []);

  const tabChanged = (key) => {
    setActiveKey(key);
    setToggleMobileMenu(false);
    history.push(tabsAddress[key]);
  };

  const onConnectWallet = async () => {
    let response = await connectWallet();
    if (response.status) {
      changeAccount(response.account);
      message.success('Successfully connected!')
    } else {
      message.error('Something went wrong!');
    }
  };

  const onClickToggleMobileMenu = () => setToggleMobileMenu(!toggleMobileMenu);

  const navlist = (
    <div
      className='tabs-container'>
      <Tabs
        activeKey={activeKey}
        onChange={tabChanged}
        tabBarGutter={42}
        animated={false}>
        <TabPane
          tab={
            <span className='nav-item-text'>
              <img src={logo1} alt='fire icon' />
              Home
            </span>
          }
          key='1'
        />
        <TabPane
          tab={
            <span className='nav-item-text'>
              <img src={logo2} alt='fire icon' />
              Dashboard
            </span>
          }
          key='2'
        />
        <TabPane
          tab={
            <span className='nav-item-text'>
              <img src={logo3} alt='fire icon' />
              About
            </span>
          }
          key='3'
        />
      </Tabs>
      {!account ? (
        <Button
          className='wallet'
          onClick={onConnectWallet}>CONNECT WALLET
        </Button>
      ):(
        <div className="account" title={account}>{`${account.slice(0,15)}...`}</div>
      )}
    </div>
  );
  
  return (
    <div>
      <div className='nav-container'>
          <Link to='/'>
            <img
              className='logo'
              src={image}
              alt='Pandora BSC Stream logo'
            />
          </Link>
        {toggleMobileMenu ? (
          <svg
            onClick={onClickToggleMobileMenu}
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='#000000'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='feather feather-x menu'>
            <line x1='18' y1='6' x2='6' y2='18'></line>
            <line x1='6' y1='6' x2='18' y2='18'></line>
          </svg>
        ) : (
          <svg
            onClick={onClickToggleMobileMenu}
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='#000000'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='feather feather-menu menu'>
            <line x1='3' y1='12' x2='21' y2='12'></line>
            <line x1='3' y1='6' x2='21' y2='6'></line>
            <line x1='3' y1='18' x2='21' y2='18'></line>
          </svg>
        )}
        <div className=' desktop'>{navlist}</div>
      </div>
      <Drawer
        placement='left'
        closable={false}
        className='navigation-container'
        onClose={onClickToggleMobileMenu}
        visible={toggleMobileMenu}>
        {navlist}
      </Drawer>
    </div>
  );
};

export default withRouter(Navbar);
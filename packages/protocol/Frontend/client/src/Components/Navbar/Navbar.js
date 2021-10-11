import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import image from '../../images/Group 5458.png';
import logo1 from '../../images/collection.svg';
import logo2 from '../../images/idea (5).svg';
import logo3 from '../../images/trending.svg';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import { useState, useEffect } from 'react';


const onClickConnect = async () => {        
        
  const provider = await detectEthereumProvider();
  console.log(provider);
  if (provider) {
    if (provider !== window.ethereum) {
      alert('Do you have multiple wallets installed?');
      console.error('Do you have multiple wallets installed?');
      }
    else {

      window.ethereum.enable();             
               
    }  
        // Access the decentralized web!
        // Initialize your app
           } 
   else {
       alert('Please install MetaMask!');
       console.log('Please install MetaMask!');
      }
       


}; 



const Navbar = () => { 

  const [currentAccount, setCurrentAccount] = useState("");

  const LoadAccount = async () => {  

        if(window.ethereum.isConnected ){ 
          

            const web3 = new Web3(window.ethereum);
            const AccountsArray = await web3.eth.getAccounts();
            setCurrentAccount(AccountsArray);
                                          }       
          
          }

   useEffect(() => {
            LoadAccount();
          }, []);
 
console.log("The Current Account is " + currentAccount);

  return (
    <div>
    <nav className="navbar-border navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
            <NavLink exact activeClassName="active" to="/" className="nav-link navigation-item px-3"><a class="navbar-brand" href="#">
      <img
        src={image}
        class="me-2"
        height="20"
        alt=""
        loading="lazy"
      />
     
    </a></NavLink>
            </div>

  <div className="container-fluid">
  <form className="d-flex search input-group w-auto">
 
  
     
    </form>



    <div className="collapse navbar-collapse" id="navbarRightAlignExample">

      <ul className="navbar-nav  ms-auto me-5 mb-2 mb-lg-0">
       
    
      <NavLink exact activeClassName="active" to="/" className="nav-link navigation-item px-3"><a className="navbar-brand"><img style={{width:'0.7rem'}} src={logo1} alt="" /></a >Home<span className="sr-only"></span></NavLink>
    
      </ul>
      <ul className="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
    
      <NavLink exact activeClassName="active" to="/dashboard"  onClick={onClickConnect} className="nav-link navigation-item px-3"><a className="navbar-brand" ><img style={{width:'0.7rem'}} src={logo2} alt="" /></a>Dashboard<span className="sr-only"></span></NavLink>
      
      </ul>
      <ul className="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
    
       <NavLink exact activeClassName="active" to="/" className="nav-link navigation-item px-3"><a className="navbar-brand" ><img style={{width:'0.7rem'}} src={logo3} alt="" /></a>About<span className="sr-only"></span></NavLink>
      
       </ul>
       
       <button type="button" className='wallet' onClick={onClickConnect} >Connect Wallet</button>
    </div>
  
  </div>

</nav>
</div>
  );
};

export default Navbar;

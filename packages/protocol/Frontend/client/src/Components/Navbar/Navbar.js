import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import image from '../../images/Group 5458.png';
import logo1 from '../../images/collection.svg';
import logo2 from '../../images/idea (5).svg';
import logo3 from '../../images/trending.svg';

const Navbar = () => {
  return (
    <div>
    <nav className="navbar-border navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
            <NavLink exact activeClassName="active" to="/" className="nav-link navigation-item px-3"><a className="navbar-brand" ><img style={{width:'8rem'}} src={image} alt="" /></a><span className="sr-only"></span></NavLink>
            </div>

  <div className="container-fluid">
  <form className="d-flex search input-group w-auto">
 
  
     
    </form>



    <div className="collapse navbar-collapse" id="navbarRightAlignExample">

      <ul className="navbar-nav  ms-auto me-5 mb-2 mb-lg-0">
       
    
      <NavLink exact activeClassName="active" to="/" className="nav-link navigation-item px-3"><a className="navbar-brand" ><img style={{width:'0.7rem'}} src={logo1} alt="" /></a>Home<span className="sr-only"></span></NavLink>
    
      </ul>
      <ul className="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
    
      <NavLink exact activeClassName="active" to="/dashboard" className="nav-link navigation-item px-3"><a className="navbar-brand" ><img style={{width:'0.7rem'}} src={logo2} alt="" /></a>Dashboard<span className="sr-only"></span></NavLink>
      
      </ul>
      <ul className="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
    
       <NavLink exact activeClassName="active" to="/" className="nav-link navigation-item px-3"><a className="navbar-brand" ><img style={{width:'0.7rem'}} src={logo3} alt="" /></a>About<span className="sr-only"></span></NavLink>
      
       </ul>
       <button type="button" className='wallet'>Connect Wallet</button>
    </div>
  
  </div>

</nav>
</div>
  );
};

export default Navbar;

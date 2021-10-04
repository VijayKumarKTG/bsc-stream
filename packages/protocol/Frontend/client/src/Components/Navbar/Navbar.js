import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div>
    <nav className="navbar-border navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
            <NavLink exact activeClassName="active" to="/" className="nav-link navigation-item px-3">BSC stream<span className="sr-only"></span></NavLink>
            </div>

  <div className="container-fluid">
  <form className="d-flex search input-group w-auto">
 
  
     
    </form>



    <div className="collapse navbar-collapse" id="navbarRightAlignExample">

      <ul className="navbar-nav navi ms-auto me-5 mb-2 mb-lg-0">
       
       
      
       
       
      
        
      
      </ul>
      <NavLink exact activeClassName="active" to="/dashboard" className="nav-link navigation-item px-3">Dashboard<span className="sr-only"></span></NavLink>
     
    </div>
  
  </div>

</nav>
</div>
  );
};

export default Navbar;

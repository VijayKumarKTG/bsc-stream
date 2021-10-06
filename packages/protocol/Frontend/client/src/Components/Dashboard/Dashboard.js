import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Dashboard.css';
import withdraw from '../../images/withdraw.png'
import details from '../../images/details.png'
import options from '../../images/options.png'
import history from '../../images/history.png'
const Dashboard = () => {
    return (
 
            <div    >
            <Navbar></Navbar>
           <div className=''>
           <main style={{height:'300px'}} className="row d-flex align-items-center   header-container">
        <div className="col-md-7 offset-md-1">
            {/* <h2 style={{color: '#3A4256'}}>The real-time finance<br/>protocol for real assets</h2>
            <p className="text-secondary">Bridge the gap between real-life assets and liquid assets with Pandora’s open finance protocol.</p>
          <Link to='/dashboard'>
          <button type="button" className='dashboard'>Dashboard</button>
          </Link> */}
        
        
        </div>
        <div className="col-md-3">
            {/* <img src={chair} alt="" className="img-fluid"/> */}
           <div className="row d-flex  ">
            <div className="col-md-5 m-2  offset-md-1 info-container">
                <img className='ms-3' style={{height:'40px'}} src={withdraw} alt="" />
                <p><b>Withdraw</b></p>
            </div>
            <div className="col-md-5 m-2  info-container">
            <img className='ms-2' style={{height:'40px'}} src={details} alt="" />
              
                <p><b>Details</b></p>
            </div>
           </div>
           <div className="row d-flex ">
            <div className="col-md-5 offset-md-1 m-2  info-container">
            <img className='ms-2' style={{height:'40px'}} src={options} alt="" />
       
                <p><b>Options</b></p>
            </div>
            <div className="col-md-5 info-container m-2 ">
            <img className='ms-2' style={{height:'40px'}} src={history} alt="" />
            
                <p><b>History</b></p>
            </div>
           </div>
        </div>
    </main>
          <div className="row d-flex align-items-center  ">
        <div  className="col-md-8 offset-md-1">
            <h6><b>Dashboard</b></h6>
        </div>
        <div className="col-md-2">
        <Link to='/stream'><button className='button'>Stream</button></Link>
        </div>
          </div>
         
           </div>
        </div>
    
    );
};

export default Dashboard;
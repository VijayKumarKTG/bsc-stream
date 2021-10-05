import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Dashboard.css'
const Dashboard = () => {
    return (
        <div>
            <Navbar></Navbar>
            <main style={{height:'300px'}} className="row d-flex align-items-center header-container">
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
                <p>Withdraw</p>
            </div>
            <div className="col-md-5 m-2  info-container">
                <p>Details</p>
            </div>
           </div>
           <div className="row d-flex ">
            <div className="col-md-5 offset-md-1 m-2  info-container">
                <p>Option</p>
            </div>
            <div className="col-md-5 info-container m-2 ">
                <p>History</p>
            </div>
           </div>
        </div>
    </main>
           <Link to='/stream'><button>Stream</button></Link>
           <div>
                2nd part
           </div>
        </div>
    );
};

export default Dashboard;
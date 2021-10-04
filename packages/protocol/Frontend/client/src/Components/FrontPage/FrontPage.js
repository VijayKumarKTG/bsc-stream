import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from './../Dashboard/Dashboard';

const FrontPage = () => {
    return (
        <div className="d-flex justify-content-center header-container"> 
             <div>
             <Link to="/dashboard">Dashboard</Link>
             </div>
        </div>
    );
};

export default FrontPage;
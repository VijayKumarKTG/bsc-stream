import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Dashboard = () => {
    return (
        <div>
            <Navbar></Navbar>
           <Link to='/stream'><button>Stream</button></Link>
        </div>
    );
};

export default Dashboard;
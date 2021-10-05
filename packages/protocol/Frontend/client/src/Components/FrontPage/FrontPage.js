import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from './../Dashboard/Dashboard';

const FrontPage = () => {
    return (
        <div className="d-flex justify-content-center"> 
       
      
           <main style={{height:'400px'}} className ="row d-flex align-items-center">
            <div className="col-md-6 ">
            
                <h2 className='text-brand'>  The real-time finance protocol for real assets </h2>
                <p className ="text-secondary">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur laboriosam, iure tempore itaque libero officiis.</p>
                <button className ="btn btn-success text-white"><Link to="/dashboard">Dashboard</Link> </button>
            </div>
            <div className="col-md-4">
                {/* <img src={carService} alt="" className ="img-fluid"/> */}
            </div>
        </main>
     
             {/*  */}
          
        </div>
    );
};

export default FrontPage;
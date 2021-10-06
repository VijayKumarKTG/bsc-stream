import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Dashboard.css';
import Web3 from 'web3';
import SabilierContractIntstance from "../../build/contracts/Sablier.json";
import Stream from '../Stream/Stream/Stream';


const Dashboard = () => {


    const StreamArray = [];
    const _id = 100001;
    var [currentStreamID, setcurrentStreamID] = useState(0);
    var [stateStreamArray,setStateStreamArray]= useState();
    
    
    const setUpCurrentStreamID = async () => {
    const web3 = new Web3(window.ethereum);
    var contract = new web3.eth.Contract(SabilierContractIntstance.abi, "0x8582f3B4CFd18b8FA66A352AE25F6D2DC2A359e3");
    const NextStream = await contract.methods.nextStreamId().call();
    setcurrentStreamID(NextStream -1) ;
    }
    
    setUpCurrentStreamID();
    console.log(currentStreamID);
    
    
    const GetStreamInfo = async (_id_inside) => {
        const web3 = new Web3(window.ethereum);
        var contract = new web3.eth.Contract(SabilierContractIntstance.abi, "0x8582f3B4CFd18b8FA66A352AE25F6D2DC2A359e3");
        const _getStream = await contract.methods.getStream(_id_inside).call() ;
        //console.log(_getStream);
    
        const _temp_Element = {};
        _temp_Element.to = _getStream.recipient;
        _temp_Element.value = _getStream.deposit;
        _temp_Element.start_time = _getStream.startTime;
        _temp_Element.stop_time = _getStream.stopTime;
    
        StreamArray.push(_temp_Element);
                    
      } 
    
    const getEveryStreamLoop = async () => {
        
        for (var i=_id; i <= currentStreamID ; i++ ){
             GetStreamInfo(i);
        }
    
       console.log(StreamArray);
      
         
      } 
    
    getEveryStreamLoop();  
    




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
               2nd Part
               <ul>   
                   {/* {stateStreamArray.map( (item) => {
                           <div>   
                               Helloo
                           </div>            
                          
                          })}  */}
                          
                </ul>
           </div>
        </div>
    );
};

export default Dashboard;
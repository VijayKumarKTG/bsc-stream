import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Dashboard.css';

import withdraw from '../../images/withdraw.png'
import details from '../../images/details.png'
import options from '../../images/options.png'
import history from '../../images/history.png'

import Web3 from 'web3';
import SabilierContractIntstance from "../../build/contracts/Sablier.json";
import Stream from '../Stream/Stream/Stream';
import image1 from '../../images/banner.png'




const Dashboard = () => {


    const StreamArray = [];
    const _id = 100001;
    const [currentStreamID, setcurrentStreamID] = useState(0);
    const [stateStreamArray,setStateStreamArray]= useState();
    
    
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
        // setStateStreamArray(_temp_Element) ;       
      } 
    
    const getEveryStreamLoop = async () => {
        
        for (var i=_id; i <= currentStreamID ; i++ ){
             GetStreamInfo(i);
        }
    
       console.log(StreamArray);
      
         
      } 
    
    getEveryStreamLoop();  
    




    return (
 
            <div  >
            <Navbar></Navbar>
           <div className=''>
           <main style={{height:'300px'}} className="row d-flex align-items-center   header-container">
        <div className="col-md-7 offset-md-1 ">
          
          <img className='' src={image1} alt=""  />
        
        
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
          <div className='header-container'>
          <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
  {/* {stateStreamArray && stateStreamArray.map((stateStream)=>{ */}
        <tr>
        <th scope="row">1</th>
        <td>..</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
   {/* })}  */}
    
  </tbody>
</table>
          </div>
         
        
    
           </div>
        </div>
    
    );
};

export default Dashboard;
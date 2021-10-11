import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Dashboard.css';

import withdraw from '../../images/Group 5549.svg'
import details from '../../images/Group 5552.svg'
import options from '../../images/Group 5550.svg'
import history from '../../images/Group 5551.svg'

import Web3 from 'web3';
import SabilierContractIntstance from "../../build/contracts/Sablier.json";
import Stream from '../Stream/Stream/Stream';

import image1 from '../../images/banner.png'


import detectEthereumProvider from '@metamask/detect-provider';
import InfoCard from './InfoCard';

const infosData = [
  {
      title: 'Opening Hours',
      description: 'We are open 7 days',

      background: 'primary'
  },
  {
      title: 'Visit Our Location',
      description: 'Brooklyn, NY 10003 USA',
   
      background: 'dark'
  },
  {
      title: 'Call us now',
      description: '+15697854124',
   
      background: 'primary'
  }
]


const Dashboard = () => {
    const StreamArray = [];
    const _id = 100001;

    var [currentStreamID, setcurrentStreamID] = useState(0);
    const [stateStreamArray,setStateStreamArray]= useState([]);
   

 const providerCheck = async () => {
    const provider = await detectEthereumProvider();

    
    if ( provider != null) {     

        const web3 = new Web3(window.ethereum);
        const AccountsArray = await web3.eth.getAccounts();
        const account = AccountsArray[0];
        

     if(window.ethereum.isConnected()){

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
    
        StreamArray.concat(_temp_Element);
            

      
        if(  (_getStream.recipient == account ) || (_getStream.sender == account ) ) {
                    const _temp_Element = {};
                    _temp_Element.streamId = _id_inside;
                    _temp_Element.to = _getStream.recipient;
                    _temp_Element.value = _getStream.deposit;
                    _temp_Element.start_time = _getStream.startTime;
                    _temp_Element.stop_time = _getStream.stopTime;
                    _temp_Element.ratePerSecond = _getStream.ratePerSecond;
                    
                    if( ( (_getStream.stopTime - ( Date.now() / 1000).toFixed(0)) > 0) ) {
                        _temp_Element.streaming = "Streaming";
                    }
                    else {
                        _temp_Element.streaming = "Not Streaming";
                        }
                    
                    _temp_Element.in_or_out = "NA";
                    
                    if (_getStream.recipient == account) {
                        _temp_Element.in_or_out = "Incoming";
                    }

                    else if (_getStream.sender == account ){
                        _temp_Element.in_or_out = "Outgoing";
                    }
                    
                    _temp_Element.progress = "NA";

                    _temp_Element.progress =  (   (  ( ( (Date.now() / 1000).toFixed(0) ) - _getStream.startTime ) * _getStream.ratePerSecond ) / _getStream.deposit );

                // _temp_Element.streaming = _getStream.streaming;
                

                        
                    StreamArray.push(_temp_Element);
                // setStateStreamArray(stateStreamArray => [...stateStreamArray,_temp_Element] )
        
                }
                    

      } 
    
    const getEveryStreamLoop = async () => {
        
        for (var i=_id; i <= currentStreamID ; i++ ){
             GetStreamInfo(i);
        }
       

       console.log(StreamArray);
      // setStateStreamArray(StreamArray)
         

       //console.log(StreamArray);              

      } 
    
    getEveryStreamLoop();  
    
    }  // This is the end of the window.ethereum.isConnected() if check

   } 

}  // This is the End of The providerCheck() 

providerCheck();

console.log(StreamArray);


    return (
 
            <div  >
            <Navbar></Navbar>
           <div className=''>
           <main style={{height:'300px'}} className="row d-flex align-items-center   header-container">
        <div className="col-md-7 offset-md-1 ">
          
          <img className='' src={image1} alt=""  />
        
        
        </div>
        <div className="col-md-3">
           
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

          {
                    infosData.map(info => <InfoCard info={info} key={info.title}></InfoCard>)
                }
          {/* <table class="table">
  <thead>

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

  {infosData.map((info )=>{
        <tr>
        <th scope="row">1</th>
        <td>{info.description}</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
})}  
    
  </tbody> */}
{/* </table> */}
{/* 
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>{}</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    
    
  </tbody>
</table> */}
{StreamArray.map((user) => (
        <div className="user">{user}</div>
      ))}

          </div>
         
        
    
           </div>
        </div>
    
    );
};

export default Dashboard;
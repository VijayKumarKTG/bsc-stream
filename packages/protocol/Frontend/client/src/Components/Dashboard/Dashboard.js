import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Dashboard.css';
import Web3 from 'web3';
import SabilierContractIntstance from "../../build/contracts/Sablier.json";
import Stream from '../Stream/Stream/Stream';
import detectEthereumProvider from '@metamask/detect-provider';



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
       
       //console.log(StreamArray);              
      } 
    
    getEveryStreamLoop();  
    
    }  // This is the end of the window.ethereum.isConnected() if check

   } 

}  // This is the End of The providerCheck() 

providerCheck();
console.log(StreamArray);

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
</table>
{StreamArray.map((user) => (
        <div className="user">{user}</div>
      ))}
          </div>
         
        
    
           </div>
       
    );
};

export default Dashboard;
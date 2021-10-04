import './App.css';
import Web3 from 'web3';
import SabilierContractIntstance from "./build/contracts/Sablier.json";
import React, { useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';




function App() {
 

 var [nextStreamId, setnextStreamId] = useState(0);
 var [data, setData] = useState(0);


const [recepientAddress, setRecepientAddress] = useState("");
const [deposit, setDeposit] = useState(0);
const [tokenAddress, setTokenAddress] = useState("");
const [unixStartTime, setUnixStartTime] = useState("");
const [unixStopTime, setUnixStopTime] = useState("");

const [getStreamId, setGetStreamId] = useState("");


const [streamId, setStreamId] = useState("");
const [addressOf_Who, setAddressOf_Who] = useState("");
const [DataID, setDataID] = useState("");

const [cancelStreamId, setCancelStreamId] = useState("");


const [withdrawStreamId, setWithdrawStreamId] = useState("");
const [withdrawAmount, setWithdrawAmount] = useState("");




// Code below is to initialize and implement web3

async function loadWeb3(){

window.ethereum.enable();
console.log(window.ethereum);
console.log(window.ethereum.isConnected());

const provider = await detectEthereumProvider();

console.log(provider);


if (provider) {
  startApp(provider); // Initialize your app
 
} else {
  console.log('Please install MetaMask!');
}

function startApp(provider) {
  // If the provider returned by detectEthereumProvider is not the same as
  // window.ethereum, something is overwriting it, perhaps another wallet.
  if (provider !== window.ethereum) {
    console.error('Do you have multiple wallets installed?');

  }
  // Access the decentralized web!
}



const web3 = new Web3(window.ethereum);

console.log(web3.eth.currentProvider)

  
const AccountsArray = await web3.eth.getAccounts();
const account = AccountsArray[0];
 
  
// 0x8582f3B4CFd18b8FA66A352AE25F6D2DC2A359e3 contract id

  


var contract = new web3.eth.Contract(SabilierContractIntstance.abi, "0x8582f3B4CFd18b8FA66A352AE25F6D2DC2A359e3");
const NextId = await contract.methods.nextStreamId().call();
setnextStreamId( nextStreamId = NextId);





 }



 const onSubmitGetStreamInfo = async (event) => {
  event.preventDefault();
  const web3 = new Web3(window.ethereum);
  var contract = new web3.eth.Contract(SabilierContractIntstance.abi, "0x8582f3B4CFd18b8FA66A352AE25F6D2DC2A359e3");
  const _getStream = await contract.methods.getStream(getStreamId).call() ;
  console.log(_getStream);
   
} 

const onSubmit_CreateStream = async (event) => {
  event.preventDefault();
  const web3 = new Web3(window.ethereum);
  const AccountsArray = await web3.eth.getAccounts();
  const account = AccountsArray[0];
  var contract = new web3.eth.Contract(SabilierContractIntstance.abi, "0x8582f3B4CFd18b8FA66A352AE25F6D2DC2A359e3");
  var _createStream = await contract.methods.createStream( recepientAddress,deposit,tokenAddress,unixStartTime, unixStopTime).send({from: account})  ;
  console.log(_createStream);
   
} 


const onSubmitWithdrawAmount = async (event) => {
  event.preventDefault();
  const web3 = new Web3(window.ethereum);
  const AccountsArray = await web3.eth.getAccounts();
  const account = AccountsArray[0];
  var contract = new web3.eth.Contract(SabilierContractIntstance.abi, "0x8582f3B4CFd18b8FA66A352AE25F6D2DC2A359e3");
  var _withdrawFromStream = await contract.methods.withdrawFromStream( withdrawStreamId, withdrawAmount).send({from: account})  ;
  console.log(_withdrawFromStream);

}
   

const onSubmitBalanceOf = async (event) => {
  event.preventDefault();
  const web3 = new Web3(window.ethereum);
  var contract = new web3.eth.Contract(SabilierContractIntstance.abi, "0x8582f3B4CFd18b8FA66A352AE25F6D2DC2A359e3");
  const _balanceOF = await contract.methods.balanceOf(streamId, addressOf_Who ).call() ;
  console.log(_balanceOF);
   
} 

const onSubmitCancelStream = async (event) => {
  event.preventDefault();
  const web3 = new Web3(window.ethereum);
  const AccountsArray = await web3.eth.getAccounts();
  const account = AccountsArray[0];
  var contract = new web3.eth.Contract(SabilierContractIntstance.abi, "0x8582f3B4CFd18b8FA66A352AE25F6D2DC2A359e3");
  const _cancelStream = await contract.methods.cancelStream(cancelStreamId).send({from: account}) ;
  console.log(_cancelStream);
   
} 
   
const LW = loadWeb3();



console.log(streamId);

  return (
    <div className="App">
      <header className="App-header">
          <h1>Sablier Contract Interact</h1>
          <label>Next Stream Id : {nextStreamId} </label> <br/>
          <label>Current Stream Id : {nextStreamId - 1} </label> <br/>




          <label>Create Stream </label>    
   <form onSubmit={onSubmit_CreateStream}>
      <input
        value={recepientAddress}
        onChange={e => setRecepientAddress(e.target.value)}
        placeholder="Recepient Address"
        type="text"
        name="recepientAddress"
        required
      />
      <input
        value={deposit}
        onChange={e => setDeposit(e.target.value)}
        placeholder="Deposit"
        type="number"
        name="deposit"
        required
      />
      <input
        value={tokenAddress}
        onChange={e => setTokenAddress(e.target.value)}
        placeholder="Token Address"
        type="text"
        name="tokenAddress"
        required
      />
      <input
        value={unixStartTime}
        onChange={e => setUnixStartTime(e.target.value)}
        placeholder="Start Time (Unix Time)"
        type="text"
        name="unixStartTime"
        required
      />
      <input
        value={unixStopTime}
        onChange={e => setUnixStopTime(e.target.value)}
        placeholder="Stop Time (Unix Time)"
        type="text"
        name="unixStopTime"
        required
      />
     
      <button type="submit">Submit</button>
  </form> <br/>    


  

     
  <label >Withdraw From Stream </label>     
    <form onSubmit={onSubmitWithdrawAmount}>
      <input
        value={withdrawStreamId}
        onChange={e => setWithdrawStreamId(e.target.value)  }
        placeholder="Stream ID"
        type="number"
        name="withdraw_streamId"
        required
      />
     
      <input
        value={withdrawAmount}
        onChange={e => setWithdrawAmount(e.target.value)}
        placeholder="Amount To Withdraw"
        type="number"
        name="withdrawAmount"
        required
      />     
      <button type="submit">Submit</button>
    </form ><br/>
  

  


     
    <label >Balance Of Stream </label>     
    <form onSubmit={onSubmitBalanceOf}>
      <input
        value={streamId}
        onChange={e => setStreamId(e.target.value)  }
        placeholder="Stream ID"
        type="number"
        name="streamId"
        required
      />
     
      <input
        value={addressOf_Who}
        onChange={e => setAddressOf_Who(e.target.value)}
        placeholder="Address of the person"
        type="text"
        name="addressOf_Who"
        required
      />     
      <button type="submit">Submit</button>
    </form ><br/>




          <label >Get Stream Info </label>    
   <form onSubmit={onSubmitGetStreamInfo}>
      <input
        value={getStreamId}
        onChange={e => setGetStreamId(e.target.value)}
        placeholder="Stream ID"
        type="number"
        name="streamId"
        required
      />     
      <button type="submit">Submit</button>
    </form> <br/>




          <label >Cancel Stream </label>      
  <form onSubmit={onSubmitCancelStream}>
      <input
        value={cancelStreamId}
        onChange={e => setCancelStreamId(e.target.value)}
        placeholder="Stream ID"
        type="number"
        name="streamId"
        required
      />     
      <button type="submit">Submit</button>

      
    </form> <br/>

    


   

      </header>
    </div>    
  );
}

export default App;

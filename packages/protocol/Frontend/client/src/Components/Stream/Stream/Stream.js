import React from 'react';
import { useState } from 'react';
//import Web3 from 'web3';
//import SabilierContractIntstance from '../../../build/contracts/Sablier.json';
//import detectEthereumProvider from '@metamask/detect-provider';
//import DateTimePicker from 'react-datetime-picker';
import Navbar from '../../Navbar/Navbar';
import { createStream } from '../../../helpers/wallet';
import './Stream.css';

const Stream = () => {
  // const { register, handleSubmit, formState: { errors } } = useForm();
  // const onSubmit = data => console.log(data);
  //var [data, setData] = useState(0);
  //var [nextStreamId, setnextStreamId] = useState(0);
  //const [DateTime, setDateTime] = useState(new Date());

  const [recipient, setRecepientAddress] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [unixStartTime, setUnixStartTime] = useState('');
  const [unixStopTime, setUnixStopTime] = useState('');
  const [deposit, setDeposit] = useState(0);
  const [recommendations, setRecommendations] = useState([]);
  const [depositError, setDepositError] = useState('');
  const [startTimeError, setStartTimeError] = useState('');
  const [stopTimeError, setStopTimeError] = useState('');

  // const [getStreamId, setGetStreamId] = useState("");
  // const [streamId, setStreamId] = useState("");
  // const [addressOf_Who, setAddressOf_Who] = useState("");
  // const [DataID, setDataID] = useState("");
  // const [cancelStreamId, setCancelStreamId] = useState("");
  // const [withdrawStreamId, setWithdrawStreamId] = useState("");
  // const [withdrawAmount, setWithdrawAmount] = useState("");
  // States created for react-datetime-picker below
  // Code below is to initialize and implement web3
  // async function loadWeb3() {
  //   console.log(window.ethereum);
  //   //console.log(window.ethereum.isConnected());
  //   const provider = await detectEthereumProvider();
  //   console.log(provider);
  //   if (provider) {
  //     if (provider !== window.ethereum) {
  //       alert('Do you have multiple wallets installed?');
  //       console.error('Do you have multiple wallets installed?');
  //     } else {
  //       window.ethereum.enable();
  //       const web3 = new Web3(window.ethereum);
  //       console.log(web3.eth.currentProvider);
  //       const AccountsArray = await web3.eth.getAccounts();
  //       const account = AccountsArray[0];
  //       // 0x8582f3B4CFd18b8FA66A352AE25F6D2DC2A359e3 contract id
  //       var contract = new web3.eth.Contract(
  //         SabilierContractIntstance.abi,
  //         '0x8582f3B4CFd18b8FA66A352AE25F6D2DC2A359e3'
  //       );
  //       const NextId = await contract.methods.nextStreamId().call();
  //       setnextStreamId((nextStreamId = NextId));
  //     }
  //     // Access the decentralized web!
  //     // Initialize your app
  //   } else {
  //     alert('Please install MetaMask!');
  //     console.log('Please install MetaMask!');
  //   }
  // }
  //  const onSubmitGetStreamInfo = async (event) => {
  //   event.preventDefault();
  //   const web3 = new Web3(window.ethereum);
  //   var contract = new web3.eth.Contract(SabilierContractIntstance.abi, "0x8582f3B4CFd18b8FA66A352AE25F6D2DC2A359e3");
  //   const _getStream = await contract.methods.getStream(getStreamId).call() ;
  //   console.log(_getStream);
  // }
  // const onSubmit_CreateStream = async (event) => {
  //   event.preventDefault();
  //   const web3 = new Web3(window.ethereum);
  //   const AccountsArray = await web3.eth.getAccounts();
  //   const account = AccountsArray[0];
  //   var contract = new web3.eth.Contract(
  //     SabilierContractIntstance.abi,
  //     '0x8582f3B4CFd18b8FA66A352AE25F6D2DC2A359e3'
  //   );
  //   if (deposit == 0) {
  //     console.log('Deposit Amount should not be 0');
  //   } else if (deposit % (unixStopTime - unixStartTime) != 0) {
  //     console.log(
  //       'Please enter an Amount which is multiple of ' +
  //         (unixStopTime - unixStartTime)
  //     );
  //   }
  //   var _createStream = await contract.methods
  //     .createStream(
  //       recepientAddress,
  //       deposit,
  //       tokenAddress,
  //       unixStartTime,
  //       unixStopTime
  //     )
  //     .send({ from: account });
  //   console.log(_createStream);
  // };
  // const onSubmitWithdrawAmount = async (event) => {
  //   event.preventDefault();
  //   const web3 = new Web3(window.ethereum);
  //   const AccountsArray = await web3.eth.getAccounts();
  //   const account = AccountsArray[0];
  //   var contract = new web3.eth.Contract(SabilierContractIntstance.abi, "0x8582f3B4CFd18b8FA66A352AE25F6D2DC2A359e3");
  //   var _withdrawFromStream = await contract.methods.withdrawFromStream( withdrawStreamId, withdrawAmount).send({from: account})  ;
  //   console.log(_withdrawFromStream);
  // }
  // const onSubmitBalanceOf = async (event) => {
  //   event.preventDefault();
  //   const web3 = new Web3(window.ethereum);
  //   var contract = new web3.eth.Contract(SabilierContractIntstance.abi, "0x8582f3B4CFd18b8FA66A352AE25F6D2DC2A359e3");
  //   const _balanceOF = await contract.methods.balanceOf(streamId, addressOf_Who ).call() ;
  //   console.log(_balanceOF);
  // }
  // const onSubmitCancelStream = async (event) => {
  //   event.preventDefault();
  //   const web3 = new Web3(window.ethereum);
  //   const AccountsArray = await web3.eth.getAccounts();
  //   const account = AccountsArray[0];
  //   var contract = new web3.eth.Contract(SabilierContractIntstance.abi, "0x8582f3B4CFd18b8FA66A352AE25F6D2DC2A359e3");
  //   const _cancelStream = await contract.methods.cancelStream(cancelStreamId).send({from: account}) ;
  //   console.log(_cancelStream);
  // }
  // const LW = loadWeb3();
  // console.log(streamId);

  const onUnixStartTimeChange = (time) => {
    let newTime = new Date(time).getTime();
    let currentTime = new Date().getTime();
    if (newTime > currentTime) {
      setUnixStartTime(newTime / 1000);
      setStartTimeError('');
    } else {
      setStartTimeError(
        'Please choose a unix start time which is greater then current machine time.'
      );
    }
  };

  const onUnixStopTimeChange = (time) => {
    let newTime = new Date(time).getTime();
    let currentTime = new Date().getTime();
    if (newTime < currentTime) {
      setStopTimeError(
        'Please choose a unix stop time which is greater than your current machine time and unix start time you chose.'
      );
    } else if (newTime < unixStartTime * 1000) {
      setStopTimeError(
        'Please choose a unix stop time which is greater than unix start time you chose.'
      );
    } else {
      setStopTimeError('');
      setUnixStopTime(newTime / 1000);
    }
  };

  const onDepositChange = (deposit) => {
    if (unixStartTime && unixStopTime) {
      if (deposit % (unixStopTime - unixStartTime) === 0) {
        setDeposit(deposit);
        setRecommendations([]);
        setDepositError('');
      } else {
        let array = [];
        for (let i = 1; i < 50; i = i + 5) {
          array.push((unixStopTime - unixStartTime) * i);
        }
        setDeposit(deposit);
        setDepositError(
          'Deposit value must be multiple of (unix start time - unix stop time).'
        );
        setRecommendations(array);
      }
    } else {
      setDepositError('Please fill unix start time and unix stop time first.');
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    createStream(recipient, deposit, tokenAddress, unixStartTime, unixStopTime);
  };

  return (
    <div>
      <Navbar></Navbar>
      <header className='container'>
        <h1>Sablier Contract Interact</h1>
        <p>please required fields for creating a streaming</p>
        <h5>Create stream</h5>
        <br />
        {/* <label>Next Stream Id : {nextStreamId} </label> <br/>
          <label>Current Stream Id : {nextStreamId - 1} </label> <br/> */}

        {/* <label>Create Stream </label>  */}
        <div className='container'>
          <form onSubmit={(e) => onSubmitForm(e)}>
            <div className='row '>
              <div className=' col-sm'>
                <h6>Recepient Address</h6>

                <input
                  className='form-control'
                  id='formGroupExampleInput'
                  value={recipient}
                  onChange={(e) => setRecepientAddress(e.target.value)}
                  placeholder='Recepient Address'
                  // type="text"
                  name='recepient Address'
                  required
                />
              </div>
              <div className='form-group col-sm'>
                {/* <label htmlFor="formGroupExampleInput">Token Address</label> */}
                <h6>Token Address</h6>
                <input
                  type='text'
                  className='form-control'
                  id='formGroupExampleInput'
                  placeholder='Token Address'
                  value={tokenAddress}
                  onChange={(e) => setTokenAddress(e.target.value)}
                  name='tokenAddress'
                  required
                />
              </div>
            </div>

            <br />
            <div className='row'>
              <div className='col-sm form-group'>
                {/* <label htmlFor="formGroupExampleInput">Start Time (Unix Time)</label> */}
                <h6>Start Time (Unix Time)</h6>
                <input
                  type='datetime-local'
                  className='form-control'
                  id='formGroupExampleInput'
                  defaultValue={unixStartTime * 1000}
                  onChange={(e) => onUnixStartTimeChange(e.target.value)}
                  //onClick={onClick_UnixStartTime_DateTime}
                  placeholder='Start Time (Unix Time)'
                  name='unixStartTime'
                  required
                />
                <div className='error'>{startTimeError}</div>
                {/* <DateTimePicker
                  onChange={onChange_UnixStartTime_DateTime}
                  value={
                    unixStartTime ? new Date(unixStartTime * 1000) : new Date()
                  }
                  format='dd-MM-yyyy hh:mm:ss a'
                  closeClock={true}
                /> */}
              </div>
              <div className='col-sm form-group'>
                {/* <label htmlFor="formGroupExampleInput">Stop Time (Unix Time)</label> */}
                <h6>Stop Time (Unix Time)</h6>
                <input
                  type='datetime-local'
                  className='form-control'
                  id='formGroupExampleInput'
                  defaultValue={unixStopTime * 1000}
                  onChange={(e) => onUnixStopTimeChange(e.target.value)}
                  // onClick={onClick_UnixStopTime_DateTime}
                  placeholder='Stop Time (Unix Time)'
                  name='unixStopTime'
                  required
                />
                <div className='error'>{stopTimeError}</div>
                {/* <DateTimePicker
                  onChange={onChange_UnixStopTime_DateTime}
                  value={
                    unixStopTime ? new Date(unixStopTime * 1000) : new Date()
                  }
                  format='dd-MM-yyyy hh:mm:ss a'
                /> */}
              </div>
            </div>
            <br />
            <div className='row '>
              <div className=' col-sm'>
                <h6>Amount</h6>
                <input
                  className='form-control'
                  value={deposit}
                  onChange={(e) =>
                    onDepositChange(e.target.value === '' ? 0 : +e.target.value)
                  }
                  placeholder='Deposit'
                  type='number'
                  name='deposit'
                  required
                />
              </div>
              <div className='form-group col-sm'>
                {/* <label htmlFor="formGroupExampleInput">Token Address</label>  */}
                {recommendations.length ? (
                  <>
                    <p>Some recommended deposits you can try</p>
                    <ul
                      style={{
                        listStyleType: 'none',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        margin: '0',
                        padding: '0',
                      }}>
                      {recommendations.map((e) => (
                        <li
                          key={e}
                          style={{
                            border: '1px solid #00000078',
                            borderRadius: '3px',
                            padding: '2px 5px',
                            cursor: 'pointer',
                          }}
                          onClick={() => onDepositChange(e)}>
                          {e}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </div>
            </div>
            <div className='error'>{depositError}</div>
            <br />
            <button
              className={`button ${
                (depositError || startTimeError || stopTimeError) && 'disabled'
              }`}>
              Create Stream
            </button>
          </form>
        </div>
      </header>
    </div>
  );
};

export default Stream;

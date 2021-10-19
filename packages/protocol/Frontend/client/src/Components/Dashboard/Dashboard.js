import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Navbar from '../Navbar/Navbar';
import './Dashboard.css';

import withdraw from '../../images/Group 5549.svg';
import details from '../../images/Group 5552.svg';
import options from '../../images/Group 5550.svg';
import history from '../../images/Group 5551.svg';
import image1 from '../../images/banner.png';

// import Web3 from 'web3';
// import SabilierContractIntstance from '../../build/contracts/Sablier.json';
// import Stream from '../Stream/Stream/Stream';
//import detectEthereumProvider from '@metamask/detect-provider';
// import InfoCard from './InfoCard';
// const infosData = [
//   {
//     title: 'Opening Hours',
//     description: 'We are open 7 days',

//     background: 'primary',
//   },
//   {
//     title: 'Visit Our Location',
//     description: 'Brooklyn, NY 10003 USA',

//     background: 'dark',
//   },
//   {
//     title: 'Call us now',
//     description: '+15697854124',

//     background: 'primary',
//   },
// ];

const Dashboard = () => {
  const _id = 100001;

  var [currentStreamID, setcurrentStreamID] = useState(0);
  const [streams, setStreams] = useState([]);
  const StreamArray = [];

  // const providerCheck = async () => {
  //   const provider = await detectEthereumProvider();

  //   if (provider != null) {
  //     const web3 = new Web3(window.ethereum);
  //     const AccountsArray = await web3.eth.getAccounts();
  //     const account = AccountsArray[0];

  //     if (window.ethereum.isConnected()) {
  //       const setUpCurrentStreamID = async () => {
  //         const web3 = new Web3(window.ethereum);
  //         var contract = new web3.eth.Contract(
  //           SabilierContractIntstance.abi,
  //           '0x8582f3B4CFd18b8FA66A352AE25F6D2DC2A359e3'
  //         );
  //         const NextStream = await contract.methods.nextStreamId().call();
  //         setcurrentStreamID(NextStream - 1);
  //       };

  //       setUpCurrentStreamID();
  //       console.log(currentStreamID);

  //       const GetStreamInfo = async (_id_inside) => {
  //         const web3 = new Web3(window.ethereum);
  //         var contract = new web3.eth.Contract(
  //           SabilierContractIntstance.abi,
  //           '0x8582f3B4CFd18b8FA66A352AE25F6D2DC2A359e3'
  //         );
  //         const _getStream = await contract.methods
  //           .getStream(_id_inside)
  //           .call();
  //         //console.log(_getStream);
  //         // <<<<<<< HEAD

  //         const _temp_Element = {};
  //         _temp_Element.to = _getStream.recipient;
  //         _temp_Element.value = _getStream.deposit;
  //         _temp_Element.start_time = _getStream.startTime;
  //         _temp_Element.stop_time = _getStream.stopTime;

  //         StreamArray.concat(_temp_Element);

  //         // =======

  //         if (_getStream.recipient == account || _getStream.sender == account) {
  //           const _temp_Element = {};
  //           _temp_Element.streamId = _id_inside;
  //           _temp_Element.to = _getStream.recipient;
  //           _temp_Element.value = _getStream.deposit;
  //           _temp_Element.start_time = _getStream.startTime;
  //           _temp_Element.stop_time = _getStream.stopTime;
  //           _temp_Element.ratePerSecond = _getStream.ratePerSecond;

  //           if (_getStream.stopTime - (Date.now() / 1000).toFixed(0) > 0) {
  //             _temp_Element.streaming = 'Streaming';
  //           } else {
  //             _temp_Element.streaming = 'Not Streaming';
  //           }

  //           _temp_Element.in_or_out = 'NA';

  //           if (_getStream.recipient == account) {
  //             _temp_Element.in_or_out = 'Incoming';
  //           } else if (_getStream.sender == account) {
  //             _temp_Element.in_or_out = 'Outgoing';
  //           }

  //           _temp_Element.progress = 'NA';

  //           _temp_Element.progress =
  //             (((Date.now() / 1000).toFixed(0) - _getStream.startTime) *
  //               _getStream.ratePerSecond) /
  //             _getStream.deposit;

  //           // _temp_Element.streaming = _getStream.streaming;

  //           StreamArray.push(_temp_Element);
  //           // setStateStreamArray(stateStreamArray => [...stateStreamArray,_temp_Element] )
  //         }

  //         // >>>>>>> 919eb1c813ae956effbc85824ae2f4f722b377e1
  //       };

  //       const getEveryStreamLoop = async () => {
  //         for (var i = _id; i <= currentStreamID; i++) {
  //           GetStreamInfo(i);
  //         }

  //         // <<<<<<< HEAD
  //         console.log(StreamArray);
  //         // setStateStreamArray(StreamArray)

  //         // =======
  //         //console.log(StreamArray);
  //         // >>>>>>> 919eb1c813ae956effbc85824ae2f4f722b377e1
  //       };

  //       getEveryStreamLoop();
  //     } // This is the end of the window.ethereum.isConnected() if check
  //   }
  // };
  // This is the End of The providerCheck()
  // useEffect(() => {
  //     providerCheck();
  //   }, []);
  //providerCheck();
  // <<<<<<< HEAD
  // =======
  //console.log(StreamArray);
  // >>>>>>> 919eb1c813ae956effbc85824ae2f4f722b377e1

  const APIURL =
    'https://api.thegraph.com/subgraphs/name/vijaykumarktg/bsc-stream-chapel';

  const tokensQuery = `
  query {
    streams {
      id
      streamId
      recipient
      tokenAddress
    }
  }
`;

  // link to TX: 0x737655aa99eb1cc3545b515046176ba0ec989bb8721321ec9875575eaef50176

  const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    client
      .query({
        query: gql(tokensQuery),
      })
      .then((data) => {
        console.log('Subgraph data: ', data);
      })
      .catch((err) => {
        console.log('Error fetching data: ', err);
      });
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <div className=''>
        <main
          style={{ height: '300px' }}
          className='row d-flex align-items-center   header-container'>
          <div className='col-md-7 offset-md-1 '>
            <img className='' src={image1} alt='' />
          </div>
          <div className='col-md-3'>
            <div className='row d-flex  '>
              <div className='col-md-5 m-2  offset-md-1 info-container'>
                <img
                  className='ms-3'
                  style={{ height: '40px' }}
                  src={withdraw}
                  alt=''
                />
                <p>
                  <b>Withdraw</b>
                </p>
              </div>
              <div className='col-md-5 m-2  info-container'>
                <img
                  className='ms-2'
                  style={{ height: '40px' }}
                  src={details}
                  alt=''
                />

                <p>
                  <b>Details</b>
                </p>
              </div>
            </div>
            <div className='row d-flex '>
              <div className='col-md-5 offset-md-1 m-2  info-container'>
                <img
                  className='ms-2'
                  style={{ height: '40px' }}
                  src={options}
                  alt=''
                />

                <p>
                  <b>Options</b>
                </p>
              </div>
              <div className='col-md-5 info-container m-2 '>
                <img
                  className='ms-2'
                  style={{ height: '40px' }}
                  src={history}
                  alt=''
                />

                <p>
                  <b>History</b>
                </p>
              </div>
            </div>
          </div>
        </main>
        <div className='row d-flex align-items-center  '>
          <div className='col-md-8 offset-md-1'>
            <h6>
              <b>Dashboard</b>
            </h6>
          </div>
          <div className='col-md-2'>
            <Link to='/stream'>
              <button className='button'>Stream</button>
            </Link>
          </div>
        </div>

        <div className='stream-list'>
          <table className='table'>
            <tr className='header-row'>
              <th>STATUS</th>
              <th>TO</th>
              <th>VALUE</th>
              <th>PROGRESS</th>
              <th>START TIME</th>
              <th>STOP TIME</th>
              <th>LINK</th>
            </tr>
            {Array(5).fill(
              <tr className='data-row'>
                <td className='status'>
                  <span>Streaming</span>
                </td>
                <td className='to'>13d117C3C9...</td>
                <td className='value'>
                  210k <span>PNDR</span>
                </td>
                <td className='progressX'>20%</td>
                <td className='time'>October 25, 2021</td>
                <td className='time'>October 28, 2021</td>
                <td className='link'>
                  <a
                    href='https://testnet.bscscan.com/tx/'
                    target='_blank'
                    rel='noreferrer'>
                    Link
                  </a>
                </td>
              </tr>
            )}
          </table>
        </div>

        {/* <div className='header-container'>
          {/* <<<<<<< HEAD */}
        {/* {infosData.map((item) => (
            <InfoCard info={item}></InfoCard>
          ))} */}
        {/* <table class="table">
  <thead>
=======
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
// <<<<<<< HEAD
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
        {/* ======= */}
        {/* <tr>
            <th scope='row'>1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope='row'>2</th>
            <td>{}</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>

          {/* </tbody> */}
        {/* </table> */}
        {/* {StreamArray.map((user) => (
            <div className='user'>{user}</div>
          ))} */}
        {/* >>>>>>> 919eb1c813ae956effbc85824ae2f4f722b377e1 
>>>>>>> 79a56906f7950c3fc7bdd142a9b020d321b0737d*/}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Dashboard;

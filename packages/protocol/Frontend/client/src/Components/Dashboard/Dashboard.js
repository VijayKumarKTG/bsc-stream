import React from 'react';
import { useState, useEffect, useContext, useRef } from 'react';
import { Alert, Space, Button, Spin, Drawer, Progress, message } from 'antd';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { AccountContext } from '../../context/AccountContext';
import {
  cancelStream,
  connectWallet,
  withdrawFromStream,
  parseStreams,
  createStream,
} from '../../helpers/wallet';
import Stream from '../Stream/Stream';
import './Dashboard.less';

import withdraw from '../../images/Group 5549.svg';
import details from '../../images/Group 5552.svg';
import options from '../../images/Group 5550.svg';
import history from '../../images/Group 5551.svg';
import image1 from '../../images/banner.png';
import Web3 from 'web3';

const Dashboard = ({ chainId, changeChain }) => {
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const fetcherInterval = useRef(null);
  const { account, changeAccount } = useContext(AccountContext);
  const FETCH_TIME = 10000;

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onConnectWallet = async () => {
    let response = await connectWallet();
    if (response.status) {
      changeAccount(response.account);
      message.success('Successfully connected!');
    } else {
      message.error('Something went wrong!');
    }
  };

  const APIURL =
    'https://api.thegraph.com/subgraphs/name/vijaykumarktg/bsc-stream-chapel';

  const getSenderStreams = `
    query {
      streams(where:{sender: "${account}"}) {
        streamId
        recipient
        sender
        startTime
        stopTime
        deposit
        remainingBalance
      }
    }
  `;

  const getRecipientStreams = `
  query {
    streams(where:{recipient: "${account}"}) {
      streamId
      recipient
      sender
      startTime
      stopTime
      deposit
      remainingBalance
    }
  }
`;

  const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
  });

  const fetchStreams = async (text) => {
    try {
      let senderLists = await (
        await client.query({ query: gql(getSenderStreams) })
      ).data.streams;
      let recipientLists = await (
        await client.query({ query: gql(getRecipientStreams) })
      ).data.streams;
      let streamsLists = [...senderLists, ...recipientLists];
      setStreams(await parseStreams(streamsLists));
      text && setLoading(false);
    } catch (error) {
      console.log(``);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchStreams('load');
    fetcherInterval.current = setInterval(fetchStreams, FETCH_TIME);
    return () => {
      clearInterval(fetcherInterval.current);
      fetcherInterval.current = null;
    };
  }, [account]);

  /**
   * Handle create stream
   */
  const createStreamHandler = async (
    recipient,
    deposit,
    address,
    startTime,
    stopTime
  ) => {
    let result = await createStream(
      recipient,
      deposit,
      address,
      startTime,
      stopTime,
      account
    );
    if (result) {
      message.success('Creacted a new stream!');
      setVisible(false);
      fetchStreams();
      if (fetcherInterval.current) {
        clearInterval(fetcherInterval.current);
        fetcherInterval.current = null;
      }
      fetcherInterval.current = setInterval(fetchStreams, FETCH_TIME);
    } else {
      message.error('Something went wrong!');
    }
  };

  /**
   * Handle create stream
   */
  const withdrawHandler = async (streamId, amount) => {
    let result = await withdrawFromStream(streamId, amount, account);
    if (result) {
      message.success('Withdrawn the deposit!');
      fetchStreams();
      if (fetcherInterval.current) {
        clearInterval(fetcherInterval.current);
        fetcherInterval.current = null;
      }
      fetcherInterval.current = setInterval(fetchStreams, FETCH_TIME);
    } else {
      message.error('Something went wrong!');
    }
  };

  /**
   * Handle cancel stream
   */
  const cancelStreamHandler = async (streamId) => {
    let result = await cancelStream(streamId, account);
    if (result) {
      message.success('Cancelled the stream!');
      fetchStreams();
      if (fetcherInterval.current) {
        clearInterval(fetcherInterval.current);
        fetcherInterval.current = null;
      }
      fetcherInterval.current = setInterval(fetchStreams, FETCH_TIME);
    } else {
      message.error('Something went wrong!');
    }
  };

  return (
    <>
      {account ? (
        <div>
          <div>
            {chainId !== '0x61' && (
              <div className='wrong-network'>
                <Alert
                  message='Please change your blockchain network to BSC Testnet.'
                  type='warning'
                  action={
                    <Space>
                      <Button onClick={changeChain} size='small' type='ghost'>
                        Change network
                      </Button>
                    </Space>
                  }
                  closable
                />
              </div>
            )}
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
                <button className='button' onClick={showDrawer}>
                  Stream
                </button>
              </div>
            </div>
            {loading ? (
              <div className='loader'>
                <Spin />
              </div>
            ) : (
              <div className='stream-list'>
                {streams.length ? (
                  <table className='table'>
                    <tr className='header-row'>
                      <th>In/Out</th>
                      <th>STATUS</th>
                      <th>From/TO</th>
                      <th>VALUE</th>
                      <th>PROGRESS</th>
                      <th>START TIME</th>
                      <th>STOP TIME</th>
                      <th>LINK</th>
                      <th>Action</th>
                    </tr>
                    {streams.map((stream) => (
                      <tr
                        key={stream.streamId}
                        className={`data-row ${
                          stream.sender === account ? 'sender' : 'recipient'
                        }`}>
                        <td className='inout'>
                          {stream.sender === account ? 'Outgoing' : 'Incoming'}
                        </td>
                        <td className='status'>
                          <span>Streaming</span>
                        </td>
                        <td className='to'>
                          {stream.recipient.slice(0, 15)}...
                        </td>
                        <td className='value'>
                          {Web3.utils.fromWei(stream.deposit)} <span>PNDR</span>
                        </td>
                        <td className='progressX'>
                          <Progress
                            strokeColor={
                              stream.sender === account
                                ? {
                                    '0%': '#FE9259',
                                    '100%': '#FFDB8B',
                                  }
                                : {
                                    '0%': '#5985FE',
                                    '100%': '#8BAAFF',
                                  }
                            }
                            percent={stream.progress}
                          />
                        </td>
                        <td className='time'>
                          {stream.startTime.toLocaleString()}
                        </td>
                        <td className='time'>
                          {stream.stopTime.toLocaleString()}
                        </td>
                        <td className='link'>
                          <a
                            href='https://testnet.bscscan.com/tx/'
                            target='_blank'
                            rel='noreferrer'>
                            Link
                          </a>
                        </td>
                        <td className='action'>
                          {stream.sender === account ? (
                            <Button
                              onClick={() =>
                                cancelStreamHandler(stream.streamId)
                              }>
                              Cancel
                            </Button>
                          ) : (
                            <Button
                              onClick={() =>
                                withdrawHandler(
                                  stream.streamId,
                                  stream.progress === 100
                                    ? stream.deposit
                                    : stream.deposit - stream.senderBalance
                                )
                              }>
                              Withdraw
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </table>
                ) : (
                  <div className='no-streams'>No streams yet!</div>
                )}
              </div>
            )}
          </div>
          <Drawer
            height='85%'
            placement='bottom'
            closable={false}
            onClose={onClose}
            visible={visible}
            key='createstream'>
            <Stream
              createStream={createStreamHandler}
              close={onClose}
              account={account}
            />
          </Drawer>
        </div>
      ) : (
        <div className='connect-container'>
          <h2>Please connect to your wallet.</h2>
          <Button className='wallet' onClick={onConnectWallet}>
            CONNECT WALLET
          </Button>
        </div>
      )}
    </>
  );
};

export default Dashboard;

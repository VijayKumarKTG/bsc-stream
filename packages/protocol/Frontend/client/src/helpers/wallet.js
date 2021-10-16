import Web3 from 'web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../constants';

let web3 = new Web3(Web3.givenProvider);
let contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
let account;

export const connectWallet = async () => {
  try {
    if (typeof window.web3 != 'undefined') {
      web3 = new Web3(window.web3.currentProvider);
    } else {
      return { status: false };
    }
    account = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    account = account[0];
    return { status: true, account };
  } catch (error) {
    console.log('error', error?.message);
    return { status: false };
  }
};

export const getTransactionConfirmation = (hash, type = '') => {
  try {
    var info;
    console.log('transaction confirmation callled>>2', hash);
    return new Promise((resolve, reject) => {
      var refreshIntervalId = setInterval(fname, 1000);
      async function fname() {
        console.log('transaction confirmation receipt<>>>>2');
        if (info == null) {
          info = await web3.eth.getTransactionReceipt(hash);
          console.log('info', info);
        } else {
          clearInterval(refreshIntervalId);
          console.log('transaction confirmation receipt', info);
          if (info.status) {
            return resolve({
              success: true,
              ...(type !== 'buyNFT' &&
                type !== 'sellNFT' && {
                  saleId: web3.utils.hexToNumber(info?.logs[1]?.topics[1]),
                }),
              ...(type === 'sellNFT' && {
                saleId: web3.utils.hexToNumber(info?.logs[2]?.topics[1]),
              }),
              ...(type !== 'buyNFT' &&
                type !== 'sellNFT' && {
                  tokenId: web3.utils.hexToNumber(info?.logs[1]?.topics[2]),
                }),
            });
          } else {
            return reject({ success: false });
          }
        }
      }
    });
  } catch (e) {
    console.log('e=', e);
    return { success: false };
  }
};

/**
 * 4. Create a stream with recipient, deposit,
 * token address, start time, and stop time and
 * return new stream id as number
 * @param {address} recipient
 * @param {number} deposit
 * @param {address} address
 * @param {unix time} startTime
 * @param {unix time} stopTime
 * @return {number}
 */
export const createStream = (
  recipient,
  deposit,
  address,
  startTime,
  stopTime
) => {
  contract.methods
    .createStream(recipient, deposit, address, startTime, stopTime)
    .send({ from: account, gasPrice: 50000000000 })
    .on('error', function (error, receipt) {
      if (error) {
        console.log('Create Stream Error: ');
        console.log(error.message);
      } else {
        console.log('Create Stream: ');
        console.log(receipt);
      }
    });
};

/**
 * 5. Event Catcher for create stream
 */
contract.events.CreateStream({}, function (error, event) {
  if (error) {
    console.log('Event Error: ');
    console.log(error.message);
  } else {
    console.log('Event: ');
    console.log(event.returnValues);
  }
});

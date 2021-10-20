import Web3 from 'web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../constants';

let web3 = new Web3(Web3.givenProvider);
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

export const connectWallet = async () => {
  try {
    if (typeof window.web3 != 'undefined') {
      web3 = new Web3(window.web3.currentProvider);
    } else {
      return { status: false };
    }
    let account = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    return { status: true, account: account[0] };
  } catch (error) {
    console.log('error', error?.message);
    return { status: false };
  }
};

/**
 * 2. Get a particular stream via stream id
 * and return an object with sender, recipient,
 * deposit, tokenAddress, startTime, stopTime,
 * remainingBalance and ratePerSecond properties
 * @param {number} streamId
 * @returns
 */
export const getStream = async (streamId) => {
  try {
    let result = await contract.methods.getStream(streamId).call();
    console.log('Get Stream: ');
    console.log(result);
  } catch (error) {
    console.log('Get Stream Error: ');
    console.log(error.message);
  }
  return {
    sender: 'address',
    recipient: 'address',
    deposit: 'number',
    tokenAddress: 'address',
    startTime: 'number',
    stopTime: 'number',
    remainingBalance: 'number',
    ratePerSecond: 'number',
  };
};

/**
 * 3. Get the balance of a particular stream
 * of a particular person via stream id and
 * user address and return the balance in number
 * @param {number} streamId
 * @param {address} who
 * @returns
 */
export const balanceOf = async (streamId, who) => {
  try {
    let result = await contract.methods.balanceOf(streamId, who).call();
    console.log('Balance of: ');
    console.log(result);
  } catch (error) {
    console('Balance of Error: ');
    console.log(error);
  }
  return 0;
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
 * @param {address} account
 * @return {number}
 */
export const createStream = async (
  recipient,
  deposit,
  address,
  startTime,
  stopTime,
  account
) => {
  try {
    deposit = web3.utils.toWei(deposit + '', 'ether');
    const receipt = await contract.methods
      .createStream(recipient, deposit, address, startTime, stopTime)
      .send({ from: account, gasPrice: 50000000000 });
    return receipt.events.CreateStream.returnValues.streamId ? true : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

/**
 * 5. Withdraw balance from stream with stream id
 * and will return a boolean value (true for success
 *  and false for fail)
 * @param {number} streamId
 * @param {number} amount
 * @param {address} account
 * @returns {boolean}
 */
export const withdrawFromStream = async (streamId, amount, account) => {
  try {
    amount = web3.utils.toWei(amount + '', 'ether');
    console.log(amount);
    const receipt = await contract.methods
      .withdrawFromStream(streamId, amount)
      .send({ from: account, gasPrice: 50000000000 });
    return receipt.events.WithdrawFromStream.returnValues.streamId
      ? true
      : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

/**
 * 6. Cancel a stream with stream id and return
 * boolean (true for success and false for fail)
 * @param {number} streamId
 */
export const cancelStream = async (streamId, account) => {
  try {
    let receipt = await contract.methods
      .cancelStream(streamId)
      .send({ from: account, gasPrice: 100000000000 });
    return receipt.events.CancelStream.returnValues.streamId ? true : false;
  } catch (error) {
    return false;
  }
};

export const parseStreams = async (streams) => {
  let results = await Promise.all(
    streams.map(
      async (stream) =>
        await contract.methods.balanceOf(stream.streamId, stream.sender).call()
    )
  );
  let newStreams = streams.map((stream, i) => {
    let newStream = { ...stream };
    newStream.startTime = new Date(newStream.startTime * 1000);
    newStream.stopTime = new Date(newStream.stopTime * 1000);
    newStream.senderBalance = results[i];
    newStream.progress = Math.round(
      ((newStream.deposit - results[i]) / newStream.deposit) * 100
    );
    return newStream;
  });
  return newStreams;
};

export const timeDiff = (startTime, stopTime) => {
  let diffInMilliSeconds = Math.abs(stopTime - startTime) / 1000;
  console.log(diffInMilliSeconds);
  // calculate days 3.154e+10
  const years = Math.floor(diffInMilliSeconds / 31540000);
  diffInMilliSeconds -= years * 31540000;
  console.log('calculated years', years);

  // calculate days 2.628e+9
  const months = Math.floor(diffInMilliSeconds / 2628000);
  diffInMilliSeconds -= months * 2628000;
  console.log('calculated months', months);

  // calculate days 6.048e+8
  const weeks = Math.floor(diffInMilliSeconds / 604800);
  diffInMilliSeconds -= weeks * 604800;
  console.log('calculated weeks', weeks);

  // calculate days
  const days = Math.floor(diffInMilliSeconds / 86400);
  diffInMilliSeconds -= days * 86400;
  console.log('calculated days', days);

  // calculate hours
  const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
  diffInMilliSeconds -= hours * 3600;
  console.log('calculated hours', hours);

  // calculate minutes
  const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
  diffInMilliSeconds -= minutes * 60;
  console.log('minutes', minutes);

  let difference = '';
  if (days > 0) {
    difference += days === 1 ? `${days} day, ` : `${days} days, `;
  }

  difference +=
    hours === 0 || hours === 1 ? `${hours} hour, ` : `${hours} hours, `;

  difference +=
    minutes === 0 || hours === 1 ? `${minutes} minutes` : `${minutes} minutes`;

  //return difference;
};

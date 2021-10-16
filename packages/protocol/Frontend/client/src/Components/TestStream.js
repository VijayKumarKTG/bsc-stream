import Web3 from 'web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../constants';

// Create a stream
const RECIPIENT = '0x13d117C3C9D2Bbe91Be917f3313bEf8DC31Ac6B9';
const DEPOSIT = 20;
const TOKEN_ADDRESS = '0xf5dc6821eefd8638250820d344924b494f1749db';
const START_DATE = 1634275800;
const END_DATE = 1634275810;

// Get a stream
const STREAM_ID = 100046;

const TestStream = ({ account }) => {
  /**
   * 1. Connect to metamask and get contract instance
   */
  const web3 = new Web3(Web3.givenProvider);
  let contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  /**
   * 2. Get a particular stream via stream id
   * and return an object with sender, recipient,
   * deposit, tokenAddress, startTime, stopTime,
   * remainingBalance and ratePerSecond properties
   * @param {number} streamId
   * @returns
   */
  const getStream = async (streamId) => {
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
  const balanceOf = async (streamId, who) => {
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
   * 5. Withdraw balance from stream with stream id
   * and will return a boolean value (true for success
   *  and false for fail)
   * @param {number} streamId
   * @param {number} amount
   * @returns {boolean}
   */
  const withdrawFromStream = async (streamId, amount) => {
    try {
      let receipt = await contract.methods
        .withdrawFromStream(streamId, amount)
        .send({ from: account, gasPrice: 100000000000 });
      console.log('Withdraw Receipt: ');
      console.log(receipt);
    } catch (error) {
      console.log('Withdraw Error: ');
      console.log(error.message);
    }
    return true;
  };

  contract.events.WithdrawFromStream({}, (error, result) => {
    if (error) {
      console.log('Withdraw Event Error: ');
      console.log(error);
    } else {
      console.log('Withdraw Event: ');
      console.log(result);
    }
  });

  /**
   * 6. Cancel a stream with stream id and return
   * boolean (true for success and false for fail)
   * @param {number} streamId
   * @returns
   */
  const cancelStream = async (streamId) => {
    try {
      let receipt = await contract.methods
        .cancelStream(streamId)
        .send({ from: account, gasPrice: 100000000000 });
      console.log('Cancel Stream Receipt: ');
      console.log(receipt);
    } catch (error) {
      console.log('Cancel stream error: ');
      console.log(error.message);
    }
    return true;
  };

  /**
   * Event to catch cancel stream
   */
  contract.events.CancelStream({}, (error, event) => {
    if (error) {
      console.log('Cancel Stream Event Error: ');
      console.log(error.message);
    } else {
      console.log('Cancel Stream Event: ');
      console.log(event);
    }
  });

  return (
    <div>
      <button onClick={() => cancelStream(STREAM_ID)}>Cancel</button>
      <button onClick={() => getStream(STREAM_ID)}>Get</button>
      <button onClick={() => balanceOf(STREAM_ID, account)}>
        Get Balance of Sender
      </button>
      <button onClick={() => balanceOf(STREAM_ID, RECIPIENT)}>
        Get Balance of Recipient
      </button>
      <button onClick={() => withdrawFromStream(STREAM_ID, 5)}>
        Withdraw Cash
      </button>
    </div>
  );
};

export default TestStream;

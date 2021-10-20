import { Button, Input } from 'antd';
import { useState, useEffect } from 'react';
import './Stream.less';

const Stream = ({ createStream, close, account }) => {
  const [recipient, setRecepientAddress] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [unixStartTime, setUnixStartTime] = useState('');
  const [unixStopTime, setUnixStopTime] = useState('');
  const [deposit, setDeposit] = useState(0);
  const [recommendations, setRecommendations] = useState([]);
  const [depositError, setDepositError] = useState('');
  const [startTimeError, setStartTimeError] = useState('');
  const [stopTimeError, setStopTimeError] = useState('');

  const [durationMinutes, setDurationMinutes] = useState(0);
  const [durationHours, setDurationHours] = useState(0);
  const [durationDays, setDurationDays] = useState(0);
  const [durationWeeks, setDurationWeeks] = useState(0);
  const [durationYears, setDurationYears] = useState(0);

  useEffect(() => {
    // console.log(durationYears);
    onUnixStopTimeChange();
  }, [
    durationMinutes,
    durationHours,
    durationDays,
    durationWeeks,
    durationYears,
  ]);

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

  const onUnixStopTimeChange = () => {
    let newTime =
      unixStartTime +
      0 +
      60 * durationMinutes +
      3600 * durationHours +
      86400 * durationDays +
      604800 * durationWeeks +
      31556926 * durationYears;

    let currentTime = new Date().getTime();
    if (newTime <= currentTime / 1000) {
      setStopTimeError(
        'Please set duration to at least 1 or more fields from above'
      );
    } else if (newTime <= unixStartTime) {
      setStopTimeError(
        'Please choose a unix stop time which is greater than unix start time you chose.'
      );
    } else {
      setStopTimeError('');
      setUnixStopTime(newTime);
      console.log(unixStartTime, newTime);
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
      <header className='container'>
        <div className='sublier-head'>
          <h1>Sablier Contract Interact</h1>
          <Button shape='round' onClick={close}>
            x
          </Button>
        </div>
        <p>please required fields for creating a streaming</p>
        <h5>Create stream</h5>
        <br />
        <div className='container'>
          <form onSubmit={(e) => onSubmitForm(e)}>
            <div className='row '>
              <div className=' col-sm'>
                <h6>Recepient Address</h6>
                <input
                  type='text'
                  className='form-control'
                  id='formGroupExampleInput'
                  value={recipient}
                  onChange={(e) => setRecepientAddress(e.target.value)}
                  placeholder='Recepient Address'
                  name='recepient Address'
                  required
                />
              </div>
              <div className='form-group col-sm'>
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
                <h6>Start Time (Unix Time)</h6>
                <input
                  type='datetime-local'
                  className='form-control'
                  id='formGroupExampleInput'
                  defaultValue={unixStartTime * 1000}
                  onChange={(e) => onUnixStartTimeChange(e.target.value)}
                  placeholder='Start Time (Unix Time)'
                  name='unixStartTime'
                />
                <div className='error'>{startTimeError}</div>
              </div>
              <div className='col-sm form-group'>
                <h6>Duration</h6>
                <div style={{ display: 'flex' }}>
                  <Input
                    type='number'
                    min='0'
                    max='20'
                    suffix='Years'
                    className='form-control'
                    onChange={(e) => setDurationYears(Number(e.target.value))}
                    name='unixStopTime'
                  />
                  <Input
                    type='number'
                    min='0'
                    max='51'
                    suffix='Weeks'
                    className='form-control'
                    onChange={(e) => setDurationWeeks(Number(e.target.value))}
                    name='unixStopTime'
                  />
                  <Input
                    type='number'
                    min='0'
                    max='364'
                    suffix='Days'
                    className='form-control'
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    name='unixStopTime'
                  />
                  <Input
                    type='number'
                    min='0'
                    max='23'
                    suffix='Hours'
                    className='form-control'
                    onChange={(e) => setDurationHours(Number(e.target.value))}
                    name='unixStopTime'
                  />
                  <Input
                    type='number'
                    min='0'
                    max='59'
                    suffix='Minutes'
                    className='form-control'
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    name='unixStopTime'
                  />
                </div>
                <div className='error'>{stopTimeError}</div>
              </div>
            </div>
            <br />
            <div className='row '>
              <div className=' col-sm'>
                <h6>Amount</h6>
                <input
                  className='form-control'
                  value={deposit}
                  onChange={(e) => {
                    onDepositChange(
                      e.target.value === '' ? 0 : +e.target.value
                    );
                    console.log(e.target.value);
                  }}
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

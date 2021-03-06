import { Button, Input } from 'antd';
import { useState, useEffect } from 'react';
import './Stream.less';
// import Select from 'react-select';

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

  // const options_Years = [
  //   { value: 0, label: '0 Years' },
  //   { value: 1, label: '1 Year' },
  //   { value: 2, label: '2 Years' },
  //   { value: 3, label: '3 Years' },
  // ];
  // const options_Weeks = [
  //   { value: 0, label: '0 Weeks' },
  //   { value: 1, label: '1 Week' },
  //   { value: 2, label: '2 Weeks' },
  //   { value: 3, label: '3 Weeks' },
  //   { value: 4, label: '4 Weeks' },
  //   { value: 5, label: '5 Weeks' },
  //   { value: 6, label: '6 Weeks' },
  //   { value: 7, label: '7 Weeks' },
  //   { value: 8, label: '8 Weeks' },
  // ];
  // const options_Days = [
  //   { value: 0, label: '0 Days' },
  //   { value: 1, label: '1 Day' },
  //   { value: 2, label: '2 Days' },
  //   { value: 3, label: '3 Days' },
  //   { value: 4, label: '4 Days' },
  //   { value: 5, label: '5 Days' },
  //   { value: 6, label: '6 Days' },
  //   { value: 7, label: '7 Days' },
  //   { value: 8, label: '8 Days' },
  // ];
  // const options_Hours = [
  //   { value: 0, label: '0 Hours' },
  //   { value: 1, label: '1 Hour' },
  //   { value: 2, label: '2 Hours' },
  //   { value: 3, label: '3 Hours' },
  //   { value: 4, label: '4 Hours' },
  //   { value: 5, label: '5 Hours' },
  //   { value: 6, label: '6 Hours' },
  //   { value: 7, label: '7 Hours' },
  //   { value: 8, label: '8 Hours' },
  // ];
  // const options_Mins = [
  //   { value: 0, label: '0 Minutes' },
  //   { value: 1, label: '1 Minute' },
  //   { value: 2, label: '2 Minutes' },
  //   { value: 3, label: '3 Minutes' },
  //   { value: 4, label: '4 Minutes' },
  //   { value: 5, label: '5 Minutes' },
  //   { value: 6, label: '6 Minutes' },
  //   { value: 7, label: '7 Minutes' },
  // ];
  //var SelectedOption;

  useEffect(() => {
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
    if (!unixStartTime) {
      setStopTimeError('Please fill the start time first.');
      return;
    }
    let newTime =
      unixStartTime +
      30 +
      60 * Number(durationMinutes) +
      3600 * Number(durationHours) +
      86400 * Number(durationDays) +
      604800 * Number(durationWeeks) +
      31556926 * Number(durationYears);

    let currentTime = new Date().getTime();
    if (newTime <= currentTime / 1000) {
      setStopTimeError(
        'You are choosing a duration which is less than your current machine time.'
      );
    } else if (newTime <= unixStartTime) {
      setStopTimeError(
        'Please choose a unix stop time which is greater than unix start time you chose.'
      );
    } else {
      setStopTimeError('');
      setUnixStopTime(newTime);
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
      setDepositError('Please fill unix start time and duration first.');
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

                  {/* <Select
                    value={SelectedOption}
                    onChange={setDurationYears}
                    options={options_Years}
                    placeholder='Years'
                    defaultValue={0}
                  />
                  <Select
                    value={SelectedOption}
                    onChange={setDurationWeeks}
                    options={options_Weeks}
                    placeholder='Weeks'
                    defaultValue={0}
                  />
                  <Select
                    value={SelectedOption}
                    onChange={setDurationDays}
                    options={options_Days}
                    placeholder='Days'
                    defaultValue={0}
                  />
                  <Select
                    value={SelectedOption}
                    onChange={setDurationHours}
                    options={options_Hours}
                    placeholder='Hours'
                    defaultValue={0}
                  />
                  <Select
                    value={SelectedOption}
                    onChange={setDurationMinutes}
                    options={options_Mins}
                    placeholder='Minutes'
                    defaultValue={0}
                  /> */}
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
                  }}
                  placeholder='Deposit'
                  type='number'
                  name='deposit'
                  required
                />
              </div>
              <div className='form-group col-sm'>
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

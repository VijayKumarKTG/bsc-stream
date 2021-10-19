import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faMedium,
  faTelegram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import './Frontpage.css';
import info from '../../images/info_1.png';

const FrontPage = () => {
  return (
    <main className='row d-flex align-items-center'>
      <div className='col-md-6 offset-md-1'>
        <h2 style={{ color: '#3A4256' }}>
          The real-time finance
          <br />
          protocol for real assets
        </h2>
        <p className='text-secondary'>
          Bridge the gap between real-life assets and <br /> liquid assets with
          Pandora’s open finance protocol.
        </p>
        <Link to='/dashboard'>
          <button type='button' className='dashboard'>
            Dashboard
          </button>
        </Link>

        <h6 className='pt-3'>
          <b>Follow Us: </b>{' '}
          <FontAwesomeIcon
            className='twitter me-2 mt-2'
            size='2x'
            icon={faTwitter}
          />{' '}
          <FontAwesomeIcon className='me-2' size='2x' icon={faLinkedin} />{' '}
          <FontAwesomeIcon size='2x' className='me-2' icon={faMedium} />{' '}
          <FontAwesomeIcon size='2x' className='me-2' icon={faTelegram} />
        </h6>
      </div>
      <div className='col-md-5 background-img'>
        <img
          src={info}
          alt=''
          style={{ height: '500px', paddingTop: '120px' }}
          className='img-fluid'
        />
        <p></p>
      </div>
    </main>
  );
};

export default FrontPage;

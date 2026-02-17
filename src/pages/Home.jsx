import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useUser } from '../lib/context/user';

import Ideas from './Ideas';
import Footer from '../components/footer/Footer';
import LandingPage from './LandingPage';


const Home = () => {
  const user = useUser();

  return (
    <>
      <div className='home-container'>
        {user.current ? (
          <>
            <section className='ideas-container-section'>
              <h2>Latest Ideas</h2>
              <Ideas />
            </section>
          </>
        ) : (
          <LandingPage />
        )}
      </div>
    </>
  )
}

export default Home;
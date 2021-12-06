import React from 'react';
import Head from 'next/head';
import Header from '../components/Header/Header';

const Home = () => (
  <>
    <Head>
      <title>Chris Blog List</title>
      <meta name="description" content="next.js app" />
      <link rel="icon" href="/unlock-icon.svg" />
    </Head>
    <Header />
  </>
);

export default Home;

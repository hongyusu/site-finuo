

import React, { useState } from 'react';
import LandingPage from './LandingPage';
import LandingPage1 from './LandingPage1';

function App() {
  const [page, setPage] = useState('landingPage');

  const selectPage = (pageName) => {
    setPage(pageName);
  };

  return (
    <div className="App">
      <button onClick={() => selectPage('landingPage')}>Go to Finuo Experience Site</button>
      <button onClick={() => selectPage('landingPage1')}>Go to Finuo Education Site</button>
      {page === 'landingPage' ? <LandingPage /> : <LandingPage1 />}
    </div>
  );
}

export default App;


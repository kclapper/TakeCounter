import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';

import Details from './components/Details';
import Counter from './components/Counter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="d-flex flex-column text-white" style={{ minHeight: "100vh" }}>
      <Details />
      <Counter />
    </div>
  </React.StrictMode>
);

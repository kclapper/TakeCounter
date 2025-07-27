import React from 'react';
import ReactDOM from 'react-dom/client';

import TakeCounter from '../../components/TakeCounter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TakeCounter />
  </React.StrictMode>
);

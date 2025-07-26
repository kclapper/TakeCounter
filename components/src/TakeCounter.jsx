import React from 'react';

import './index.scss';

import { SettingsProvider } from './Settings';
import SettingsMenu from './Settings/Menu';

import Details from './Details';
import Counter from './Counter';

export default function TakeCounter() {
  return <SettingsProvider>
           <div className="d-flex flex-column text-white" style={{ minHeight: "100vh" }}>
             <div className="d-flex justify-content-between ms-4 me-4 mt-2 mb-0 m-sm-4">
               <Details />
               <SettingsMenu />
             </div>
             <Counter />
           </div>
         </SettingsProvider>
}

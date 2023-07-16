import React from 'react';
import { useState, useCallback } from 'react';

import { calcTextWidth } from '../util';

export default function Details() {
  const [details, setDetails] = useState("");

  const handleInput = useCallback((event) => {
    setDetails(event.target.value);
  }, [setDetails]);

  return <div className="fixed-top">
           <div className="container mt-2 pl-2 pr-2">
             <div className="row no-gutters no-wrap justify-content-start align-items-stretch">
               <div className="col-auto p-0 border-bottom">
                 <h3 className="m-2">Client: </h3>
               </div>
               <div className="col-auto col-sm-6 p-0 ">
                 <input type='text'
                        value={ details }
                        onChange={ handleInput }
                        className="h3 text-white bg-transparent h-100 border-0 border-bottom"
                        style={{
                          outline: "none",
                          overflow: "visible",
                          width: details.length <= 25 ? "100%" : calcTextWidth(details)
                        }} />
               </div>
               <div className="col d-none d-sm-block">
               </div>
             </div>
           </div>
         </div>
}

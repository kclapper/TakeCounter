import React from 'react';
import { useState, useCallback } from 'react';

import { calcTextWidth } from '../util';

export default function Details() {
  const [details, setDetails] = useState("");

  const handleInput = useCallback((event) => {
    setDetails(event.target.value);
  }, [setDetails]);

  return <div className="fixed-top ms-4 me-4 mt-2 mb-0 m-sm-4">
           <div className="d-flex justify-content-start align-items-stretch overflow-x-auto">
             <div className="d-none d-sm-block" style={{ flexGrow: 0.25 }}/>
             <div className="border-bottom">
               <h3 className="m-2">Client: </h3>
             </div>
             <div className="">
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
             <div className="d-none d-sm-block" style={{ flexGrow: 2 }}/>
           </div>
         </div>
}

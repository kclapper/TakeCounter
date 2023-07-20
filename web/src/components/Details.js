import React from 'react';

import ExpandingInput from './ExpandingInput';

export default function Details() {
  return <div className="ms-4 me-4 mt-2 mb-0 m-sm-4">
           <div className="d-flex justify-content-start align-items-stretch">
             <div className="d-none d-sm-block" style={{ flexGrow: 0.25 }}/>
             <h3 className="border-bottom m-2 me-0 pe-2">Client: </h3>
             <ExpandingInput className="h3 border-bottom m-2 ms-0"/>
             <div className="d-none d-sm-block" style={{ flexGrow: 2 }}/>
           </div>
         </div>
}

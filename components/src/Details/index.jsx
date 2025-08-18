import React from 'react';

import ExpandingInput from '../Input/ExpandingInput';
import { useSetting } from '../Settings';

export default function Details() {
  const [showDetailsBox] = useSetting('showDetailsBox');

  const detailsBox = <>
                      <ExpandingInput className="h3 border-bottom m-2 ms-0" style={{ minWidth: '25vw' }}/>
                     </>

  return <div className="d-flex justify-content-start align-items-stretch">
            <div className="d-none d-sm-block" style={{ flexGrow: 0.25 }}/>
              {showDetailsBox && detailsBox}
            <div className="d-none d-sm-block" style={{ flexGrow: 2 }}/>
          </div>
}

import React from 'react';
import { useRef, useEffect } from 'react';

import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';

function Button({ onClick, tooltipPlacement, tooltip, children }) {

  const element = useRef(null);

  useEffect(() => {
    if (element.current) {
      new bootstrap.Tooltip(element.current, { delay: 1000 });
    }
  }, [element]);

  return <button ref={ element }
                 className='btn btn-primary m-1'
                 type='button'
                 onClick={ onClick }
                 data-bs-toggle="tooltip"
                 data-bs-placement={ tooltipPlacement || "top" }
                 data-bs-title={ tooltip }>
           { children }
         </button>
}

export default Button;

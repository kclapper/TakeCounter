import React from 'react';
import { useRef, useEffect } from 'react';

import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';

function Button({ onClick, tooltipPlacement, tooltip, className, children}) {

  const element = useRef(null);

  useEffect(() => {
    if (element.current !== null) {
      new bootstrap.Tooltip(element.current, {
        delay: {
          show: 1000,
          hide: 200
        }
      });
    }
  }, [tooltip, tooltipPlacement, element]);

  return <button ref={ element }
                 className={ className || 'btn btn-primary m-1' }
                 type='button'
                 onClick={ onClick }
                 data-bs-toggle="tooltip"
                 data-bs-placement={ tooltipPlacement || "top" }
                 data-bs-title={ tooltip }>
           { children }
         </button>
}

export default Button;

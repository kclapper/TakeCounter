import React, { useCallback } from 'react';
import { useRef, useEffect } from 'react';

import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';

function Button({ onClick, tooltipPlacement, tooltip, className, color, textColor, children}) {
  const element = useRef(null);
  const bootstrapTooltip = useRef(null);

  useEffect(() => {
    if (element.current !== null && Boolean(tooltip)) {
      bootstrapTooltip.current = new bootstrap.Tooltip(element.current, {
        delay: {
          show: 1500,
          hide: 200
        }
      });
    }
  }, [tooltip, tooltipPlacement, element]);

  const handleClick = useCallback(() => {
    if (bootstrapTooltip.current !== null) {
      bootstrapTooltip.current.hide();
    }
    onClick();
  }, [onClick, bootstrapTooltip]);

  let style = {};
  if (color) {
    style = { ...style, background: color, borderColor: color }
  }
  if (textColor) {
    style = { ...style, color: textColor }
  }

  return <button ref={ element }
                 className={ className || 'btn btn-primary m-1' }
                 style={ style }
                 type='button'
                 onClick={ handleClick }
                 data-bs-toggle="tooltip"
                 data-bs-placement={ tooltipPlacement || "top" }
                 data-bs-title={ tooltip }>
           { children }
         </button>
}

export default Button;

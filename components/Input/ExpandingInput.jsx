import React from 'react';
import { forwardRef } from 'react';

function ExpandingInput(props, ref) {
  const { style, ...restProps } = props;

  return <div ref={ ref }
              contentEditable="true"
              style={Object.assign({
                outline: "none",
                minWidth: "40%"
              }, style)}
              { ...restProps } />
}

export default forwardRef(ExpandingInput);

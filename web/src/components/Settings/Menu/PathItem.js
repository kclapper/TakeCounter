import React from 'react';
import { useCallback } from 'react';

export default function PathItem({ name, value, onChange }) {
  const handlePathSelect = useCallback((path) => {
    onChange(path);
  }, [ onChange ]);

  const handleClick = useCallback(() => {
    window.settings.handleDialogResponse(handlePathSelect);
    window.settings.showDialog({ properties: ['openDirectory'] });
  }, []);

  return (
    <div className='row justify-content-start'>
      <h5 className='col-6 my-auto'>
        { name }
      </h5>
      <div className='col-6 p-0'>
        <div className='input-group'>
          <input type="text" 
                readOnly 
                value={ value }
             className="form-control overflow-x-scroll" />
          <div className="btn btn-outline-secondary"
                  onClick={ handleClick }>
            Browse
          </div>
        </div>
      </div>
    </div>
  );
}
          // <div className='border rounded-start overflow-x-scroll'>
          //   { value }
          // </div>
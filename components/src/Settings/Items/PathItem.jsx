import React from 'react';
import { useCallback } from 'react';

import { Item } from './Item';

import * as styles from './PathItem.module.css';

export function PathItem({ name, value, onChange, children }) {
  const handlePathSelect = useCallback((path) => {
    onChange(path);
  }, [ onChange ]);

  const handleClick = useCallback(() => {
    window.settings.handleDialogResponse(handlePathSelect);
    window.settings.showDialog({ properties: ['openDirectory'] });
  }, []);

  const handleClear = useCallback(() => {
    onChange('');
  }, [ onChange ]);

  const containerStyle = `input-group ${styles['input-container']}`;
  const inputStyle = `form-control overflow-x-scroll`;
  const clearButtonContainerStyle = `${styles['clear-button-container']}`;
  const clearButtonStyle = `${styles['clear-button']}`;

  return (
    <Item name={ name } description={ children }>
        <div className={ containerStyle }>
          <input type="text" 
                 readOnly 
                 value={ value }
                 className={ inputStyle } />
          <div className={ clearButtonContainerStyle }>
            <button className={ clearButtonStyle }
                    onClick={ handleClear }>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
            </button>
          </div>
          <div className="btn btn-outline-secondary"
               onClick={ handleClick }>
            Browse
          </div>
        </div>
    </Item>
  );
}
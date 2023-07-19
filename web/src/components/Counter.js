import React from 'react';
import { useState, useEffect, useCallback } from 'react';

import { setMinimum, calcTextWidth } from '../util';
import { useShortcut } from '../util/shortcuts';
import { useSettings } from '../util/settings';

const fontSize = "7em";

function Counter() {
  const [count, setRawCount] = useState(1);
  const setCount = setMinimum(setRawCount);

  const incrementCount = useCallback(() => {
    setCount(count + 1);
  }, [count, setCount]);
  const decrementCount = useCallback(() => {
    setCount(count - 1);
  }, [count, setCount])
  const resetCount = useCallback(() => {
    setCount(1);
  }, [setCount]);

  useEffect(() => {
    document.title = "Take " + count;
  }, [count]);

  const shortcuts = useSettings("keyboardShortcuts");

  useShortcut(incrementCount, shortcuts.incrementCount, "counter.handleIncrement");
  useShortcut(decrementCount, shortcuts.decrementCount, "counter.handleDecrement");
  useShortcut(resetCount, shortcuts.resetCount, "counter.handleReset");

  const inputCount = useCallback((event) => {
    if (Number.isInteger(Number(event.target.value))) {
      setRawCount(Number(event.target.value));
    }
  }, [setRawCount]);

  return <div className='d-flex flex-column align-items-center justify-content-center' style={{ flexGrow: 1 }}>
           <div className="d-flex">
             <h1 className="" style={{
               fontSize,
               marginRight: "0.5ch"
             }}>
               Take
             </h1>
             <input className="bg-transparent h1 text-white border-0"
                    type="text"
                    value= { count }
                    onChange={ inputCount }
                    style={{
                      outline: "none",
                      fontSize,
                      textAlign: "right",
                      width: calcTextWidth(count)
                    }} />
           </div>
           <div className=''>
             <button className='btn btn-primary m-1' onClick={decrementCount}>-</button>
             <button className='btn btn-primary m-1' onClick={resetCount}>reset</button>
             <button className="btn btn-primary m-1" onClick={incrementCount}>+</button>
           </div>
           <div className='mt-2 d-flex flex-column align-items-center justify-content-center'>
             <small className='text-center'>
               "{ shortcuts.incrementCount }": next take <br/>
               "{ shortcuts.decrementCount }": previous take <br/>
               "{ shortcuts.resetCount }": reset to 1
             </small>
           </div>
         </div>
}

export default Counter;

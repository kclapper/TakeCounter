import React from 'react';
import { useState, useEffect, useCallback } from 'react';

import { setMinimum } from '../../util';
import { useShortcut } from '../../util/shortcuts';
import { useSettings } from '../../util/settings';

import Button from '../Button';
import TakeInputDisplay from './TakeInputDisplay';

function Counter() {
  const [count, setRawCount] = useState(1n);
  const setCount = setMinimum(setRawCount);

  const incrementCount = useCallback(() => {
    setCount(count + 1n);
  }, [count, setCount]);
  const decrementCount = useCallback(() => {
    setCount(count - 1n);
  }, [count, setCount])
  const resetCount = useCallback(() => {
    setCount(1n);
  }, [setCount]);

  useEffect(() => {
    document.title = "Take " + count;

    // HACK: This feels like an ugly way to reset the cursor
    // position when someone types in a take number.
  }, [count]);

  const shortcuts = useSettings("keyboardShortcuts");

  useShortcut(incrementCount, shortcuts.incrementCount, "counter.handleIncrement");
  useShortcut(decrementCount, shortcuts.decrementCount, "counter.handleDecrement");
  useShortcut(resetCount, shortcuts.resetCount, "counter.handleReset");

  return <div className='d-flex flex-column align-items-center justify-content-center' style={{ flexGrow: 1 }}>
           <div style={{ flexGrow: 0.75 }}/>
           <div className="d-flex">
             <h1 className="display-1 me-4 me-md-5">
               Take
             </h1>
             <TakeInputDisplay display={ count } onInput={ setRawCount } />
           </div>
           <div className='' style={{ flexGrow: 0 }}>
             <Button onClick={ decrementCount }
                     tooltip={ shortcuts.decrementCount }
                     tooltipPlacement="bottom">
               -
             </Button>
             <Button onClick={ resetCount }
                     tooltip={ shortcuts.resetCount }
                     tooltipPlacement="bottom">
               reset
             </Button>
             <Button onClick={ incrementCount }
                     tooltip={ shortcuts.incrementCount }
                     tooltipPlacement="bottom">
               +
             </Button>
           </div>
           <div style={{ flexGrow: 1 }}/>
         </div>
}

export default Counter;

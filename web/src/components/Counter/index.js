import React, { useContext } from 'react';
import { useState, useEffect, useCallback } from 'react';

import { getValidatedCount } from '../../util';
import { useShortcut } from '../../util/shortcuts';
import { SettingsContext, useSettings } from '../../util/settings';

import Button from '../Button';
import TakeInputDisplay from './TakeInputDisplay';

function Counter() {
  const settingsCtx = useContext(SettingsContext);
  let settings = settingsCtx.get();

  const startingTake = BigInt(settings.currentTake);
  const [count, setRawCount] = useState(startingTake);

  const setCount = useCallback((newCount) => {
    const validatedNewCount = getValidatedCount(newCount);

    settings.currentTake = Number(validatedNewCount);
    settingsCtx.change(settings);

    setRawCount(validatedNewCount);
  }, [setRawCount, settings]);

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

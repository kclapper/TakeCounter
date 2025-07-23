import React, { useContext } from 'react';
import { useState, useEffect, useCallback } from 'react';

import { getValidatedCount } from '../../util';
import { useShortcut } from '../../util/shortcuts';
import { SettingsContext, useSetting } from '../Settings';

import Button from '../Button';
import TakeInputDisplay from './TakeInputDisplay';

function Counter() {
  const [take, setRawTake] = useSetting('currentTake');

  const setTake = useCallback((newCount) => {
    const validatedNewCount = getValidatedCount(newCount);
    setRawTake(validatedNewCount);
  }, [setRawTake]);

  if (window.counter !== undefined) {
    window.counter.handleSetCount(setTake);
  }

  const incrementCount = useCallback(() => {
    setTake(take + 1);
  }, [take, setTake]);
  const decrementCount = useCallback(() => {
    setTake(take - 1);
  }, [take, setTake])
  const resetTake = useCallback(() => {
    setTake(1);
  }, [setTake]);

  useEffect(() => {
    document.title = "Take " + take;
  }, [take]);

  const [shortcuts] = useSetting("keyboardShortcuts");

  useShortcut(incrementCount, shortcuts.incrementCount, "counter.handleIncrement");
  useShortcut(decrementCount, shortcuts.decrementCount, "counter.handleDecrement");
  useShortcut(resetTake, shortcuts.resetCount, "counter.handleReset");

  return <div className='d-flex flex-column align-items-center justify-content-center' style={{ flexGrow: 1 }}>
           <div style={{ flexGrow: 0.75 }}/>
           <div className="d-flex">
             <h1 className="display-1 me-4 me-md-5">
               Take
             </h1>
             <TakeInputDisplay take={ take } onInput={ setTake } />
           </div>
           <div className='' style={{ flexGrow: 0 }}>
             <Button onClick={ decrementCount }
                     tooltip={ shortcuts.decrementCount }
                     tooltipPlacement="bottom">
               -
             </Button>
             <Button onClick={ resetTake }
                     tooltip={ shortcuts.resetTake }
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

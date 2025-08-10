import React from 'react';
import { useEffect, useCallback } from 'react';

import { getValidatedCount } from '../util';
import { useShortcut } from '../util/shortcuts';
import { useSetting } from '../Settings';

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

  const [takeTextPrefix] = useSetting('takeDisplaySettings', 'takeTextPrefix');
  const [showTakePrefix] = useSetting('takeDisplaySettings', 'showTakePrefix');
  const [showTakeButtons] = useSetting('takeDisplaySettings', 'showTakeButtons');
  const [fileWatcherMode] = useSetting('ptFileWatcherMode', 'mode');
  const [counterMode] = useSetting('counterMode');

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

  const buttons = <>
                    <Button onClick={decrementCount}
                            tooltip={shortcuts.decrementCount}
                            tooltipPlacement="bottom">
                      -
                    </Button>
                    <Button onClick={resetTake}
                            tooltip={shortcuts.resetTake}
                            tooltipPlacement="bottom">
                      reset
                    </Button>
                    <Button onClick={incrementCount}
                            tooltip={shortcuts.incrementCount}
                            tooltipPlacement="bottom">
                      +
                    </Button>
                  </>

  return <div className='d-flex flex-column align-items-center justify-content-center' style={{ flexGrow: 1 }}>
           <div style={{ flexGrow: 0.75 }}/>
           <div className="d-flex"> 
              {
                showTakePrefix ?
                <h1 className="display-1 me-4 me-md-5">
                  {takeTextPrefix}
                </h1>         
                : undefined
              }
             <TakeInputDisplay take={ take } onInput={ setTake } />
           </div>
           <div className='' style={{ flexGrow: 0 }}>
              {showTakeButtons && buttons}
            </div>
            <div style={{ flexGrow: 1 }}/>
            <div>
              <p className='text-info fw-bold'>
                {counterMode} {counterMode == "ptFileWatcher" && fileWatcherMode} mode
              </p>
            </div>
         </div>
}

export default Counter;

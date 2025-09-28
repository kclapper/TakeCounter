import React from 'react';
import { useEffect, useCallback } from 'react';

import { getValidatedCount } from '../util';
import { useShortcut } from '../util/shortcuts';
import { useSetting } from '../Settings';
import { defaultSettings } from '../Settings/schema';

import Button from '../Button';
import TakeInputDisplay from './TakeInputDisplay';
import ModeIndicator from './ModeIndicator';

function Counter() {
  const [take, setRawTake] = useSetting('currentTake');
  const [offset, setOffset] = useSetting('ptFileWatcherMode', 'offset');
  const [offsetShortcuts] = useSetting('ptFileWatcherMode', 'offsetShortcuts');

  const setTake = useCallback((newCount) => {
    if (offsetShortcuts) {
      let value = Number(newCount);
      if (Number.isInteger(value)) {
        setOffset(value);
      }
      return;
    }

    const validatedNewCount = getValidatedCount(newCount);
    setRawTake(validatedNewCount);
  }, [setRawTake, setOffset, offsetShortcuts]);

  if (window.counter !== undefined) {
    window.counter.handleSetCount(setRawTake);
  }

  const [takeTextPrefix] = useSetting('takeDisplaySettings', 'takeTextPrefix');
  const [showTakePrefix] = useSetting('takeDisplaySettings', 'showTakePrefix');
  const [showTakeButtons] = useSetting('takeDisplaySettings', 'showTakeButtons');

  const incrementCount = useCallback(() => {
    let value = offsetShortcuts ? offset : take;
    setTake(value + 1);
  }, [take, setTake, offset, offsetShortcuts]);

  const decrementCount = useCallback(() => {
    let value = offsetShortcuts ? offset : take;
    setTake(value - 1);
  }, [take, setTake, offset, offsetShortcuts])

  const resetTake = useCallback(() => {
    let value = offsetShortcuts ? defaultSettings.ptFileWatcherMode.offset : 1;
    setTake(value);
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
                            tooltip={shortcuts.resetCount}
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
           <div style={{ flexGrow: 1 }}/>
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
           <ModeIndicator />
         </div>
}

export default Counter;

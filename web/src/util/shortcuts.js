import { useEffect, useCallback } from 'react';

import { setEquals } from './index';

const isMacOS = window.navigator.userAgent.indexOf("Mac") === 0;

const electron_to_web_code_map = {
  CommandOrControl: isMacOS ? "Meta" : "Control",
  CmdOrCtrl: isMacOS ? "Meta" : "Control",
  Command: "Meta",
  Cmd: "Meta",
  Super: "Meta",
  Option: "Alt",
  Esc: "Escape",
  Plus: "+",
  Space: " ",
  Return: "Enter",
  Up: "ArrowUp",
  Down: "ArrowDown",
  Left: "ArrowLeft",
  Right: "ArrowRight",
  "numdec": "Decimal",
  "numadd": "Add",
  "numsub": "Subtract",
  "nummult": "Multiply",
  "numdiv": "Divide",
  num0: "0",
  num1: "1",
  num2: "2",
  num3: "3",
  num4: "4",
  num5: "5",
  num6: "6",
  num7: "7",
  num8: "8",
  num9: "9",
}

function parseShortcut(shortcutString) {
  const keyStrs = shortcutString.split("+");
  let keys = new Set();
  for (const keyStr of keyStrs) {
    if (keyStr === "") {
      continue;
    }
    if (electron_to_web_code_map[keyStr] !== undefined) {
      keys.add(electron_to_web_code_map[keyStr]);
      continue;
    }
    keys.add(keyStr);
  }
  return keys;
}

export function useShortcut(callback, shortcut, electronTarget) {
  useWebShortcut(callback, shortcut);
  useElectronShortcut(callback, electronTarget);
}

const keysDown = new Set();
window.addEventListener('keydown', (event) => {
  if (event.key.length === 1) {
    keysDown.add(event.key.toUpperCase());
  } else {
    keysDown.add(event.key);
  }
});
window.addEventListener('keyup', (event) => {
  // HACK: Prevent accumulation of alt code characters.
  if (event.key === "Alt") {
    keysDown.clear();
  }
  if (event.key.length === 1) {
    keysDown.delete(event.key.toUpperCase());
  } else {
    keysDown.delete(event.key);
  }
});

export function useWebShortcut(callback, shortcut) {
  const handler = useCallback((event) => {
    const shortcutKeys = parseShortcut(shortcut);
    if (setEquals(shortcutKeys, keysDown)) {
      callback();
    }
  }, [callback, shortcut]);

  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [handler, shortcut]);
}

export function useElectronShortcut(callback, target) {
  const targetProps = target.split(".");

  useEffect(() => {
    // Check that the target exists first
    let target = window;
    for (const prop of targetProps) {
      if (target[prop] === undefined) {
        return;
      }
      target = target[prop];
    }

    target(callback);

  }, [callback, targetProps]);
}

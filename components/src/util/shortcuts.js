import { useEffect, useCallback } from 'react';

import { setEquals } from '.';

const isMacOS = window.navigator.userAgent.indexOf("Mac") === 0;

const web_code_to_electron_key_map = {
  Escape: "Esc",
  Digit1: "1",
  Digit2: "2",
  Digit3: "3",
  Digit4: "4",
  Digit5: "5",
  Digit6: "6",
  Digit7: "7",
  Digit8: "8",
  Digit9: "9",
  Digit0: "0",
  Minus: "-",
  Equal: "=",
  Backspace: "Backspace",
  Tab: "Tab",
  KeyQ: "Q",
  KeyW: "W",
  KeyE: "E",
  KeyR: "R",
  KeyT: "T",
  KeyY: "Y",
  KeyU: "U",
  KeyI: "I",
  KeyO: "O",
  KeyP: "P",
  BracketLeft: "[",
  BracketRight: "]",
  Enter: "Enter",
  ControlLeft: "Ctrl",
  KeyA: "A",
  KeyS: "S",
  KeyD: "D",
  KeyF: "F",
  KeyG: "G",
  KeyH: "H",
  KeyJ: "J",
  KeyK: "K",
  KeyL: "L",
  Semicolon: ";",
  Quote: "'",
  Backquote: "`",
  ShiftLeft: "Shift",
  Backslash: "\\",
  KeyZ: "Z",
  KeyX: "X",
  KeyC: "C",
  KeyV: "V",
  KeyB: "B",
  KeyN: "N",
  KeyM: "M",
  Comma: ",",
  Period: ".",
  Slash: "/",
  ShiftRight: "Shift",
  NumpadMultiply: "nummult",
  AltLeft: "Alt",
  Space: "Space",
  CapsLock: "Capslock",
  F1: "F1",
  F2: "F2",
  F3: "F3",
  F4: "F4",
  F5: "F5",
  F6: "F6",
  F7: "F7",
  F8: "F8",
  F9: "F9",
  F10: "F10",
  Pause: "MediaPlayPause",
  ScrollLock: "Scrollock",
  Numpad7: "num7",
  Numpad8: "num8",
  Numpad9: "num9",
  NumpadSubtract: "numsub",
  Numpad4: "num4",
  Numpad5: "num5",
  Numpad6: "num6",
  NumpadAdd: "numadd",
  Numpad1: "num1",
  Numpad2: "num2",
  Numpad3: "num3",
  Numpad0: "num0",
  NumpadDecimal: "numdec",
  PrintScreen: "PrintScreen",
  IntlBackslash: "",
  F11: "F11",
  F12: "F12",
  NumpadEqual: "=",
  F13: "F13",
  F14: "F14",
  F15: "F15",
  F16: "F16",
  F17: "F17",
  F18: "F18",
  F19: "F19",
  F20: "F20",
  F21: "F21",
  F22: "F22",
  F23: "F23",
  F24: "F24",
  KanaMode: "",
  Lang2: "",
  Lang1: "",
  IntlRo: "",
  Convert: "",
  NonConvert: "",
  IntlYen: "",
  NumpadComma: ",",
  Undo: "",
  Paste: "",
  MediaTrackPrevious: "MediaPreviousTrack",
  Cut: "",
  Copy: "",
  MediaTrackNext: "MediaNextTrack",
  NumpadEnter: "Enter",
  ControlRight: "Ctrl",
  AudioVolumeMute: "VolumeMute",
  LaunchApp2: "",
  MediaPlayPause: "MediaPlayPause",
  MediaStop: "MediaStop",
  Eject: "",
  AudioVolumeDown: "VolumeDown",
  AudioVolumeUp: "VolumeUp",
  BrowserHome: "",
  NumpadDivide: "numdiv",
  PrintScreen: "PrintScreen",
  AltRight: "Alt",
  Help: "",
  NumLock: "Numlock",
  Pause: "MediaPlayPause",
  Home: "Home",
  ArrowUp: "Up",
  PageUp: "PageUp",
  ArrowLeft: "Left",
  ArrowRight: "Right",
  End: "End",
  ArrowDown: "Down",
  PageDown: "PageDown",
  Insert: "Insert",
  Delete: "Delete",
  MetaLeft: "Cmd",
  MetaRight: "Cmd",
  ContextMenu: "",
  Power: "",
  Sleep: "",
  WakeUp: "",
  BrowserSearch: "",
  BrowserFavorites: "",
  BrowserRefresh: "",
  BrowserStop: "",
  BrowserForward: "",
  BrowserBack: "",
  LaunchApp1: "",
  LaunchMail: "",
  MediaSelect: "",
}
let electron_to_web_code_map = {};
for (const [key, value] of Object.entries(web_code_to_electron_key_map)) {
  if (electron_to_web_code_map[value] === undefined) {
    electron_to_web_code_map[value] = key;
  }
}

/* DEPRECATED - But don't get rid of it because it was a pain to make
const  electron_to_web_key_map = {
  CommandOrControl: isMacOS  ? "Meta" : "Control",
  CmdOrCtrl: isMacOS  ? "Meta" : "Control",
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
let web_key_to_electron_map = {};
for (const [key, value] of Object.entries(electron_to_web_key_map)) {
  web_key_to_electron_map[value] = key;
}
*/

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

export function setIsOnlyModifiers(keySet) {
  for (const key of keySet) {
    switch (web_code_to_electron_key_map[key]) {
      case "Cmd":
      case "Ctrl":
      case "Alt":
      case "Shift":
        continue;
      default:
        return false;
    }
  }
  return true;
}

export function setToShortcut(keySet) {
  let result = '';

  for (const key of keySet) {
    if (web_code_to_electron_key_map[key] === undefined) {
      continue;
    }

    if (web_code_to_electron_key_map[key] === '') {
      continue;
    }

    if (result !== '') {
      result += '+';
    }

    result += web_code_to_electron_key_map[key];

    // if (web_key_to_electron_map[key] !== undefined) {
    //   result += '+';
    //   result += web_key_to_electron_map[key];
    //   continue;
    // }

    // if (key.length === 1) {
    //   result += '+';
    //   result += key.toUpperCase();
    //   continue;
    // }

    // result += '+';
    // result += key;
  }

  return result;
  // return result.slice(1);
}

export function useShortcut(callback, shortcut, electronTarget) {
  useWebShortcut(callback, shortcut);
  useElectronShortcut(callback, electronTarget);
}

export const keysDown = new Set();
window.addEventListener('keydown', (event) => {
  if (event.key.length === 1) {
    keysDown.add(event.key.toUpperCase());
  } else {
    keysDown.add(event.key);
  }
});
window.addEventListener('keyup', (event) => {
  // HACK: Prevent accumulation of alt code characters.
  if (event.key === "Alt"
      || event.key === 'Meta'
      || event.key === 'Super') {
    keysDown.clear();
  }
  if (event.key.length === 1) {
    keysDown.delete(event.key.toUpperCase());
  } else {
    keysDown.delete(event.key);
  }
});

export function useWebShortcut(callback, shortcut) {
  const handler = useCallback(() => {
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

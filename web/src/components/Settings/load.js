import { defaultSettings } from 'common';

export { settingsAreValid } from 'common';

const runningInElectron = window.settings !== undefined;

export async function loadSettings() {
    if (runningInElectron) {
        return await window.settings.getSettings();
    }

    // Some defaults are different on the web.
    defaultSettings.keyboardShortcuts.incrementCount = "Shift+Plus";
    defaultSettings.keyboardShortcuts.decrementCount = "Shift+_";
    defaultSettings.keyboardShortcuts.resetCount = "Shift+R";
    return defaultSettings;
}
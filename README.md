# fightcade-ping-filter
Plugin to filter out users based on ping.

## Installation
Download `inject.js` and place it in your `Fightcade\fc2-electron\resources\app\inject` directory.

Backup the existing `inject.js` if you wish to retain the existing [script for joystick controls](https://github.com/blueminder/fightcade-joystick-kb-controls) (not compatible with other scripts unless you merge their contents).

## Configuration
Modify the values to set individual ping limits for the user list/matches. Set to 0 to disable the filter.

```js
const CONFIG = {
    pingLimit : {
        users: 150,
        matches: 150
    }
};
```

const CONFIG = {
    pingLimit : {
        users: 150,
        matches: 150
    }
};

const filterUsers = (FCADE, pingLimit) => {
    if (pingLimit.users > 0) {
        FCADE.$refs[FCADE.activeChannelId][0]?.$refs?.usersList.users.forEach(user => {
            if (user.ping > pingLimit.users) { 
                FCADE.$refs[FCADE.activeChannelId][0]?.$refs?.usersList.removeUser(user);
            }
        });
    }

    if (pingLimit.matches > 0) {
        FCADE.$refs[FCADE.activeChannelId][0]?.$refs?.usersList.matches.forEach(match => {
            if ((match.player1.name == "<offline>" || match.player1.ping > pingLimit.matches) && 
                (match.player2.name == "<offline>" || match.player2.ping > pingLimit.matches)) { 
                FCADE.$refs[FCADE.activeChannelId][0]?.$refs?.usersList.removeMatch(match);
            }
        });
    }
}

/**
 * Waits for the Vue app to initialize and executes a callback once ready.
 * @param {Function} callback - The callback to execute with the Vue app instance.
 */
const waitForVue = (callback) => {
    const appElement = document.querySelector('#app');
    if (appElement?.__vue__?._data?.global?.setTheme) {
        callback(appElement.__vue__);
    } else {
        setTimeout(() => waitForVue(callback), 300);
    }
};

const fightcadePlugins = (fcWindow) => {
    fcWindow.currentChannel = 0;

    waitForVue((FCADE) => {
        setInterval(()=>{
            filterUsers(FCADE, CONFIG.pingLimit);
        }, 500);

    });
};

fightcadePlugins(window);

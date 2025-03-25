const config = require('./config.json');

module.exports = (FCADE) => { runPlugin(FCADE) };

const defaultConfig = {
    users: 150,
    matches: 150
};

const runPlugin = (FCADE) => {
    // Plugin code goes here
    setInterval(() => {
        filterUsers(FCADE, config.pingFilter);
    }, 500);
}

const filterUsers = (FCADE, pingFilterConfig) => {
    if (!pingFilterConfig) {
        pingFilterConfig = defaultConfig
    }

    if (pingFilterConfig.users > 0) {
        FCADE.$refs[FCADE.activeChannelId][0]?.$refs?.usersList.users.forEach(user => {
            if (user.ping > pingFilterConfig.users) { 
                FCADE.$refs[FCADE.activeChannelId][0]?.$refs?.usersList.removeUser(user);
            }
        });
    }

    if (pingFilterConfig.matches > 0) {
        FCADE.$refs[FCADE.activeChannelId][0]?.$refs?.usersList.matches.forEach(match => {
            if ((match.player1.name == "<offline>" || match.player1.ping > pingFilterConfig.matches) && 
                (match.player2.name == "<offline>" || match.player2.ping > pingFilterConfig.matches)) { 
                FCADE.$refs[FCADE.activeChannelId][0]?.$refs?.usersList.removeMatch(match);
            }
        });
    }
}

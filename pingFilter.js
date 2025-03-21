const CONFIG = {
    pingLimit: {
        users: 150,
        matches: 150
    }
};

module.exports = (FCADE) => { runPlugin(FCADE) };

const runPlugin = (FCADE) => {
    // Plugin code goes here
    setInterval(() => {
        filterUsers(FCADE, CONFIG.pingLimit);
    }, 500);
}

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

const config = require('config');

module.exports = () => {

    // Confirm user middleware (auth.js)
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
    }

};
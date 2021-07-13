require('dotenv').config();
const config = require('config');

module.exports = function() {
    if(!config.get('jwt_PrivateKey')) {
    throw new Error('FATAL ERROR: Jwt_PrivateKey is not defined');
}
};

const { jwt_PrivateKey } = require("../config/privates");
const { User } = require("../models/users");
require('dotenv').config();

 module.exports = function authToken(req, res, next) {
    //verify if the user has a token, if not send a 401(unauthorized) error.
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Unauthorized user. No token provided');

    //if the token is provided, verify if there is an authorization
    try {
        const decodedToken = jwt.verify({ _id: user._id}, 'jwt_PrivateKey');
        req.body = decodedToken;
        next();
    }
    catch(e) {
        res.status(500).send('Internal server error');
    };
};


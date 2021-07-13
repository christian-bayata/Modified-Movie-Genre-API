require('dotenv').config();
const config = require('config');
const { User } = require('../../../models/users');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

describe('generateAuthToken', () => {
    it('should return a valid jwt token', () => {
        const payload = { 
            _id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin: true
        };
        const user = new User(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, config.get('jwt_PrivateKey'));

        expect(decoded).toMatchObject(payload);
    });
});
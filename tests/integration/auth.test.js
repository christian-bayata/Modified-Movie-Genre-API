const { Genre } = require('../../models/genre');
const { User } = require('../../models/users');
const request = require('supertest');

let server;

describe('auth middleware', () => {
    beforeEach(() => {server = require('../../app');})
    afterEach(async () => { 
        server.close(); 
        await Genre.remove({});    
    });

    let token;

    const exec = () => {
        return request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({ name: 'genre1' });            
    };

    beforeEach(() => {
        token = new User().generateAuthToken();
    })

    it('should return a 401 if valid token is not provided', async () => {
        token = '';

        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('should return a 400 if token is invalid', async () => {
        token = 'a';

        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return a 200 if token is valid', async () => {  
        
        const res = await exec();

        expect(res.status).toBe(200);
    });
});
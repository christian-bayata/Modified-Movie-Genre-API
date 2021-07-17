const mongoose = require('mongoose');
const request = require('supertest');
const { Genre, genreSchema } = require('../../models/genre');
const { User } = require('../../models/users');

let server; 

describe('/api/genres', () => {
    beforeEach(() => { server = require('../../app'); })
    afterEach(async () => {
        server.close();
        await Genre.remove({});
    });
    
    describe('GET /', () => {
        it('should return all genres', async () => {
            
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' }
            ]);

           const res =  await request(server).get('/api/genres')

           expect(res.status).toBe(200);
           expect(res.body.length).toBe(2);
           expect(res.body.some((g) => g.name === 'genre1')).toBeTruthy();
           expect(res.body.some((g) => g.name === 'genre2')).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        it('should return only one genre when Id is valid', async () => {
        const genre = new Genre({ name: "genre1" });

        await genre.save();

        const res = await request(server).get('/api/genres/' + genre._id);
        expect(res.body).toHaveProperty('name', genre.name);
        });

        it('should return a 400 if the id provided is not valid', async () => {

            const res = await request(server).get('/api/genres/1');
            expect(res.status).toBe(400);
        });

        it('should return 404 if the genre with a given id does not exist', async () => {
            const id = mongoose.Types.ObjectId();

            const res = await request(server).get('/api/genres/' + id);
            expect(res.status).toBe(404);
        })
    });

    describe('POST /', () => {
        //Write a functiion that returns the success path
        let token;
        let name;

        const exec = async () => {
            return await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name });            
        }

        beforeEach(() => {
            token = new User().generateAuthToken();
            name = 'genre1'
        });

        it('should return 401 if the client is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        })

        it('should return 400 if the genre is less than 5 characters', async () => {
            name = '1234';

            const res = await exec()

            expect(res.status).toBe(400);
        });

        it('should return 400 if the genre is more than 50 characters', async () => {

            name = new Array(40).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should save the genre if it is valid', async() => {

            await exec(); 

            const genre = await Genre.find({ name: 'genre1' });

            expect(genre).not.toBeNull();
        })

        it('should return the genre if it is valid', async() => {
            const res = await exec()

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1');
        });
    });
});

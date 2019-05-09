const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const helper = require('./test_helper');

const api = supertest(app);

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const user = new User({
      name: 'Testeri',
      username: 'test',
      passwordHash: 'secret'
    });
    await user.save();
  });

  test('creation succeeds with fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: 'Aku Ankka',
      username: 'Ankka',
      password: '4nkanlipaisu'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(user => user.username);
    expect(usernames).toContain(newUser.username);
  });
});

describe('when creating new invalid user', () => {
  test('returns 400 Bad request when password length is less than 3 characters', async () => {
    const badUser = {
      name: 'Pertti',
      username: 'pertti',
      password: '12'
    };

    await api
      .post('/api/users')
      .send(badUser)
      .expect(400);
  });

  test('returns 400 Bad request when username length is less than 3 characters', async () => {
    const badUser = {
      name: 'Pertti',
      username: '12',
      password: 'pertinsalasana'
    };

    await api
      .post('/api/users')
      .send(badUser)
      .expect(400);
  });

  test('returns 400 Bad request if username is not unique', async () => {
    await User.deleteMany({});

    const user = new User({
      name: 'Testeri',
      username: 'test',
      passwordHash: 'secret'
    });

    await user.save();

    const badUser = {
      name: 'Pertti',
      username: '12',
      password: 'pertinsalasana'
    };

    await api
      .post('/api/users')
      .send(badUser)
      .expect(400);
  });
});

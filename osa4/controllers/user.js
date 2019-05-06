const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/user');

userRouter.post('/', async (request, response) => {
  try {
    const { body } = request;

    if (body.password.length < 3) return response.sendStatus(400);

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash: passwordHash
    });

    const savedUser = await user.save();
    return response.status(201).json(savedUser);
  } catch (exception) {
    return response.sendStatus(400);
  }
});

userRouter.get('/', (request, response) => {
  User.find({})
    .populate('blogs', { title: 1, author: 1, url: 1 })
    .then(users => {
      response.json(users);
    });
});

module.exports = userRouter;

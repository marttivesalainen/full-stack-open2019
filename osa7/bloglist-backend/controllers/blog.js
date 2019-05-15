const jwt = require('jsonwebtoken');
const blogRouter = require('express').Router();
const ObjectId = require('mongoose').Types.ObjectId;
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', (request, response) => {
  Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .then(blogs => {
      response.json(blogs.map(blog => blog.toJSON()));
    });
});

blogRouter.post('/', async (request, response) => {
  const { token } = request;

  const decodedToken = jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return null;
    return decoded;
  });

  try {
    if (!token || !decodedToken || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);
    const blog = new Blog({
      ...request.body,
      user: user._id
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(blog);
  } catch (exception) {
    console.log(exception);
    response.status(400).json({ error: exception.message });
  }
});

blogRouter.delete('/:id', async (request, response) => {
  const { token } = request;

  const decodedToken = jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return null;
    return decoded;
  });

  if (!token || !decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const id = request.params.id;
  if (!ObjectId.isValid(id)) return response.status(400).send('invalid id');

  try {
    const result = await Blog.findOneAndDelete({
      _id: id,
      user: { _id: decodedToken.id }
    });

    if (!result) return response.sendStatus(400);

    return response.sendStatus(200);
  } catch (error) {
    return response.status(500).send(error);
  }
});

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id;
  if (!ObjectId.isValid(id)) return response.status(400).send('invalid id');

  try {
    const blog = await Blog.findByIdAndUpdate({ _id: id }, request.body, {
      new: true,
      runValidators: true
    });

    if (!blog) return response.sendStatus(400);

    return response.status(200).json(blog);
  } catch (error) {
    if (error.name === 'ValidationError')
      return response.status(400).send(error.message);
    else if (error) return response.status(500).send(error);
  }
});

blogRouter.post('/:id/comments', async (request, response) => {
  const { token } = request;
  const { id } = request.params;
  const { comment } = request.body;

  if (!comment) {
    return response.sendStatus(400);
  }

  const decodedToken = jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return null;
    return decoded;
  });

  try {
    if (!token || !decodedToken || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        $push: { comments: comment }
      },
      { new: true }
    );

    response.status(201).json(blog);
  } catch (exception) {
    console.log(exception);
    response.status(400).json({ error: exception.message });
  }
});

module.exports = blogRouter;

const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

const initialBlogs = [
  {
    title: 'Hei maailma',
    author: 'Matti Meikäläinen',
    url: 'http://localhost',
    likes: 10
  },
  {
    title: 'Javascript on kivaa',
    author: 'Essi Esimerkki',
    url: 'http://localhost',
    likes: 15
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});

  for (const blog of initialBlogs) {
    const newBlog = new Blog(blog);
    await newBlog.save();
  }
});

describe('GET /blogs', () => {
  it('responds with json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  it('identification field is defined as id rather than _id', async () => {
    const result = await api.get('/api/blogs');
    result.body.forEach(blog => expect(blog.id).toBeDefined());
  });
});

describe('POST /blogs', () => {
  const newBlog = {
    title: 'Foo',
    author: 'Bar',
    url: 'Baz'
  };

  const emptyBlog = new Blog({});

  it('blogs count should increase by one', async () => {
    await api.post('/api/blogs').send(newBlog);
    const blogs = await Blog.find({});
    expect(blogs.length).toBe(initialBlogs.length + 1);
  });

  it('posted blog should exist in database', async () => {
    await api.post('/api/blogs').send(newBlog);
    const blogs = await Blog.find({});
    expect(blogs.find(blog => blog.title === newBlog.title).title).toBe(
      newBlog.title
    );
  });

  it('likes shoud default to zero if the field is not defined', async () => {
    await api.post('/api/blogs').send(newBlog);
    const blogs = await Blog.find({});
    expect(blogs.find(blog => blog.title === newBlog.title).likes).toBe(0);
  });

  it('should return 400 Bad request if title and/or author is not defined', async () => {
    await api.post('/api/blogs', emptyBlog).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});

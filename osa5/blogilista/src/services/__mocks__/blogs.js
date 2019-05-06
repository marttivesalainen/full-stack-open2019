const blogs = [
  {
    id: '1234',
    title: 'Lorem ipsum',
    author: 'Essi Esimerkki',
    url: 'http://',
    likes: 10,
    user: {
      _id: '1234',
      username: 'essi',
      name: 'Essi Esimerkki'
    }
  }
];

const getAll = () => {
  return Promise.resolve(blogs);
};

export default { getAll };

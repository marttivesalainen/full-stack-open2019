const _ = require('lodash');

const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
};

const mostLikes = blogs => {
  const grouped = _.groupBy(blogs, 'author');
  const summed = _.map(grouped, (obj, key) => {
    return {
      author: key,
      likes: _.sumBy(obj, blog => Number(blog.likes))
    };
  });
  return _.maxBy(summed, author => author.likes);
};

const favoriteBlog = blogs => {
  return blogs.reduce((prev, current) => {
    return prev.likes > current.likes ? prev : current;
  });
};

const mostBlogs = blogs => {
  const summed = _.map(_.countBy(blogs, 'author'), (val, key) => ({
    author: key,
    blogs: val
  }));

  return _.maxBy(summed, author => author.blogs);
};

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  favoriteBlog,
  mostBlogs
};

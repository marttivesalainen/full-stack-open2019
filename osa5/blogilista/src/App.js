import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import loginService from './services/login';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  const blogFormRef = React.createRef();

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
    }

    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setErrorMessage('käyttäjätunnus tai salasana virheellinen');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = event => {
    event.preventDefault();
    window.localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  const handleNewBlog = async blog => {
    blogFormRef.current.toggleVisibility();

    try {
      const response = await blogService.create(blog);

      if (response.status === 201) {
        setErrorMessage(`blogin lisääminen onnistui ${response.data.title}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        blogService.getAll().then(blogs => setBlogs(blogs));
        return true;
      }
    } catch (exception) {
      console.log(exception);
      setErrorMessage('blogin lisääminen epäonnistui');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return false;
    }
  };

  const handleLike = async blog => {
    const newBlog = {
      author: blog.author,
      title: blog.title,
      likes: blog.likes + 1,
      url: blog.url,
      user: blog.user.id
    };
    try {
      const response = await blogService.update(blog.id, newBlog);

      if (response.status === 200) {
        blogService.getAll().then(blogs => setBlogs(blogs));
      }
    } catch (exception) {
      return false;
    }
  };

  const handleDelete = async id => {
    try {
      const response = await blogService.remove(id);
      if (response.status === 200) {
        blogService.getAll().then(blogs => setBlogs(blogs));
      }
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <div>
      <h1>Blogs</h1>

      <div>{errorMessage}</div>

      {!user ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <p>{user.name} kirjautunut sisään</p>
          <button onClick={handleLogout}>Kirjaudu ulos</button>
          <Togglable buttonLabel="Create blog" ref={blogFormRef}>
            <h2>Create Blog</h2>
            <BlogForm handleNewBlog={handleNewBlog} />
          </Togglable>
          {blogs
            .sort((a, b) => {
              return b.likes - a.likes;
            })
            .map(blog => {
              return (
                <Blog
                  key={blog.id}
                  blog={blog}
                  handleLike={handleLike}
                  handleDelete={handleDelete}
                  owner={user.name === blog.user.name}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default App;

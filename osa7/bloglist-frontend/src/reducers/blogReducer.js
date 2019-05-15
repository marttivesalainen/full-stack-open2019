import blogService from '../services/blogs';
import { createNotification } from './notificationReducer';

export const initializeBlogs = () => {
  return dispatch => {
    blogService.getAll().then(blogs => {
      dispatch({
        type: 'INIT_BLOGS',
        data: blogs
      });
    });
  };
};

export const createBlog = blog => {
  return dispatch => {
    blogService
      .create(blog)
      .then(response => {
        console.log(response.data);
        dispatch({ type: 'ADD_BLOG', data: response.data });
        dispatch(
          createNotification(
            `blogin lisääminen onnistui ${response.data.title}`
          )
        );
      })
      .catch(error => {
        dispatch(
          createNotification(`blogin lisääminen epäonnistui ${error.message}`)
        );
      });
  };
};

export const createComment = (id, comment) => {
  return dispatch => {
    blogService.comment
      .create(id, comment)
      .then(blog => {
        dispatch({ type: 'UPDATE_BLOG', data: blog.data });
      })
      .catch(error => {
        dispatch(createNotification(`Kommentin lisääminen epäonnistui`));
      });
  };
};

export const likeBlog = blog => {
  const newBlog = {
    id: blog.id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1
  };

  return dispatch => {
    blogService
      .update(blog.id, newBlog)
      .then(blog => {
        dispatch({ type: 'LIKE_BLOG', data: newBlog });
      })
      .catch(error => {
        dispatch(
          createNotification(`blogin tykkääminen epäonnistui ${error.message} `)
        );
      });
  };
};

export const removeBlog = id => {
  return dispatch => {
    blogService
      .remove(id)
      .then(blog => {
        dispatch({ type: 'REMOVE_BLOG', data: id });
        dispatch(createNotification(`blogin poistaminen onnistui ${id} `));
      })
      .catch(error => {
        dispatch(
          createNotification(`blogin poistaminen epäonnistui ${error.message} `)
        );
      });
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data;
    case 'ADD_BLOG':
      return state.concat(action.data);
    case 'LIKE_BLOG':
      return state.map(blog =>
        blog.id === action.data.id ? { ...blog, ...action.data } : blog
      );
    case 'UPDATE_BLOG':
      return state.map(blog =>
        blog.id === action.data.id ? action.data : blog
      );
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.data);
    default:
      return state;
  }
};

export default reducer;

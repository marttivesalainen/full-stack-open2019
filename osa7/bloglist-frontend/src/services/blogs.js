import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;
let config = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
  config = {
    headers: { Authorization: token }
  };
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async newBlog => {
  const response = await axios.post(baseUrl, newBlog, config);
  return response;
};

const update = async (id, newBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, newBlog);
  return response;
};

const remove = async id => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response;
};

const comment = {
  getBlogComments: id => {
    const response = axios.get(`${baseUrl}/${id}/comments`);
    return response.then(response => response.data);
  },
  create: (id, comment) => {
    const response = axios.post(`${baseUrl}/${id}/comments`, comment, config);
    return response;
  }
};

export default { setToken, getAll, create, update, remove, comment };

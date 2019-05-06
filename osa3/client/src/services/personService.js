import axios from 'axios';

let url = '';

if (process.env.NODE_ENV === 'production') {
  url = '/api';
} else {
  url = 'http://localhost:3001/api';
}

const getAll = () => {
  const request = axios.get(`${url}/persons`);
  return request.then(response => response.data);
};

const create = newPerson => {
  const request = axios.post(`${url}/persons`, newPerson);
  return request.then(response => response.data);
};

const update = (id, newPerson) => {
  const request = axios.put(`${url}/persons/${id}`, newPerson);
  return request.then(response => response.data);
};

const remove = id => {
  const request = axios.delete(`${url}/persons/${id}`);
  return request.then(response => response.data);
};

export default { getAll, create, update, remove };

import { useState, useEffect } from 'react';
import axios from 'axios';

export const useField = type => {
  const [value, setValue] = useState('');

  const onChange = event => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange
  };
};

export const useResource = baseUrl => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    try {
      const result = await axios.get(baseUrl);
      setResources(result.data);
    } catch (exception) {
      console.log('Error', exception);
    }
  };

  const create = async resource => {
    try {
      await axios.post(baseUrl, resource);
      getAll();
    } catch (exception) {
      console.log('Error', exception);
    }
  };

  const service = {
    create
  };

  return [resources, service];
};

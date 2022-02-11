import axios from 'axios';
const host = process.env.NEXT_PUBLIC_HOST + '/user';

export const getDataByID = (id, token) => {
  console.log(id, token);
  const url = host + '/profile/' + id;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDataUser = (filter, token) => {
  const url = host + filter;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updatePin = (body, token, id) => {
  console.log('PIN: body, token, id', body, token, id);
  const url = host + '/pin/' + id;
  return axios.patch(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const checkPinUser = (pin, token) => {
  const url = host + '/pin?pin=' + pin;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

import axios from 'axios';
const host = process.env.NEXT_PUBLIC_HOST + '/auth/';

export const signUp = (body) => {
  const url = host + 'register';
  return axios.post(url, body);
};

export const login = (body) => {
  const url = host + 'login';
  return axios.post(url, body);
};

export const logout = (token) => {
  const url = host + '/logout';
  return axios.post(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


import axios from 'axios';
const host = process.env.NEXT_PUBLIC_HOST + '/dashboard/';

export const getDataDashboard = (id, token) => {
  const url = host + id;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

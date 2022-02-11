import axios from 'axios';
const host = process.env.NEXT_PUBLIC_HOST + '/transaction';

export const historyTransaction = (filter, token) => {
  const url = host + '/history' + filter;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const topUp = (body, token) => {
  const url = host + '/top-up';
  return axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const historyTransactionById = (id, token) => {
  const url = host + '/history/' + id;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const transfer = (body, token) => {
  const url = host + '/transfer';
  return axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const exportTransaction = (id, token) => {
  const url = process.env.NEXT_PUBLIC_HOST + '/export/transaction/' + id;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

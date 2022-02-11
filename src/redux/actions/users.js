import {ACTION_STRING} from 'src/redux/actions/actionsString';
export const updateDataUser = (userData) => {
  return {
    type: ACTION_STRING.userData,
    payload: {userData},
  };
};

export const updateBalance = (balance) => {
  return {
    type: ACTION_STRING.updateBalance,
    payload: {balance},
  };
};

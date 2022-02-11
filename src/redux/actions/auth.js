import {ACTION_STRING} from 'src/redux/actions/actionsString';
import {login} from 'src/modules/api/auth';

export const loginAction = (body) => {
  return {
    type: ACTION_STRING.authLogin,
    payload: login(body),
  };
};

export const logoutAction = () => {
  return {
    type: ACTION_STRING.authLogout,
  };
};

export const updatePin = (pin) => {
  return {
    type: ACTION_STRING.authPin,
    payload: pin,
  };
};
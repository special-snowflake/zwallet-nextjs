import {ACTION_STRING} from 'src/redux/actions/actionsString';

const initialState = {
  userData: {
    token: null,
    id: '',
    pin: '',
  },
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  err: {},
};

const authReducer = (prevState = initialState, action) => {
  const {authLogin, authPin, pending, fulfilled, rejected} = ACTION_STRING;

  switch (action.type) {
    case authLogin + pending:
      return {
        ...prevState,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };

    case authLogin + fulfilled:
      const data = action.payload.data;
      console.log('data:', data);
      const userData = {
        ...prevState.userData,
        token: data.data.token,
        pin: data.data.pin,
        id: data.data.id,
      };
      return {
        ...prevState,
        isPending: false,
        isFulfilled: true,
        userData,
      };

    case authLogin + rejected:
      const err = action.payload;
      return {
        ...prevState,
        isPending: false,
        isRejected: true,
        err,
      };

    case authPin:
      const newPin = action.payload;
      return {
        ...prevState,
        userData: {
          ...prevState.userData,
          pin: newPin,
        },
      };

    default:
      return prevState;
  }
};

export default authReducer;

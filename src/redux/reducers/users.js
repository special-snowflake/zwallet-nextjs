import {ACTION_STRING} from 'src/redux/actions/actionsString';
const initialState = {
  userData: null,
};

const usersReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case ACTION_STRING.userData:
      const data = action.payload;
      return {
        ...{data: data},
      };

    case ACTION_STRING.updateBalance:
      const balance = action.payload;
      return {
        ...prevState.userData,
        data: {
          ...balance,
        },
      };
    default:
      return prevState;
  }
};

export default usersReducer;
